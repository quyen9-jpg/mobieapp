// Logic riêng cho trang shop.html: lọc, sắp xếp, render lưới sản phẩm

function getQueryParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function renderShopFilters(activeCategories) {
  const container = document.getElementById("category-filters");
  if (!container) return;
  container.innerHTML = CATEGORIES.map(
    (cat) => `
    <label class="filter-option">
      <input type="checkbox" name="cat" value="${cat.key}" ${activeCategories.includes(cat.key) ? "checked" : ""}>
      ${cat.label}
    </label>
  `
  ).join("");
}

function applyShopFilters() {
  const checked = Array.from(document.querySelectorAll('input[name="cat"]:checked')).map((el) => el.value);
  const sortValue = document.getElementById("sort-select")?.value || "default";
  const maxPrice = Number(document.getElementById("price-range")?.value || 1000000);
  const searchQuery = (getQueryParam("q") || "").trim().toLowerCase();

  let list = PRODUCTS.filter((p) => {
    if (checked.length > 0 && !checked.includes(p.category)) return false;
    if (p.price > maxPrice) return false;
    if (searchQuery) {
      return (
        p.name.toLowerCase().includes(searchQuery) ||
        p.categoryLabel.toLowerCase().includes(searchQuery) ||
        (p.tags && p.tags.toLowerCase().includes(searchQuery)) ||
        (p.description && p.description.toLowerCase().includes(searchQuery))
      );
    }
    return true;
  });

  if (sortValue === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sortValue === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sortValue === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

  const grid = document.getElementById("shop-grid");
  const countEl = document.getElementById("result-count");
  if (countEl) countEl.textContent = `${list.length} sản phẩm`;

  if (list.length === 0) {
    const msg = searchQuery
      ? `Không tìm thấy sản phẩm nào cho "<strong>${searchQuery}</strong>".`
      : "Không tìm thấy sản phẩm phù hợp bộ lọc.";
    grid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><p>${msg}</p></div>`;
    return;
  }

  grid.innerHTML = list.map(renderProductCard).join("");
  wireQuickAddButtons(grid);
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("shop-grid");
  if (!grid) return;

  // Banner tìm kiếm theo ảnh
  if (getQueryParam("imageSearch")) {
    const imgData = sessionStorage.getItem("searchImage");
    const banner = document.createElement("div");
    banner.className = "image-search-banner";
    banner.innerHTML = `
      <div class="container">
        ${imgData ? `<img src="${imgData}" alt="Ảnh bạn tìm kiếm">` : ""}
        <div>
          <strong>Tìm kiếm theo hình ảnh</strong>
          <p>Hiển thị các sản phẩm có thể phù hợp — bạn có thể dùng bộ lọc để thu hẹp kết quả.</p>
        </div>
      </div>`;
    const section = document.querySelector(".section");
    if (section) section.insertAdjacentElement("beforebegin", banner);
  }

  const catParam = getQueryParam("cat");
  renderShopFilters(catParam ? [catParam] : []);
  applyShopFilters();

  document.getElementById("category-filters").addEventListener("change", applyShopFilters);
  document.getElementById("sort-select").addEventListener("change", applyShopFilters);
  const priceRange = document.getElementById("price-range");
  const priceLabel = document.getElementById("price-range-label");
  priceRange.addEventListener("input", () => {
    priceLabel.textContent = formatPrice(Number(priceRange.value));
    applyShopFilters();
  });
});
