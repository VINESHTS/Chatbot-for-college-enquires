(() => {
  const DEFAULT_API = "http://localhost:5000";
  const LANG_KEY = "college_enquiry_lang";
  const HISTORY_KEY = "college_enquiry_chat_history_v1";
  const SESSION_KEY = "college_enquiry_chat_session_id_v1";
  const MAX_HISTORY = 100;
  const SESSION_MESSAGES_PREFIX = "college_enquiry_session_messages_v1:";
  const storage = localStorage;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function nowTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function getApiBase() {
    const qs = new URLSearchParams(window.location.search || "");
    const override =
      window.API_BASE || qs.get("apiBase") || localStorage.getItem("college_api_base") || "";
    if (override) return override.replace(/\/$/, "");
    const { protocol, hostname, port } = window.location;
    if ((protocol === "http:" || protocol === "https:") && hostname === "localhost" && port === "5000") {
      return "";
    }
    if (protocol === "file:") return DEFAULT_API;
    return DEFAULT_API;
  }

  function getLang() {
    return storage.getItem(LANG_KEY) || "en";
  }
  function setLang(v) {
    storage.setItem(LANG_KEY, v);
  }

  function newSessionId() {
    return crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function getSessionId() {
    const existing = storage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = newSessionId();
    storage.setItem(SESSION_KEY, id);
    return id;
  }

  function setSessionId(id) {
    storage.setItem(SESSION_KEY, id);
  }

  function newChatSession() {
    const id = newSessionId();
    setSessionId(id);
    return id;
  }

  function getSessionMessagesKey(sessionId) {
    return `${SESSION_MESSAGES_PREFIX}${sessionId}`;
  }

  function loadSessionMessages(sessionId) {
    try {
      const raw = storage.getItem(getSessionMessagesKey(sessionId));
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveSessionMessages(sessionId, messages) {
    storage.setItem(getSessionMessagesKey(sessionId), JSON.stringify(messages || []));
  }

  function appendSessionMessage(sessionId, msg) {
    const list = loadSessionMessages(sessionId);
    list.push(msg);
    saveSessionMessages(sessionId, list);
  }

  function loadHistoryMeta() {
    try {
      const raw = storage.getItem(HISTORY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveHistoryMeta(items) {
    storage.setItem(HISTORY_KEY, JSON.stringify((items || []).slice(0, MAX_HISTORY)));
  }

  function upsertHistoryEntry({ sessionId, title }) {
    const now = new Date().toISOString();
    const items = loadHistoryMeta();
    const existing = items.find((x) => x.sessionId === sessionId);
    const entry = existing
      ? { ...existing, updatedAt: now }
      : { sessionId, title: String(title || "Conversation").slice(0, 80), createdAt: now, updatedAt: now };
    const next = [entry, ...items.filter((x) => x.sessionId !== sessionId)]
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
      .slice(0, MAX_HISTORY);
    saveHistoryMeta(next);
  }

  const state = {
    suggestTimer: null,
    sessionId: getSessionId(),
  };

  function scrollToBottom(el, smooth = false) {
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }

  function appendBubble(container, { from, text, time }) {
    const row = document.createElement("div");
    row.className = `bubble-row ${from === "user" ? "user" : "bot"}`;
    const bubble = document.createElement("div");
    bubble.className = `bubble ${from === "user" ? "user" : "bot"}`;
    bubble.textContent = text;
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = time || nowTime();
    bubble.appendChild(meta);
    row.appendChild(bubble);
    container.appendChild(row);

    scrollToBottom(container, true);
    return row;
  }

  function createTypingRow() {
    const row = document.createElement("div");
    row.className = "bubble-row bot";
    const bubble = document.createElement("div");
    bubble.className = "bubble bot";
    bubble.innerHTML = `<span class="typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>`;
    row.appendChild(bubble);
    return row;
  }

  function setQuickActions(container, items, onPick) {
    container.querySelectorAll(".quick-actions, .quick-replies").forEach((el) => el.remove());
    const wrap = document.createElement("div");
    const inWidget = !!container.closest(".chat-panel");
    wrap.className = inWidget ? "quick-replies" : "quick-actions";
    (items || []).slice(0, 6).forEach((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = t;
      if (inWidget) b.className = "chip";
      b.addEventListener("click", () => onPick(t));
      wrap.appendChild(b);
    });
    container.appendChild(wrap);
  }

  function setLatestRecommendations(messagesEl, items, onPick) {
    messagesEl.querySelectorAll(".recommendations-row").forEach((el) => el.remove());
    const recommendations = [...new Set((items || []).map((x) => String(x || "").trim()).filter(Boolean))].slice(0, 5);
    if (!recommendations.length) return;

    const row = document.createElement("div");
    row.className = "bubble-row bot recommendations-row";
    const bubble = document.createElement("div");
    bubble.className = "bubble bot";

    const title = document.createElement("div");
    title.className = "meta";
    title.textContent = "Recommended questions";
    bubble.appendChild(title);

    const actions = document.createElement("div");
    actions.className = "quick-actions recommendations-actions";
    recommendations.forEach((text) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = text;
      // One-click quick action: fill + send
      b.addEventListener("click", () => {
        onPick(text);
});
      actions.appendChild(b);
    });

    bubble.appendChild(actions);
    row.appendChild(bubble);
    messagesEl.appendChild(row);
    scrollToBottom(messagesEl);
  }

  function showError(msg) {
    const el = $("#chatError");
    if (!el) return;
    if (!msg) {
      el.classList.remove("open");
      el.textContent = "";
      return;
    }
    el.textContent = msg;
    el.classList.add("open");
  }

  async function apiChat(message) {
    const API_BASE = getApiBase();
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        language: getLang(),
        session_id: state.sessionId,
        history: loadSessionMessages(state.sessionId) // add here
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
    return data;
  }

  async function apiSuggestions(q) {
    const API_BASE = getApiBase();
    const lang = getLang();
    const res = await fetch(`${API_BASE}/chat/suggestions?q=${encodeURIComponent(q)}&language=${lang}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return [];
    return data.suggestions || [];
  }

  function renderConversation(messagesEl, sessionId) {
    messagesEl.innerHTML = "";
    const msgs = loadSessionMessages(sessionId);
    msgs.forEach((m) => appendBubble(messagesEl, { 
      from: m.from, 
      text: m.text, 
      time: m.time
    }));
    // Use instant scroll for full conversation render to avoid jumpiness
    scrollToBottom(messagesEl, false);
  }

  function renderHistoryList() {
    const wrap = $("#historyList");
    if (!wrap) return;
    wrap.innerHTML = "";
    const items = loadHistoryMeta()
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
      .slice(0, MAX_HISTORY);
    items.forEach((h) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "history-item" + (h.sessionId === state.sessionId ? " active" : "");
      b.textContent = h.title || "Conversation";
      b.addEventListener("click", () => {
        state.sessionId = h.sessionId;
        setSessionId(h.sessionId);
        const messages = $("#chatMessages");
        if (messages) {
          renderConversation(messages, h.sessionId);
          setLatestRecommendations(messages, [], () => {});
        }
        showError("");
        renderHistoryList();
      });
      wrap.appendChild(b);
    });
  }

  function wireSuggestions(input, panel) {
    if (!input || !panel) return;
    const close = () => {
      panel.classList.remove("open");
      panel.innerHTML = "";
    };

    input.addEventListener("input", () => {
      const v = String(input.value || "");
      if (state.suggestTimer) clearTimeout(state.suggestTimer);
      if (v.trim().length < 2) return close();
      state.suggestTimer = setTimeout(async () => {
        try {
          const list = await apiSuggestions(v.trim());
          panel.innerHTML = "";
          if (!list.length) return close();
          list.forEach((s) => {
            const div = document.createElement("div");
            div.className = "suggest-item";
            div.textContent = s;
            div.addEventListener("click", () => {
              input.value = s;
              close();
              input.focus();
            });
            panel.appendChild(div);
          });
          panel.classList.add("open");
        } catch {
          close();
        }
      }, 260);
    });

    document.addEventListener("click", (e) => {
      if (!panel.contains(e.target) && e.target !== input) close();
    });
  }

  async function pingHealth() {
    try {
      const API_BASE = getApiBase();
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error("bad health");
    } catch {
      showError(
        "Unable to reach the chatbot API. Start the backend (see README) or set apiBase in the URL, for example ?apiBase=http://localhost:5000"
      );
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const messages = $("#chatMessages");
    const input = $("#chatInput");
    const sendBtn = $("#sendBtn");
    const lang = $("#langSelect");
    const panel = $("#suggestPanel");
    const newChatBtn = $("#newChatBtn");

    if (messages && input && sendBtn && lang) {
      // Auto-expand textarea like ChatGPT — stable version
      const autoSize = () => {
        // Only adjust if we have an input
        if (!input) return;
        
        // Reset height temporarily to get the true scrollHeight
        // but save the current scroll position of the messages to prevent jumping
        const wasAtBottom = messages.scrollHeight - messages.scrollTop <= messages.clientHeight + 20;

        input.style.height = "auto";
        const newHeight = Math.min(input.scrollHeight, 160);
        input.style.height = `${newHeight}px`;

        // If it was at the bottom, stay at the bottom
        if (wasAtBottom) scrollToBottom(messages, false);
      };

      lang.value = getLang();
      lang.addEventListener("change", () => setLang(lang.value));
      wireSuggestions(input, panel);

      const defaults = [
        "What is the admission process?",
        "List courses and departments",
        "Fee structure for B.Tech Computer Science & Engineering",
        "Scholarships and deadlines",
        "Hostel facilities and fees",
        "Placement companies and packages",
      ];
      // Restore last active session conversation (if available)
      renderConversation(messages, state.sessionId);
      input.value = "";
      autoSize();

      renderHistoryList();
      pingHealth();

      const clearHistoryBtn = $("#clearHistoryBtn");
      clearHistoryBtn?.addEventListener("click", () => {
        if (!confirm("Are you sure you want to clear all chat history?")) return;
        const items = loadHistoryMeta();
        items.forEach(h => storage.removeItem(getSessionMessagesKey(h.sessionId)));
        storage.removeItem(HISTORY_KEY);
        storage.removeItem(SESSION_KEY);
        
        messages.innerHTML = "";
        state.sessionId = getSessionId();
        renderHistoryList();
        setLatestRecommendations(messages, defaults.slice(0, 4), (t) => {
          input.value = t;
          send();
        });
        showError("");
      });

      newChatBtn?.addEventListener("click", () => {
        messages.innerHTML = "";
        state.sessionId = newChatSession();
        saveSessionMessages(state.sessionId, []);
        setLatestRecommendations(messages, defaults.slice(0, 4), (t) => {
          input.value = t;
          send();
        });
        input.value = "";
        autoSize();
        showError("");
        renderHistoryList();
      });

      async function send() {
        const text = String(input.value || "").trim();
        if (!text) return;
        input.value = "";
        autoSize();
        showError("");
        appendBubble(messages, { from: "user", text });
        setLatestRecommendations(messages, [], () => {});
        upsertHistoryEntry({ sessionId: state.sessionId, title: text });
        appendSessionMessage(state.sessionId, { from: "user", text, time: nowTime(), ts: Date.now() });

        const typing = createTypingRow();
        messages.appendChild(typing);
        scrollToBottom(messages, true);
        sendBtn.disabled = true;
        sendBtn.innerHTML = `<span class="spinner" aria-hidden="true"></span>`;

        try {
          const data = await apiChat(text);
          typing.remove();
          
          appendBubble(messages, { from: "bot", text: data.reply });
          appendSessionMessage(state.sessionId, { 
            from: "bot", 
            text: data.reply, 
            time: nowTime(), 
            ts: Date.now()
          });

          setLatestRecommendations(messages, data.suggestions || [], (t) => {
            input.value = t;
            send();
          });
          renderHistoryList();
        } catch (e) {
          typing.remove();
          appendBubble(messages, {
            from: "bot",
            text: `Sorry — I could not reach the assistant. ${e.message}`,
          });
          showError(e.message);
        } finally {
          sendBtn.disabled = false;
          sendBtn.textContent = "Send";
        }
      }

      sendBtn.addEventListener("click", send);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          send();
        }
      });

      input.addEventListener("input", autoSize);
      autoSize();

      // Default quick actions: one-click send
      if (!loadSessionMessages(state.sessionId).length) {
        setLatestRecommendations(messages, defaults.slice(0, 4), (t) => {
          input.value = t;
          send();
        });
      }
    }
  });
})();
