const faqModel = require("../models/faqModel");
const admissionModel = require("../models/admissionModel");
const publicModel = require("../models/publicModel");
const logModel = require("../models/logModel");
const intentService = require("../services/intentService");

function normalize(s) {
  return String(s || "").trim();
}

function uniqueShort(items, max = 4) {
  const seen = new Set();
  const out = [];
  for (const item of items || []) {
    const text = String(item || "").trim();
    if (!text) continue;
    const key = text.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(text.length > 90 ? `${text.slice(0, 87)}...` : text);
    if (out.length >= max) break;
  }
  return out;
}

function keywordMatchScore(text, keywords) {
  const hay = String(text || "").toLowerCase();
  let score = 0;
  for (const k of keywords || []) {
    if (hay.includes(k)) score += k.length >= 6 ? 8 : 5;
  }
  return score;
}

function formatInr(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return null;
  return `₹${n.toLocaleString("en-IN")}`;
}

function buildCourseDetailsReply({ course, fees, admissionLastDate, relatedFaqs = [] }) {
  const courseName = course.course_name;
  const deptName = course.dept_name || "";
  const dur = course.duration ? String(course.duration).trim() : "";
  const elig = course.eligibility ? String(course.eligibility).trim() : "";
  const feeTotal = formatInr(course.fee);

  const sentences = [];
  sentences.push(`${courseName}${dur ? ` is a ${dur} program` : " is one of our programs"}.`);
  if (deptName) sentences.push(`It is offered under the ${deptName} department.`);
  if (elig) sentences.push(`Eligibility: ${elig}.`);
  if (feeTotal) sentences.push(`Indicative total fee: ${feeTotal}.`);

  const lines = [];
  lines.push(sentences.join(" "));

  if (Array.isArray(fees) && fees.length) {
    lines.push("");
    lines.push("Fees (from the database):");

    for (const f of fees) {
      const amt = formatInr(f.amount) || String(f.amount ?? "—");
      const durPart = f.duration ? ` (${f.duration})` : "";
      const descPart = f.description ? ` — ${String(f.description).trim()}` : "";
      lines.push(`• ${f.fee_type}: ${amt}${durPart}${descPart}`);
    }
  }

  if (admissionLastDate?.date) {
    lines.push("");
    lines.push(
      `Admission timeline: ${admissionLastDate.event_name || "Deadline"} — ${String(admissionLastDate.date).slice(0, 10)}${admissionLastDate.description ? ` — ${admissionLastDate.description}` : ""
      }`
    );
  }

  if (course.head_name || course.contact_email || course.contact_phone) {
    const deptBits = [
      course.head_name ? `HOD: ${course.head_name}` : null,
      course.contact_email ? `Email: ${course.contact_email}` : null,
      course.contact_phone ? `Phone: ${course.contact_phone}` : null,
    ].filter(Boolean);

    if (deptBits.length) {
      lines.push("");
      lines.push(`Department contact: ${deptBits.join(" | ")}`);
    }
  }

  if (Array.isArray(relatedFaqs) && relatedFaqs.length) {
    lines.push("");
    lines.push("Related FAQs you can ask:");
    relatedFaqs.slice(0, 3).forEach((q) => lines.push(`• ${q}`));
  }

  return lines.join("\n");
}

async function buildRecommendations({ rawMessage, intentInfo, history = [] }) {
  const [faqRows, admissionRows] = await Promise.all([
    intentService.findRelatedFAQs(intentInfo.intent, rawMessage, intentInfo.keywords, 20),
    admissionModel.searchAdmissionQuestions({ text: rawMessage, limit: 12 }),
  ]);

  const candidates = [
    ...faqRows.map((r) => ({
      question: r.question,
      category: r.category || "",
      source: "faq",
      baseScore: Number(r.relevance_score || 0),
    })),
    ...admissionRows.map((r) => ({
      question: r.question,
      category: r.category || "Admission",
      source: "admission",
      baseScore: 18,
    })),
  ];

  const previousMessages = history
    .map((h) => String(h.text || "").toLowerCase())
    .join(" ");

  const fullContext =
    previousMessages + " " + String(rawMessage).toLowerCase();

  const intentToken = String(intentInfo.intent || "general").toLowerCase();
  const focusTerms = (intentInfo.focusTerms || []).map((t) => String(t).toLowerCase()).filter(Boolean);

  const applyFocusFilter = focusTerms.length > 0;
  const focus = focusTerms[0] || null;

  const courseTemplates = focus
    ? [
      `${focus.toUpperCase()} admission process`,
      `${focus.toUpperCase()} fee structure`,
      `${focus.toUpperCase()} eligibility`,
      `${focus.toUpperCase()} syllabus / subjects`,
      `${focus.toUpperCase()} placements`,
      `${focus.toUpperCase()} course duration`,
      `${focus.toUpperCase()} internship opportunities`,
    ]
    : [];

  const ranked = candidates
    .map((c) => {
      let score = c.baseScore;
      const q = String(c.question || "").toLowerCase();
      const category = String(c.category || "").toLowerCase();
      score += keywordMatchScore(q, intentInfo.keywords);
      if (
        intentToken !== "general" &&
        (
          category.includes(intentToken) ||
          q.includes(intentToken) ||
          fullContext.includes(intentToken)
        )
      ) {
        score += 14;
      }

      if (c.source === "faq") score += 5;
      if (applyFocusFilter && focusTerms.some((t) => q.includes(t))) score += 35;
      return { ...c, score };
    })
    .filter((c) => c.question && c.question.toLowerCase() !== String(rawMessage || "").toLowerCase())
    .filter((c) => {
      if (!applyFocusFilter) return true;
      const q = String(c.question || "").toLowerCase();
      return focusTerms.some((t) => q.includes(t));
    })
    .sort((a, b) => b.score - a.score);

  const out = uniqueShort(ranked.map((x) => x.question), 4);

  if (courseTemplates.length) {
    out.push(...courseTemplates);
  }

  if (!out.length) {
    return uniqueShort(
      [
        "What is the admission process?",
        "What courses are available?",
        "Scholarships and eligibility",
        "Placement support",
        "How can I contact the college?",
      ],
      4
    );
  }

  return uniqueShort(out, 4);
}

function requiresSpecificCourse(intent, lowerMessage = "") {
  const specificIntents = ["fees", "dates", "placements", "scholarships", "hostel"];
  if (specificIntents.includes(intent)) return true;
  if (/\b(fee|fees|cost|semester|date|dates|start|placement|placements|scholarship|scholarships|hostel)\b/.test(lowerMessage)) return true;
  return false;
}

async function buildAnswer({ rawMessage, intentInfo, history = [] }) {
  const intent = intentInfo?.intent || "general";
  const lower = rawMessage.toLowerCase();

  const isProcessIntent = intent === "admission" || /\b(admission|application|apply|procedure|process|eligibility|documents|deadline)\b/i.test(lower);

  if (isProcessIntent && !requiresSpecificCourse(intent, lower)) {
    const adm = await admissionModel.searchAdmissionQuestions({ text: rawMessage, limit: 4 });
    if (adm.length) {
      const top = adm[0];
      return {
        reply: top.answer,
        source: "admission_questions",
        intent: "admission",
        matched_id: top.id,
        suggestions: adm.slice(0, 4).map((r) => r.question),
      };
    }
  }

  const wantsDetails =
    (intentInfo?.focusTerms || []).length > 0 ||
    /\b(details|detail|eligibility|duration|fee|fees|syllabus|subjects|admission|placements|hostel|department)\b/i.test(
      rawMessage
    );

  if (wantsDetails && ["courses", "fees", "admission", "departments", "general"].includes(intent)) {
    const fromFocus = (intentInfo?.focusTerms || []).join(" ") || "";
    const fromHistory = (() => {
      const lastUser = [...(history || [])].reverse().find((h) => h && h.from === "user" && h.text);
      if (!lastUser?.text) return "";
      const histIntent = intentService.detectIntent(String(lastUser.text));
      return (histIntent.focusTerms || [])[0] || "";
    })();

    const q = fromFocus || fromHistory || rawMessage;
    const bundle = await publicModel.getCourseBundleByText(q, rawMessage);
    
    if (bundle) {
      if (bundle.isMultiple) {
        const courses = bundle.courses;
        const displayTerm = q.toUpperCase();
        const lines = courses.map(c => {
          const fee = formatInr(c.fee) || "on request";
          return `• **${c.course_name}**: ${c.duration || "N/A"}, Eligibility: ${c.eligibility || "N/A"}, Fee: ${fee}`;
        });

        return {
          reply: `I found ${courses.length} programs matching "${displayTerm}":\n\n${lines.join("\n")}\n\nWhich one would you like more details about?`,
          source: "courses",
          intent: "courses",
          suggestions: courses.slice(0, 4).map(c => c.course_name)
        };
      } else {
        const { course, fees } = bundle;
        let reply = "";
        if (lower.includes("eligibility")) {
          reply = `${course.course_name} eligibility: ${course.eligibility || "Refer to admission guidelines."}`;
        } else if (lower.includes("fee") || lower.includes("fees")) {
          const feeLines = fees.length 
            ? fees.map(f => `• ${f.fee_type}: ${formatInr(f.amount)} (${f.duration || ""})`)
            : [`• Indicative Total: ${formatInr(course.fee) || "Contact office"}`];
          reply = `Fee structure for ${course.course_name}:\n${feeLines.join("\n")}`;
        } else if (lower.includes("duration")) {
          reply = `${course.course_name} duration: ${course.duration || "Contact office for details."}`;
        } else {
          reply = buildCourseDetailsReply({ course, fees });
        }

        return {
          reply,
          source: "courses",
          intent: "courses",
          suggestions: [
            `${course.course_name} eligibility`,
            `${course.course_name} fees`,
            `${course.course_name} placements`
          ]
        };
      }
    }
  }

  if (intent === "fees") {
    const bundle = await publicModel.getCourseBundleByText(rawMessage);
    if (bundle) {
      if (bundle.isMultiple) {
        const courses = bundle.courses;
        const lines = courses.map(c => `• ${c.course_name}: ${formatInr(c.fee) || "on request"}`);
        return {
          reply: `I found multiple courses. Here are their indicative fees:\n\n${lines.join("\n")}\n\nAsk for "fees for [course name]" for a detailed breakdown.`,
          source: "fee_structure",
          intent: "fees",
          suggestions: courses.slice(0, 4).map(c => `Fees for ${c.course_name}`)
        };
      } else {
        const { course, fees } = bundle;
        const feeLines = fees.length 
          ? fees.map(f => `• ${f.fee_type}: ${formatInr(f.amount)} (${f.duration || ""})`)
          : [`• Indicative Total: ${formatInr(course.fee) || "Contact office"}`];
        return {
          reply: `Fee structure for ${course.course_name}:\n${feeLines.join("\n")}`,
          source: "fee_structure",
          intent: "fees",
          suggestions: [`${course.course_name} eligibility`, `Admission for ${course.course_name}`]
        };
      }
    }
  }

  if (intent === "scholarships") {
    const scholarships = await publicModel.listScholarships();
    if (scholarships.length) {
      const lines = scholarships.map(
        (s) =>
          `• ${s.name}: ${s.eligibility || ""} — ${s.amount || ""}. Deadline: ${s.application_deadline ? String(s.application_deadline).slice(0, 10) : "see notice"
          }`
      );
      return {
        reply: `Scholarships:\n${lines.join("\n")}`,
        source: "scholarships",
        intent: "scholarships",
        suggestions: scholarships.slice(0, 3).map((s) => `Explain ${s.name}`),
      };
    }
  }

  if (intent === "hostel") {
    const hostels = await publicModel.listHostels();
    if (hostels.length) {
      const lines = hostels.map(
        (h) => `• ${h.type}: fee ₹${h.fee != null ? Number(h.fee).toLocaleString("en-IN") : "—"} — ${h.facilities || ""}`
      );
      return {
        reply: `Hostel information:\n${lines.join("\n")}`,
        source: "hostel_information",
        intent: "hostel",
        suggestions: ["Hostel application process?", "Mess timings?", "Room sharing options?"],
      };
    }
  }

  if (intent === "placements") {
    const placements = await publicModel.listPlacements();
    if (placements.length) {
      const lines = placements.map(
        (p) => `• ${p.company_name}: ${p.package || ""}; success: ${p.success_rate || ""}; roles: ${p.roles_offered || ""}`
      );
      return {
        reply: `Placement highlights:\n${lines.join("\n")}`,
        source: "placement_support",
        intent: "placements",
        suggestions: ["Internship support?", "Average package?", "Training sessions?"],
      };
    }
  }

  if (intent === "dates") {
    const dates = await publicModel.listImportantDates();
    const focusTerms = (intentInfo?.focusTerms || []).map((t) => String(t).toLowerCase());
    let filtered = dates;

    if (focusTerms.length) {
      filtered = dates.filter((d) => {
        const event = String(d.event_name || "").toLowerCase();
        const desc = String(d.description || "").toLowerCase();
        return focusTerms.some((term) => event.includes(term) || desc.includes(term));
      });
    }

    if (filtered.length) {
      const lines = filtered.map((d) =>
        `• ${d.event_name}: ${String(d.date).slice(0, 10)} — ${d.description || ""}`
      );

      return {
        reply: `Important dates:\n${lines.join("\n")}`,
        source: "important_dates",
        intent: "dates",
        suggestions: ["Admission last date?", "Exam schedule?", "Semester start date?"],
      };
    }
  }

  if (intent === "support") {
    const contacts = await publicModel.listContacts();
    if (contacts.length) {
      const lines = contacts.map(
        (c) =>
          `• ${c.department}: ${c.contact_person || ""} — ${c.email || ""} / ${c.phone || ""} (${c.office_hours || "hours N/A"})`
      );
      return {
        reply: `Support contacts:\n${lines.join("\n")}`,
        source: "contact_support",
        intent: "support",
        suggestions: ["Admissions helpline?", "Exam cell?", "Hostel office?"],
      };
    }
  }

  const faqs = await faqModel.searchFaqSimilar({ text: rawMessage, limit: 5 });
  if (faqs.length) {
    const top = faqs[0];
    return {
      reply: top.response,
      source: "faqs",
      intent,
      matched_id: top.id,
      suggestions: faqs.slice(0, 4).map((f) => f.question),
    };
  }

  return {
    reply: "I could not find a matching result. Please ask about admissions, courses, fees, scholarships, hostel, or placements.",
    source: "fallback",
    intent: "general",
    suggestions: [
      "What is the admission process?",
      "List courses offered",
      "Fee structure for B.Tech Computer Science & Engineering",
      "Scholarships and deadlines",
    ],
  };
}

async function chat(req, res, next) {
  try {
    const rawMessage = normalize(req.body?.message);
    if (!rawMessage) return res.status(400).json({ error: "message is required" });

    // Intent Detection
    const intentInfo = intentService.detectIntent(rawMessage);

    // Search Knowledge Base
    const answer = await buildAnswer({
      rawMessage,
      intentInfo,
      history: req.body?.history || [],
    });

    const recommendations = await buildRecommendations({
      rawMessage,
      intentInfo,
      history: req.body?.history || [],
    });

    const suggestionsList = uniqueShort([...(answer.suggestions || []), ...recommendations], 4);

    // Log Query
    const queryId = await logModel.logUserQuery({
      session_id: req.body?.session_id || null,
      user_input: req.body?.originalMessage || rawMessage,
      matched_intent: answer.intent || intentInfo.intent,
      response_given: answer.reply,
      language_code: req.detectedLang || "en",
      response_status: answer.source === "fallback" ? "unanswered" : "answered",
      confidence_score: intentInfo.confidence,
    });

    res.json({
      query_id: queryId,
      language: req.detectedLang || "en",
      intent: answer.intent || intentInfo.intent,
      category: intentInfo.category,
      keywords: intentInfo.keywords,
      intent_confidence: intentInfo.confidence,
      reply: answer.reply,
      suggestions: suggestionsList,
      source: answer.source,
    });
  } catch (e) {
    next(e);
  }
}

async function suggestions(req, res, next) {
  try {
    const q = normalize(req.query.q || "");

    if (q.length < 2) {
      return res.json({ suggestions: [] });
    }

    const history = req.query.history ? JSON.parse(req.query.history) : [];
    const previousMessages = history.map((h) => String(h.text || "").toLowerCase()).join(" ");
    const fullContext = `${previousMessages} ${q}`.trim();

    const intentInfo = intentService.detectIntent(fullContext);

    const blockedSuggestionIntents = ["greeting", "help", "thanks", "fallback", "chat", "capability"];

    const [fRows, aRows] = await Promise.all([
      intentService.findRelatedFAQs(intentInfo.intent, fullContext, intentInfo.keywords, 10, blockedSuggestionIntents),
      admissionModel.searchAdmissionQuestions({ text: fullContext, limit: 8 }),
    ]);

    const scored = [
      ...fRows.map((r) => ({
        text: r.question,
        score: Number(r.relevance_score || 0) + keywordMatchScore(r.question, intentInfo.keywords) + 10,
      })),
      ...aRows.map((r) => ({
        text: r.question,
        score: keywordMatchScore(r.question, intentInfo.keywords) + 12,
      })),
    ]
      .filter((x) => x.text.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => b.score - a.score)
      .map((x) => x.text);

    res.json({
      suggestions: uniqueShort(scored, 4),
    });
  } catch (e) {
    next(e);
  }
}

module.exports = { chat, suggestions };
