/* =====================================================
   فایل منطق اصلی سایت POTO CHEESE
   ===================================================== */

const state = {
  category: "all",
  query: ""
};

const CART_KEY = "poto_cheese_cart";

let cart = loadCart();

const $ = (selector) => document.querySelector(selector);

/* ---------- ابزارها ---------- */
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return map[char];
  });
}

const FA_DIGITS = {
  "0": "۰", "1": "۱", "2": "۲", "3": "۳", "4": "۴",
  "5": "۵", "6": "۶", "7": "۷", "8": "۸", "9": "۹"
};

function toFa(input) {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[d]);
}

function formatPrice(price) {
  const value = Number(price) || 0;
  if (value === 0) return "رایگان";
  const formatted = new Intl.NumberFormat("en-US").format(value);
  return toFa(formatted) + " " + config.currency;
}

function normalize(text) {
  return String(text)
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\u200d\u200e\u200f]/g, "")
    .trim()
    .toLowerCase();
}

function getStored(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // اگر localStorage غیرفعال بود، مشکلی ایجاد نمی‌شود.
  }
}

/* ---------- سبد خرید ---------- */
function loadCart() {
  const raw = getStored(CART_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch (error) {
    return {};
  }
}

function saveCart() {
  setStored(CART_KEY, JSON.stringify(cart));
}

function findItem(id) {
  return items.find((item) => item.id === Number(id));
}

function isAvailable(item) {
  return !item || item.available !== false;
}

function cartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function cartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = findItem(id);
    return item ? sum + item.price * qty : sum;
  }, 0);
}

function addToCart(id) {
  const item = findItem(id);
  if (!item || !isAvailable(item)) return;

  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  updateBadge();
  openCart();
}

function changeQty(id, delta) {
  const next = (cart[id] || 0) + delta;
  if (next <= 0) {
    delete cart[id];
  } else {
    cart[id] = next;
  }
  saveCart();
  updateBadge();
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  saveCart();
  updateBadge();
  renderCart();
}

function clearCart() {
  cart = {};
  saveCart();
  updateBadge();
  renderCart();
}

function updateBadge() {
  const badge = $("#cartBadge");
  const count = cartCount();
  badge.textContent = toFa(count);
  badge.hidden = count === 0;
}

/* ---------- پنل سفارش ---------- */
function openCart() {
  renderCart();
  document.body.classList.add("cart-open");
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.body.classList.remove("cart-open");
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
}

function renderCart() {
  const body = $("#cartBody");
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div>🛒</div>
        <p>سبد شما خالی است.</p>
      </div>
    `;
    $("#cartTotal").textContent = "۰ " + config.currency;
    return;
  }

  body.innerHTML = entries
    .map(([id, qty]) => {
      const item = findItem(id);
      if (!item) return "";

      const lineTotal = item.price * qty;
      const soldOut = !isAvailable(item);

      return `
        <div class="cart-line${soldOut ? " cart-line-soldout" : ""}">
          <div class="cart-thumb">${item.emoji}</div>

          <div>
            <div class="cart-name-fa">${escapeHtml(item.titleFa)}</div>
            <div class="cart-name-en">${escapeHtml(item.titleEn)}</div>
            <div class="cart-unit">${soldOut ? "ناموجود" : formatPrice(item.price)}</div>
          </div>

          <div class="cart-line-side">
            <div class="cart-qty">
              <button type="button" data-dec="${item.id}" aria-label="کاهش تعداد">−</button>
              <span>${toFa(qty)}</span>
              <button type="button" data-inc="${item.id}" aria-label="افزایش تعداد">+</button>
            </div>
            <div class="cart-line-total">${lineTotal === 0 ? "رایگان" : formatPrice(lineTotal)}</div>
            <button type="button" class="cart-remove" data-remove="${item.id}" aria-label="حذف">🗑</button>
          </div>
        </div>
      `;
    })
    .join("");

  $("#cartTotal").textContent = formatPrice(cartTotal());
}

/* ---------- تم: خودکار از گوشی + اولویت با انتخاب دستی ---------- */
const darkQuery = window.matchMedia
  ? window.matchMedia("(prefers-color-scheme: dark)")
  : null;

function getDeviceTheme() {
  if (darkQuery && darkQuery.matches) return "dark";
  return "light";
}

function hasManualTheme() {
  const saved = getStored("theme");
  return saved === "dark" || saved === "light";
}

function currentTheme() {
  if (hasManualTheme()) return getStored("theme");
  return getDeviceTheme();
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const button = $("#themeToggle");
  button.textContent = theme === "light" ? "🌙" : "☀️";
  button.setAttribute("aria-label", theme === "light" ? "حالت تاریک" : "حالت روشن");
}

applyTheme(currentTheme());

if (darkQuery) {
  const onDeviceThemeChange = () => {
    if (!hasManualTheme()) {
      applyTheme(getDeviceTheme());
    }
  };

  if (darkQuery.addEventListener) {
    darkQuery.addEventListener("change", onDeviceThemeChange);
  } else if (darkQuery.addListener) {
    darkQuery.addListener(onDeviceThemeChange);
  }
}

$("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next);
  setStored("theme", next);
});

/* ---------- اطلاعات ثابت ---------- */
document.title = config.restaurantNameEn + " | " + config.taglineEn;
$("#restaurantNameEn").textContent = config.restaurantNameEn;
$("#brandSub").textContent = config.taglineEn;
$("#heroLine1").textContent = config.heroLine1;
$("#heroLine2").textContent = config.heroLine2;
$("#heroSub").textContent = config.heroSub;
$("#address").textContent = config.address;
$("#footerHours").textContent = config.hours;

const callButton = $("#callButton");
if (config.phoneTel) {
  callButton.href = "tel:" + config.phoneTel;
  callButton.innerHTML = "📞 " + escapeHtml(config.phoneDisplay);
} else {
  callButton.style.display = "none";
}

/* ---------- رندر دسته‌بندی‌ها ---------- */
function renderChips() {
  const wrap = $("#categoryChips");
  const allCategories = [
    { id: "all", labelFa: "همه", labelEn: "All", emoji: "🍽️", icon: config.allIcon },
    ...categories
  ];

  wrap.innerHTML = allCategories
    .map((category) => {
      const isSelected = state.category === category.id;
      return `
        <button
          class="chip"
          type="button"
          data-category="${category.id}"
          aria-selected="${isSelected}"
        >
          <span class="chip-icon-box">
            <span class="chip-emoji">${category.emoji}</span>
            <img class="chip-icon" src="${escapeHtml(category.icon)}" alt="" onerror="this.style.display='none'" />
          </span>
          <span class="chip-fa">${escapeHtml(category.labelFa)}</span>
          <span class="chip-en">${escapeHtml(category.labelEn)}</span>
        </button>
      `;
    })
    .join("");
}

/* ---------- فیلتر آیتم‌ها ---------- */
function getFilteredItems() {
  const query = normalize(state.query);

  return items.filter((item) => {
    const matchesCategory = state.category === "all" || item.category === state.category;

    const categoryLabel = categories.find((c) => c.id === item.category)?.labelFa || "";
    const searchText = normalize(
      [item.titleFa, item.titleEn, item.description, categoryLabel].join(" ")
    );

    const matchesQuery = !query || searchText.includes(query);

    return matchesCategory && matchesQuery;
  });
}

/* ---------- رندر کارت‌ها ---------- */
function renderMenu() {
  const filtered = getFilteredItems();
  const grid = $("#menuGrid");
  const emptyState = $("#emptyState");

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  grid.innerHTML = filtered
    .map((item) => {
      const soldOut = !isAvailable(item);

      const itemBadges = (item.badges || [])
        .map((badgeKey) => {
          const meta = badgeMeta[badgeKey];
          if (!meta) return "";
          return `<span class="badge ${meta.class}">${escapeHtml(meta.label)}</span>`;
        })
        .join("");

      const badgesHtml = itemBadges
        ? `<div class="card-badges">${itemBadges}</div>`
        : "";

      const soldOutTag = soldOut ? `<div class="soldout-tag">ناموجود</div>` : "";

      const imageHtml = item.image
        ? `
          <img
            src="${escapeHtml(item.image)}"
            alt="${escapeHtml(item.titleFa)}"
            loading="lazy"
            decoding="async"
            onerror="this.classList.add('is-missing')"
          />
        `
        : "";

      const addBtn = soldOut
        ? `<button type="button" class="add-btn" disabled aria-label="ناموجود">+</button>`
        : `
          <button
            type="button"
            class="add-btn"
            data-add="${item.id}"
            aria-label="افزودن ${escapeHtml(item.titleFa)} به سبد"
          >+</button>
        `;

      return `
        <article class="card${soldOut ? " sold-out" : ""}">
          <div
            class="photo"
            style="--emoji:'${item.emoji}'; --c1:${item.color1}; --c2:${item.color2};"
          >
            ${imageHtml}
            ${badgesHtml}
            ${soldOutTag}
          </div>

          <div class="card-body">
            <h3 class="card-title-fa">${escapeHtml(item.titleFa)}</h3>
            <p class="card-title-en">${escapeHtml(item.titleEn)}</p>
            <p class="desc">${escapeHtml(item.description)}</p>

            <div class="card-footer">
              <div class="price">${formatPrice(item.price)}</div>
              ${addBtn}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

/* ---------- رویدادها ---------- */
const searchInput = $("#searchInput");
const clearSearchButton = $("#clearSearch");

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  clearSearchButton.style.display = state.query ? "block" : "none";
  renderMenu();
});

clearSearchButton.addEventListener("click", () => {
  searchInput.value = "";
  state.query = "";
  clearSearchButton.style.display = "none";
  searchInput.focus();
  renderMenu();
});

$("#categoryChips").addEventListener("click", (event) => {
  const button = event.target.closest(".chip");
  if (!button) return;

  state.category = button.dataset.category;
  renderChips();
  renderMenu();
});

$("#menuGrid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button || button.disabled) return;
  addToCart(button.dataset.add);
});

$("#cartButton").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);

$("#cartBody").addEventListener("click", (event) => {
  const inc = event.target.closest("[data-inc]");
  const dec = event.target.closest("[data-dec]");
  const remove = event.target.closest("[data-remove]");

  if (inc) changeQty(inc.dataset.inc, +1);
  else if (dec) changeQty(dec.dataset.dec, -1);
  else if (remove) removeFromCart(remove.dataset.remove);
});

$("#cartClear").addEventListener("click", clearCart);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});

/* ---------- اجرای اولیه ---------- */
updateBadge();
renderChips();
renderMenu();