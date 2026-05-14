(() => {
  const DEFAULT_API = "http://localhost:5000";
  const TOKEN_KEY = "college_admin_token";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function getApiBase() {
    const qs = new URLSearchParams(window.location.search || "");
    const override =
      window.API_BASE || qs.get("apiBase") || localStorage.getItem("college_api_base") || "";
    if (override) return override.replace(/\/$/, "");
    const { protocol, hostname, port } = window.location;
    if ((protocol === "http:" || protocol === "https:") && hostname === "localhost" && port === "5000") return "";
    if (protocol === "file:") return DEFAULT_API;
    return DEFAULT_API;
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  function setToken(t) {
    localStorage.setItem(TOKEN_KEY, t);
  }
  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  async function api(path, opts = {}) {
    const headers = Object.assign({ "Content-Type": "application/json" }, opts.headers || {});
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const API_BASE = getApiBase();
    const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || "Request failed");
    return data;
  }

  function escapeHtml(s) {
    return String(s || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function rowActions(id, onEdit, onDel) {
    return `<button type="button" class="btn" data-edit="${id}">Edit</button> <button type="button" class="btn" data-del="${id}">Delete</button>`;
  }

  async function initLogin() {
    const form = $("#adminLoginForm");
    if (!form) return;
    const msg = $("#loginMsg");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.textContent = "Signing in…";
      try {
        const username = $("#username").value.trim();
        const password = $("#password").value;
        const data = await api("/admin/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
        setToken(data.token);
        window.location.href = "./admin-dashboard.html";
      } catch (err) {
        msg.textContent = err.message;
      }
    });
  }

  function bindTableActions(root, onEdit, onDel) {
    root.querySelectorAll("button[data-edit]").forEach((btn) => {
      btn.addEventListener("click", () => onEdit(btn.getAttribute("data-edit")));
    });
    root.querySelectorAll("button[data-del]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-del");
        if (!confirm(`Delete #${id}?`)) return;
        await onDel(id);
      });
    });
  }

  async function initDashboard() {
    const dash = $("#adminDashboard");
    if (!dash) return;

    $("#logoutBtn")?.addEventListener("click", () => {
      clearToken();
      window.location.href = "./admin-login.html";
    });

    if (!getToken()) {
      window.location.href = "./admin-login.html";
      return;
    }

    const status = $("#dashStatus");

    async function loadAll() {
      status.textContent = "Loading…";
      try {
        const [
          faq,
          adm,
          dept,
          courses,
          fees,
          sch,
          hostels,
          plc,
          contacts,
          dates,
          logs,
          analytics,
          act,
        ] = await Promise.all([
          api("/admin/faqs"),
          api("/admin/admission-questions"),
          api("/admin/departments"),
          api("/admin/courses"),
          api("/admin/fees"),
          api("/admin/scholarships"),
          api("/admin/hostels"),
          api("/admin/placements"),
          api("/admin/contacts"),
          api("/admin/important-dates"),
          api("/admin/query-logs?limit=80"),
          api("/admin/analytics"),
          api("/admin/admin-activity?limit=80"),
        ]);

        const fq = $("#faqRows");
        fq.innerHTML = (faq.faqs || [])
          .map(
            (f) => `<tr><td>${f.id}</td><td>${escapeHtml(f.category || "")}</td><td>${escapeHtml(
              (f.question || "").slice(0, 80)
            )}</td><td>${rowActions(f.id)}</td></tr>`
          )
          .join("");
        bindTableActions(
          fq,
          (id) => {
            const f = faq.faqs.find((x) => String(x.id) === String(id));
            if (!f) return;
            $("#faqId").value = f.id;
            $("#faqIntent").value = f.intent || "";
            $("#faqCategory").value = f.category || "";
            $("#faqQuestion").value = f.question || "";
            $("#faqResponse").value = f.response || "";
          },
          async (id) => {
            await api(`/admin/faqs/${id}`, { method: "DELETE" });
            await loadAll();
          }
        );

        const ar = $("#admRows");
        ar.innerHTML = (adm.admission_questions || [])
          .map(
            (r) =>
              `<tr><td>${r.id}</td><td>${escapeHtml((r.question || "").slice(0, 90))}</td><td>${rowActions(
                r.id
              )}</td></tr>`
          )
          .join("");
        bindTableActions(
          ar,
          (id) => {
            const r = adm.admission_questions.find((x) => String(x.id) === String(id));
            if (!r) return;
            $("#admId").value = r.id;
            $("#admCategory").value = r.category || "";
            $("#admQuestion").value = r.question || "";
            $("#admAnswer").value = r.answer || "";
          },
          async (id) => {
            await api(`/admin/admission-questions/${id}`, { method: "DELETE" });
            await loadAll();
          }
        );

        const dr = $("#deptRows");
        dr.innerHTML = (dept.departments || [])
          .map(
            (d) =>
              `<tr><td>${d.dept_id}</td><td>${escapeHtml(d.dept_name || "")}</td><td>${escapeHtml(
                d.head_name || ""
              )}</td><td>${rowActions(d.dept_id)}</td></tr>`
          )
          .join("");
        bindTableActions(
          dr,
          (id) => {
            const d = dept.departments.find((x) => String(x.dept_id) === String(id));
            if (!d) return;
            $("#deptId").value = d.dept_id;
            $("#deptName").value = d.dept_name || "";
            $("#deptHead").value = d.head_name || "";
            $("#deptEmail").value = d.contact_email || "";
            $("#deptPhone").value = d.contact_phone || "";
          },
          async (id) => {
            await api(`/admin/departments/${id}`, { method: "DELETE" });
            await loadAll();
          }
        );

        const cr = $("#courseRows");
        cr.innerHTML = (courses.courses || [])
          .map(
            (c) =>
              `<tr><td>${c.course_id}</td><td>${escapeHtml(c.course_name || "")}</td><td>${escapeHtml(
                c.department || ""
              )}</td><td><span class="badge">${escapeHtml(c.status || "active")}</span></td><td>${rowActions(c.course_id)}</td></tr>`
          )
          .join("");
        bindTableActions(
          cr,
          (id) => {
            const c = courses.courses.find((x) => String(x.course_id) === String(id));
            if (!c) return;
            $("#courseId").value = c.course_id;
            $("#courseName").value = c.course_name || "";
            $("#courseDept").value = c.department || "";
            $("#courseDuration").value = c.duration || "";
            $("#courseFee").value = c.fee ?? "";
            $("#courseIntake").value = c.intake_capacity ?? "";
            $("#courseStart").value = c.admission_start_date ? String(c.admission_start_date).slice(0, 10) : "";
            $("#courseEnd").value = c.admission_end_date ? String(c.admission_end_date).slice(0, 10) : "";
            $("#courseStatus").value = c.status || "active";
            $("#courseElig").value = c.eligibility || "";
            $("#courseDesc").value = c.course_description || "";
          },
          async (id) => {
            await api(`/admin/courses/${id}`, { method: "DELETE" });
            await loadAll();
          }
        );

        const fr = $("#feeRows");
        fr.innerHTML = (fees.fees || [])
          .map(
            (f) =>
              `<tr><td>${f.fee_id}</td><td>${escapeHtml(f.course_name || "")}</td><td>${escapeHtml(
                f.fee_type || ""
              )}</td><td>${escapeHtml(String(f.amount))}</td><td><span class="badge">${escapeHtml(f.status || "active")}</span></td><td>${rowActions(f.fee_id)}</td></tr>`
          )
          .join("");
        bindTableActions(
          fr,
          (id) => {
            const f = fees.fees.find((x) => String(x.fee_id) === String(id));
            if (!f) return;
            $("#feeId").value = f.fee_id;
            $("#feeCourseName").value = f.course_name || "";
            $("#feeSemester").value = f.semester_no ?? "";
            $("#feeType").value = f.fee_type || "";
            $("#feeAmount").value = f.amount ?? "";
            $("#feeDuration").value = f.duration || "";
            $("#feeStatus").value = f.status || "active";
            $("#feeDesc").value = f.description || "";
          },
          async (id) => {
            await api(`/admin/fees/${id}`, { method: "DELETE" });
            await loadAll();
          }
        );

        const sr = $("#schRows");
        sr.innerHTML = (sch.scholarships || [])
          .map(
            (s) =>
              `<tr><td>${s.scholarship_id}</td><td>${escapeHtml(s.name || "")}</td><td>${escapeHtml(s.course_name || "")}</td><td><span class="badge">${escapeHtml(s.status || "active")}</span></td><td>${rowActions(
                s.scholarship_id
              )}</td></tr>`
          )
          .join("");
        bindTableActions(
          sr,
          (id) => {
            const s = sch.scholarships.find((x) => String(x.scholarship_id) === String(id));
            if (!s) return;
            $("#schId").value = s.scholarship_id;
            $("#schCourseName").value = s.course_name || "";
            $("#schName").value = s.name || "";
            $("#schAmount").value = s.amount || "";
            $("#schDeadline").value = s.application_deadline ? String(s.application_deadline).slice(0, 10) : "";
            $("#schStatus").value = s.status || "active";
            $("#schElig").value = s.eligibility || "";
            $("#schDesc").value = s.description || "";
          },
          async (id) => {
            await api(`/admin/scholarships/${id}`, { method: "DELETE" });
            await loadAll();
          }
        );

        const hr = $("#hostelRows");
        hr.innerHTML = (hostels.hostels || [])
          .map(
            (h) =>
              `<tr><td>${h.hostel_id}</td><td>${escapeHtml(h.type || "")}</td><td>${h.total_rooms ? h.total_rooms : "—"}</td><td><span class="badge">${escapeHtml(h.status || "active")}</span></td><td>${rowActions(h.hostel_id)}</td></tr>`
          )
          .join("");
        bindTableActions(
          hr,
          (id) => {
            const h = hostels.hostels.find((x) => String(x.hostel_id) === String(id));
            if (!h) return;
            $("#hostelId").value = h.hostel_id;
            $("#hostelType").value = h.type || "";
            $("#hostelFee").value = h.fee ?? "";
            $("#hostelTotalRooms").value = h.total_rooms ?? "";
            $("#hostelAvailableRooms").value = h.available_rooms ?? "";
            $("#hostelWarden").value = h.warden_name || "";
            $("#hostelStatus").value = h.status || "active";
            $("#hostelFac").value = h.facilities || "";
          },
          async (id) => {
            await api(`/admin/hostels/${id}`, { method: "DELETE" });
            await loadAll();
          }
        );

        const pr = $("#plcRows");
        pr.innerHTML = (plc.placements || [])
          .map(
            (p) =>
              `<tr><td>${p.placement_id || p.id}</td><td>${escapeHtml(p.company_name || "")}</td><td>${escapeHtml(String(p.hiring_year || ""))}</td><td><span class="badge">${escapeHtml(p.status || "active")}</span></td><td>${rowActions(p.placement_id || p.id)}</td></tr>`
          )
          .join("");
        bindTableActions(
          pr,
          (id) => {
            const p = plc.placements.find((x) => String(x.placement_id || x.id) === String(id));
            if (!p) return;
            $("#plcId").value = p.placement_id || p.id;
            $("#plcCourseName").value = p.course_name || "";
            $("#plcCompany").value = p.company_name || "";
            $("#plcPkg").value = p.package || "";
            $("#plcRate").value = p.success_rate || "";
            $("#plcYear").value = p.hiring_year || "";
            $("#plcStatus").value = p.status || "active";
            $("#plcRoles").value = p.roles_offered || "";
          },
          async (id) => {
            await api(`/admin/placements/${id}`, { method: "DELETE" });
            await loadAll();
          }
        );

        const cor = $("#conRows");
        cor.innerHTML = (contacts.contacts || [])
          .map(
            (c) =>
              `<tr><td>${c.id}</td><td>${escapeHtml(c.department || "")}</td><td>${escapeHtml(c.contact_person || "")}</td><td><span class="badge">${escapeHtml(c.status || "active")}</span></td><td>${rowActions(c.id)}</td></tr>`
          )
          .join("");
        bindTableActions(
          cor,
          (id) => {
            const c = contacts.contacts.find((x) => String(x.id) === String(id));
            if (!c) return;
            $("#conId").value = c.id;
            $("#conDept").value = c.department || "";
            $("#conPerson").value = c.contact_person || "";
            $("#conEmail").value = c.email || "";
            $("#conPhone").value = c.phone || "";
            $("#conHours").value = c.office_hours || "";
            $("#conStatus").value = c.status || "active";
          },
          async (id) => {
            await api(`/admin/contacts/${id}`, { method: "DELETE" });
            await loadAll();
          }
        );

        const dtr = $("#dateRows");
        dtr.innerHTML = (dates.dates || [])
          .map(
            (d) =>
              `<tr><td>${d.event_id}</td><td>${escapeHtml(d.event_name || "")}</td><td><span class="badge">${escapeHtml(d.event_type || "")}</span></td><td>${escapeHtml(
                String(d.date || "").slice(0, 10)
              )}</td><td><span class="badge">${escapeHtml(d.status || "active")}</span></td><td>${rowActions(d.event_id)}</td></tr>`
          )
          .join("");
        bindTableActions(
          dtr,
          (id) => {
            const d = dates.dates.find((x) => String(x.event_id) === String(id));
            if (!d) return;
            $("#dateId").value = d.event_id;
            $("#dateCourseName").value = d.course_name || "";
            $("#dateName").value = d.event_name || "";
            $("#dateType").value = d.event_type || "general";
            $("#dateWhen").value = d.date ? String(d.date).slice(0, 10) : "";
            $("#dateStatus").value = d.status || "active";
            $("#dateDesc").value = d.description || "";
          },
          async (id) => {
            await api(`/admin/important-dates/${id}`, { method: "DELETE" });
            await loadAll();
          }
        );

        // Render analytics and logs
        const qr = $("#queryLogsRows");
        qr.innerHTML = (logs.logs || [])
          .map(
            (l) =>
              `<tr>
                <td style="white-space:nowrap"><small>${new Date(l.created_at).toLocaleString()}</small></td>
                <td><div style="max-width:240px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${escapeHtml(l.user_input)}">${escapeHtml(l.user_input)}</div></td>
                <td><span class="badge">${escapeHtml(l.matched_intent || "unknown")}</span></td>
                <td><div style="max-width:320px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${escapeHtml(l.response_given || "")}"><small>${escapeHtml(l.response_given || "")}</small></div></td>
                <td><span class="badge">${escapeHtml(l.language_code || "en")}</span></td>
              </tr>`
          )
          .join("");

        const actr = $("#adminActRows");
        actr.innerHTML = (act.admin_activity || [])
          .map(
            (a) =>
              `<tr>
                <td style="white-space:nowrap"><small>${new Date(a.timestamp).toLocaleString()}</small></td>
                <td>${escapeHtml(String(a.admin_id))}</td>
                <td><span class="badge">${escapeHtml(a.action_type)}</span></td>
                <td>${escapeHtml(a.target_table || "")} ${a.target_id ? `(#${a.target_id})` : ""}</td>
                <td>${escapeHtml(a.details || "")}</td>
              </tr>`
          )
          .join("");

        $("#analyticsTotals").textContent = analytics.analytics?.totals?.total_queries || 0;
        
        $("#analyticsIntent").innerHTML = (analytics.analytics?.byIntent || [])
          .map((i) => `<tr><td><span class="badge">${escapeHtml(i.matched_intent)}</span></td><td>${i.count}</td></tr>`)
          .join("");

        $("#analyticsLang").innerHTML = (analytics.analytics?.byLanguage || [])
          .map((i) => `<tr><td><span class="badge">${escapeHtml(i.language_code)}</span></td><td>${i.count}</td></tr>`)
          .join("");

        status.textContent = "Ready";
      } catch (e) {
        status.textContent = e.message;
        if (/token|auth|forbidden|unauthorized|401|403/i.test(String(e.message))) clearToken();
      }
    }

    $("#reloadAllBtn")?.addEventListener("click", loadAll);

    // Form Submissions
    $("#faqReset")?.addEventListener("click", () => {
      $("#faqId").value = "";
      $("#faqIntent").value = "";
      $("#faqCategory").value = "";
      $("#faqQuestion").value = "";
      $("#faqResponse").value = "";
    });
    $("#faqForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("#faqId").value.trim();
      const payload = {
        intent: $("#faqIntent").value.trim() || null,
        category: $("#faqCategory").value.trim() || null,
        question: $("#faqQuestion").value.trim(),
        response: $("#faqResponse").value.trim(),
      };
      if (!payload.question || !payload.response) return alert("Question and response required");
      if (id) await api(`/admin/faqs/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api(`/admin/faqs`, { method: "POST", body: JSON.stringify(payload) });
      $("#faqReset").click();
      await loadAll();
    });

    $("#admReset")?.addEventListener("click", () => {
      $("#admId").value = "";
      $("#admCategory").value = "";
      $("#admQuestion").value = "";
      $("#admAnswer").value = "";
    });
    $("#admForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("#admId").value.trim();
      const payload = {
        category: $("#admCategory").value.trim() || null,
        question: $("#admQuestion").value.trim(),
        answer: $("#admAnswer").value.trim(),
      };
      if (!payload.question || !payload.answer) return alert("Question and answer required");
      if (id) await api(`/admin/admission-questions/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api(`/admin/admission-questions`, { method: "POST", body: JSON.stringify(payload) });
      $("#admReset").click();
      await loadAll();
    });

    $("#deptReset")?.addEventListener("click", () => {
      $("#deptId").value = "";
      $("#deptName").value = "";
      $("#deptHead").value = "";
      $("#deptEmail").value = "";
      $("#deptPhone").value = "";
    });
    $("#deptForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("#deptId").value.trim();
      const payload = {
        dept_name: $("#deptName").value.trim(),
        head_name: $("#deptHead").value.trim() || null,
        contact_email: $("#deptEmail").value.trim() || null,
        contact_phone: $("#deptPhone").value.trim() || null,
      };
      if (!payload.dept_name) return alert("Name required");
      if (id) await api(`/admin/departments/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api(`/admin/departments`, { method: "POST", body: JSON.stringify(payload) });
      $("#deptReset").click();
      await loadAll();
    });

    $("#courseReset")?.addEventListener("click", () => {
      $("#courseId").value = "";
      $("#courseName").value = "";
      $("#courseDept").value = "";
      $("#courseDuration").value = "";
      $("#courseFee").value = "";
      $("#courseIntake").value = "";
      $("#courseStart").value = "";
      $("#courseEnd").value = "";
      $("#courseStatus").value = "active";
      $("#courseElig").value = "";
      $("#courseDesc").value = "";
    });
    $("#courseForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("#courseId").value.trim();
      const payload = {
        course_name: $("#courseName").value.trim(),
        department: $("#courseDept").value.trim() || null,
        duration: $("#courseDuration").value.trim() || null,
        fee: $("#courseFee").value === "" ? null : Number($("#courseFee").value),
        intake_capacity: $("#courseIntake").value === "" ? null : Number($("#courseIntake").value),
        admission_start_date: $("#courseStart").value.trim() || null,
        admission_end_date: $("#courseEnd").value.trim() || null,
        status: $("#courseStatus").value,
        eligibility: $("#courseElig").value.trim() || null,
        course_description: $("#courseDesc").value.trim() || null,
      };
      if (!payload.course_name) return alert("Course name required");
      if (id) await api(`/admin/courses/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api(`/admin/courses`, { method: "POST", body: JSON.stringify(payload) });
      $("#courseReset").click();
      await loadAll();
    });

    $("#feeReset")?.addEventListener("click", () => {
      $("#feeId").value = "";
      $("#feeCourseName").value = "";
      $("#feeSemester").value = "";
      $("#feeType").value = "";
      $("#feeAmount").value = "";
      $("#feeDuration").value = "";
      $("#feeStatus").value = "active";
      $("#feeDesc").value = "";
    });
    $("#feeForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("#feeId").value.trim();
      const payload = {
        course_name: $("#feeCourseName").value.trim(),
        semester_no: $("#feeSemester").value === "" ? null : Number($("#feeSemester").value),
        fee_type: $("#feeType").value.trim(),
        amount: Number($("#feeAmount").value),
        duration: $("#feeDuration").value.trim() || null,
        status: $("#feeStatus").value,
        description: $("#feeDesc").value.trim() || null,
      };
      if (!payload.course_name || !payload.fee_type || Number.isNaN(payload.amount)) return alert("Invalid fee form");
      if (id) await api(`/admin/fees/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api(`/admin/fees`, { method: "POST", body: JSON.stringify(payload) });
      $("#feeReset").click();
      await loadAll();
    });

    $("#schReset")?.addEventListener("click", () => {
      $("#schId").value = "";
      $("#schCourseName").value = "";
      $("#schName").value = "";
      $("#schAmount").value = "";
      $("#schDeadline").value = "";
      $("#schStatus").value = "active";
      $("#schElig").value = "";
      $("#schDesc").value = "";
    });
    $("#schForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("#schId").value.trim();
      const payload = {
        course_name: $("#schCourseName").value.trim() || null,
        name: $("#schName").value.trim(),
        eligibility: $("#schElig").value.trim() || null,
        amount: $("#schAmount").value.trim() || null,
        application_deadline: $("#schDeadline").value.trim() || null,
        status: $("#schStatus").value,
        description: $("#schDesc").value.trim() || null,
      };
      if (!payload.name) return alert("Name required");
      if (id) await api(`/admin/scholarships/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api(`/admin/scholarships`, { method: "POST", body: JSON.stringify(payload) });
      $("#schReset").click();
      await loadAll();
    });

    $("#hostelReset")?.addEventListener("click", () => {
      $("#hostelId").value = "";
      $("#hostelType").value = "";
      $("#hostelFee").value = "";
      $("#hostelTotalRooms").value = "";
      $("#hostelAvailableRooms").value = "";
      $("#hostelWarden").value = "";
      $("#hostelStatus").value = "active";
      $("#hostelFac").value = "";
    });
    $("#hostelForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("#hostelId").value.trim();
      const payload = {
        type: $("#hostelType").value.trim(),
        fee: $("#hostelFee").value === "" ? null : Number($("#hostelFee").value),
        total_rooms: $("#hostelTotalRooms").value === "" ? null : Number($("#hostelTotalRooms").value),
        available_rooms: $("#hostelAvailableRooms").value === "" ? null : Number($("#hostelAvailableRooms").value),
        warden_name: $("#hostelWarden").value.trim() || null,
        status: $("#hostelStatus").value,
        facilities: $("#hostelFac").value.trim() || null,
      };
      if (!payload.type) return alert("Type required");
      if (id) await api(`/admin/hostels/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api(`/admin/hostels`, { method: "POST", body: JSON.stringify(payload) });
      $("#hostelReset").click();
      await loadAll();
    });

    $("#plcReset")?.addEventListener("click", () => {
      $("#plcId").value = "";
      $("#plcCourseName").value = "";
      $("#plcCompany").value = "";
      $("#plcPkg").value = "";
      $("#plcRate").value = "";
      $("#plcYear").value = "";
      $("#plcStatus").value = "active";
      $("#plcRoles").value = "";
    });
    $("#plcForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("#plcId").value.trim();
      const payload = {
        course_name: $("#plcCourseName").value.trim() || null,
        company_name: $("#plcCompany").value.trim() || null,
        package: $("#plcPkg").value.trim() || null,
        success_rate: $("#plcRate").value.trim() || null,
        hiring_year: $("#plcYear").value === "" ? null : Number($("#plcYear").value),
        status: $("#plcStatus").value,
        roles_offered: $("#plcRoles").value.trim() || null,
      };
      if (!payload.company_name) return alert("Company name required");
      if (id) await api(`/admin/placements/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api(`/admin/placements`, { method: "POST", body: JSON.stringify(payload) });
      $("#plcReset").click();
      await loadAll();
    });

    $("#conReset")?.addEventListener("click", () => {
      $("#conId").value = "";
      $("#conDept").value = "";
      $("#conPerson").value = "";
      $("#conEmail").value = "";
      $("#conPhone").value = "";
      $("#conHours").value = "";
      $("#conStatus").value = "active";
    });
    $("#conForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("#conId").value.trim();
      const payload = {
        department: $("#conDept").value.trim(),
        contact_person: $("#conPerson").value.trim() || null,
        email: $("#conEmail").value.trim() || null,
        phone: $("#conPhone").value.trim() || null,
        office_hours: $("#conHours").value.trim() || null,
        status: $("#conStatus").value,
      };
      if (!payload.department) return alert("Department required");
      if (id) await api(`/admin/contacts/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api(`/admin/contacts`, { method: "POST", body: JSON.stringify(payload) });
      $("#conReset").click();
      await loadAll();
    });

    $("#dateReset")?.addEventListener("click", () => {
      $("#dateId").value = "";
      $("#dateCourseName").value = "";
      $("#dateName").value = "";
      $("#dateType").value = "general";
      $("#dateWhen").value = "";
      $("#dateStatus").value = "active";
      $("#dateDesc").value = "";
    });
    $("#dateForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = $("#dateId").value.trim();
      const payload = {
        course_name: $("#dateCourseName").value.trim() || null,
        event_name: $("#dateName").value.trim(),
        event_type: $("#dateType").value,
        date: $("#dateWhen").value.trim(),
        status: $("#dateStatus").value,
        description: $("#dateDesc").value.trim() || null,
      };
      if (!payload.event_name || !payload.date) return alert("Event name and date required");
      if (id) await api(`/admin/important-dates/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      else await api(`/admin/important-dates`, { method: "POST", body: JSON.stringify(payload) });
      $("#dateReset").click();
      await loadAll();
    });

    await loadAll();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLogin();
    initDashboard();
  });
})();
