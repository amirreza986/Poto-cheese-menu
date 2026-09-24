/* =====================================================
   پنل مدیریت POTO CHEESE
   ===================================================== */

const REPO_OWNER = "amirreza986";
const REPO_NAME = "Poto-cheese-menu";
const MENU_PATH = "js/menu-data.js";
const TOKEN_KEY = "poto_admin_token";
const API = "https://api.github.com";

let token = getStored(TOKEN_KEY);
let menuData = null;
let fileSha = null;

const $ = (s) => document.querySelector(s);

function getStored(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function setStored(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function clearStored(k) { try { localStorage.removeItem(k); } catch (e) {} }

function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function utf8ToBase64(str) {
  const b = new TextEncoder().encode(str);
  let bin = "";
  b.forEach((x) => (bin += String.fromCharCode(x)));
  return btoa(bin);
}

function base64ToUtf8(b64) {
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function api(path, opts = {}) {
  const res = await fetch(API + path, Object.assign({
    headers: Object.assign({
      "Authorization": "Bearer " + token,
      "Accept": "application/vnd.github+json"
    }, opts.headers || {})
  }, opts));

  if (!res.ok) {
    let msg = res.status + " " + res.statusText;
    try { const j = await res.json(); if (j && j.message) msg = j.message; } catch (e) {}
    throw new Error(msg);
  }
  return res.json();
}

function setStatus(msg, type) {
  const bar = $("#statusBar");
  bar.hidden = false;
  bar.textContent = msg;
  bar.className = "status " + (type || "");
  if (type === "ok") setTimeout(() => { bar.hidden = true; }, 5000);
}

/* ---------- ورود / خروج ---------- */
async function login() {
  const t = $("#tokenInput").value.trim();
  if (!t) { showLoginError("توکن را وارد کنید."); return; }
  token = t;
  try {
    await api("/user");
    setStored(TOKEN_KEY, token);
    showAdmin();
  } catch (e) {
    token = null;
    showLoginError("ورود ناموفق: " + e.message);
  }
}

function showLoginError(m) {
  const el = $("#loginError");
  el.hidden = false;
  el.textContent = m;
}

function logout() {
  clearStored(TOKEN_KEY);
  token = null;
  location.reload();
}

/* ---------- بارگذاری منو ---------- */
async function loadMenu() {
  setStatus("در حال دریافت منو از GitHub...", "");
  const file = await api(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${MENU_PATH}`);
  fileSha = file.sha;
  const text = base64ToUtf8(file.content.replace(/\n/g, ""));
  menuData = new Function(text + "\nreturn {config, categories, items, badgeMeta};")();
  renderEditor();
  setStatus("منو دریافت شد: " + menuData.items.length + " محصول.", "ok");
}

/* ---------- رندر ویرایشگر ---------- */
function renderEditor() {
  const wrap = $("#categoriesWrap");
  wrap.innerHTML = menuData.categories.map((cat) => {
    const catItems = menuData.items.filter((i) => i.category === cat.id);
    return `
      <section class="cat-block">
        <h2>${cat.emoji} ${escapeHtml(cat.labelFa)} <span>${escapeHtml(cat.labelEn)}</span></h2>
        <div class="items">
          ${catItems.map(itemCard).join("") || '<p class="muted">محصولی ندارد.</p>'}
        </div>
      </section>`;
  }).join("");

  $("#addCategory").innerHTML = menuData.categories
    .map((c) => `<option value="${c.id}">${escapeHtml(c.labelFa)}</option>`)
    .join("");
}

function itemCard(item) {
  const checked = item.available === false ? "" : "checked";
  return `
    <div class="item-card" data-id="${item.id}">
      <div class="item-head">
        <span class="item-emoji">${escapeHtml(item.emoji)}</span>
        <label class="switch">
          <input type="checkbox" data-field="available" ${checked} />
          <span>موجود</span>
        </label>
        <button class="btn btn-danger btn-small" type="button" data-del="${item.id}">حذف</button>
      </div>
      <div class="item-grid">
        <label>نام فارسی<input type="text" data-field="titleFa" value="${escapeHtml(item.titleFa)}" /></label>
        <label>نام انگلیسی<input type="text" data-field="titleEn" value="${escapeHtml(item.titleEn)}" /></label>
        <label>قیمت (تومان)<input type="number" min="0" step="1000" data-field="price" value="${item.price}" /></label>
        <label>ایموجی<input type="text" data-field="emoji" value="${escapeHtml(item.emoji)}" /></label>
        <label class="full">توضیح<input type="text" data-field="description" value="${escapeHtml(item.description)}" /></label>
        <label class="full muted small">مسیر عکس: ${escapeHtml(item.image || "-")} (آپلود عکس: قدم بعد)</label>
      </div>
    </div>`;
}

/* ---------- جمع‌آوری داده‌ها از فرم ---------- */
function collectData() {
  document.querySelectorAll(".item-card").forEach((cardEl) => {
    const id = Number(cardEl.dataset.id);
    const item = menuData.items.find((i) => i.id === id);
    if (!item) return;
    cardEl.querySelectorAll("[data-field]").forEach((inp) => {
      const f = inp.dataset.field;
      if (f === "available") item.available = inp.checked;
      else if (f === "price") item.price = Math.max(0, Number(inp.value) || 0);
      else item[f] = inp.value;
    });
  });
}

/* ---------- افزودن / حذف ---------- */
function nextId() {
  return menuData.items.reduce((m, i) => Math.max(m, i.id), 0) + 1;
}

function slugify(s) {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "item";
}

function addItem() {
  const cat = $("#addCategory").value;
  const titleFa = $("#addTitleFa").value.trim();
  const titleEn = $("#addTitleEn").value.trim();
  const price = Number($("#addPrice").value) || 0;
  const emoji = $("#addEmoji").value.trim() || "🍽️";
  const desc = $("#addDesc").value.trim();

  if (!titleFa) { setStatus("نام فارسی محصول را بنویسید.", "err"); return; }

  menuData.items.push({
    id: nextId(),
    category: cat,
    titleFa: titleFa,
    titleEn: titleEn || titleFa,
    description: desc || titleFa,
    price: price,
    image: `images/${cat}/${slugify(titleEn || titleFa)}.jpg`,
    emoji: emoji,
    color1: "#1a4433",
    color2: "#2a7a54",
    badges: [],
    available: true
  });

  renderEditor();
  setStatus("محصول اضافه شد. برای اعمال، دکمه ذخیره را بزنید.", "ok");
}

function deleteItem(id) {
  const item = menuData.items.find((i) => i.id === id);
  if (!item) return;
  if (!confirm(`محصول «${item.titleFa}» حذف شود؟`)) return;
  menuData.items = menuData.items.filter((i) => i.id !== id);
  renderEditor();
  setStatus("محصول حذف شد. برای اعمال، دکمه ذخیره را بزنید.", "ok");
}

/* ---------- ساخت متن فایل menu-data.js ---------- */
function serialize() {
  const head =
    "/* =====================================================\n" +
    "   فایل داده‌های منوی POTO CHEESE\n" +
    "   (تولید شده توسط پنل مدیریت — دستی ویرایش نکنید)\n" +
    "   ===================================================== */\n\n";

  return head +
    "const config = " + JSON.stringify(menuData.config, null, 2) + ";\n\n" +
    "const categories = " + JSON.stringify(menuData.categories, null, 2) + ";\n\n" +
    "const items = " + JSON.stringify(menuData.items, null, 2) + ";\n\n" +
    "const badgeMeta = " + JSON.stringify(menuData.badgeMeta, null, 2) + ";\n";
}

/* ---------- ذخیره روی GitHub ---------- */
async function save() {
  collectData();
  const content = utf8ToBase64(serialize());
  setStatus("در حال انتشار تغییرات روی GitHub...", "");
  $("#saveBtn").disabled = true;

  try {
    const res = await api(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${MENU_PATH}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Update menu from admin panel",
        content: content,
        sha: fileSha
      })
    });
    fileSha = res.content.sha;
    setStatus("✅ ذخیره شد! تغییرات طی ۱ تا ۲ دقیقه روی سایت می‌نشیند.", "ok");
  } catch (e) {
    setStatus("خطا در ذخیره: " + e.message, "err");
  } finally {
    $("#saveBtn").disabled = false;
  }
}

/* ---------- نمایش پنل ---------- */
function showAdmin() {
  $("#loginScreen").hidden = true;
  $("#adminScreen").hidden = false;
  loadMenu().catch((e) => setStatus("خطا در دریافت منو: " + e.message, "err"));
}

/* ---------- رویدادها ---------- */
$("#loginBtn").addEventListener("click", login);
$("#tokenInput").addEventListener("keydown", (e) => { if (e.key === "Enter") login(); });
$("#logoutBtn").addEventListener("click", logout);
$("#saveBtn").addEventListener("click", save);
$("#addBtn").addEventListener("click", addItem);

$("#categoriesWrap").addEventListener("click", (e) => {
  const del = e.target.closest("[data-del]");
  if (del) deleteItem(Number(del.dataset.del));
});

/* ---------- شروع ---------- */
(async function init() {
  if (token) {
    try {
      await api("/user");
      showAdmin();
    } catch (e) {
      clearStored(TOKEN_KEY);
      token = null;
    }
  }
})();