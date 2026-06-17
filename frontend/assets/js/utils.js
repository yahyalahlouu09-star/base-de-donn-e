// ============================================================
//  MinimalBlog — Utilitaires partagés (frontend)
//  Inclure avant tout autre script dans les pages HTML
// ============================================================

// ---- Échappement HTML (XSS) ----
function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str ?? '';
  return d.innerHTML;
}

// ---- Formatage de date longue ----
function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

// ---- Formatage de date courte ----
function formatDateShort(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('fr-FR');
}

// ---- Notification toast ----
;(function injectNotifStyles() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes mbSlideIn { from{transform:translateX(110%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes mbSlideOut{ from{transform:translateX(0);opacity:1} to{transform:translateX(110%);opacity:0} }
    .mb-notif {
      position:fixed; bottom:1.5rem; right:1.5rem; z-index:99999;
      padding:.85rem 1.4rem; border-radius:12px; font-size:.92rem; font-weight:500;
      font-family:'Space Grotesk',sans-serif;
      box-shadow:0 8px 30px rgba(0,0,0,.45);
      animation:mbSlideIn .35s cubic-bezier(.23,1,.32,1);
      max-width:340px; pointer-events:none;
    }
    .mb-notif.success {
      background:linear-gradient(135deg,#059669,#047857);
      border:1px solid rgba(5,150,105,.35); color:#fff;
    }
    .mb-notif.error {
      background:linear-gradient(135deg,#dc2626,#991b1b);
      border:1px solid rgba(220,38,38,.35); color:#fff;
    }
    .mb-notif.info {
      background:linear-gradient(135deg,#7c3aed,#5b21b6);
      border:1px solid rgba(124,58,237,.35); color:#fff;
    }
  `;
  document.head.appendChild(s);
})();

function showNotification(msg, type = 'success') {
  document.querySelectorAll('.mb-notif').forEach(n => n.remove());
  const div = document.createElement('div');
  div.className = `mb-notif ${type}`;
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => {
    div.style.animation = 'mbSlideOut .3s ease forwards';
    setTimeout(() => div.remove(), 300);
  }, 3500);
}

// ---- Client API minimal ----
const API = {
  async _req(method, endpoint, data) {
    const opts = {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    };
    if (data !== undefined) opts.body = JSON.stringify(data);
    const res = await fetch(`${API_BASE}/${endpoint}`, opts);
    const json = await res.json().catch(() => ({ success: false, error: 'Réponse invalide' }));
    if (!json.success) throw new Error(json.error ?? 'Erreur inconnue');
    return json.data;
  },
  get:    (ep, params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return API._req('GET', qs ? `${ep}?${qs}` : ep);
  },
  post:   (ep, data) => API._req('POST',   ep, data),
  put:    (ep, data) => API._req('PUT',    ep, data),
  delete: (ep)       => API._req('DELETE', ep),
};
