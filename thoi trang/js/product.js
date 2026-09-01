// Logic riêng cho trang product.html: chi tiết sản phẩm, chọn size/màu, thêm vào giỏ

let selectedSize = null;
let selectedColor = null;

function renderProductDetail() {
  const id = new URLSearchParams(location.search).get("id");
  const product = getProductById(id);
  const wrap = document.getElementById("product-detail-wrap");
  if (!product) {
    wrap.innerHTML = `<div class="empty-state"><h2>Không tìm thấy sản phẩm</h2><a class="btn" href="shop.html">Quay lại cửa hàng</a></div>`;
    return;
  }

  document.title = `${product.name} — ÉLUME`;
  selectedSize = product.sizes[0];
  selectedColor = product.colors[0];

  document.getElementById("breadcrumb-name").textContent = product.name;

  const uploaded = getProductImages(product.id);
  const localImg = LOCAL_IMAGES.products[product.id];

  wrap.innerHTML = `
    <div class="gallery">
      ${renderMediaBox("gallery-main", product.id, product.icon, uploaded[0] || localImg, product.tags)}
      <div class="gallery-thumbs">
        ${[0, 1, 2].map((i) => {
          const box = renderMediaBox(`thumb-box ${i === 0 ? "active" : ""}`, product.id + i, product.icon, uploaded[i] || localImg, product.tags);
          return box.replace('<div class="', `<div data-thumb="${i}" class="`);
        }).join("")}
      </div>
    </div>
    <div class="detail-info">
      <div class="product-cat">${product.categoryLabel}</div>
      <h1>${product.name}</h1>
      <div class="detail-price">
        ${formatPrice(product.price)}
        ${product.oldPrice ? `<span class="price-old" style="margin-left:12px;">${formatPrice(product.oldPrice)}</span>` : ""}
      </div>
      <p class="detail-desc">${product.description}</p>

      <div class="option-group">
        <label>Kích thước</label>
        <div class="option-values" id="size-options">
          ${product.sizes.map((s, i) => `<button type="button" class="option-value ${i === 0 ? "selected" : ""}" data-size="${s}">${s}</button>`).join("")}
        </div>
      </div>

      <div class="option-group">
        <label>Màu sắc</label>
        <div class="option-values" id="color-options">
          ${product.colors.map((c, i) => `<button type="button" class="option-value ${i === 0 ? "selected" : ""}" data-color="${c}">${c}</button>`).join("")}
        </div>
      </div>

      <div class="detail-actions">
        <div class="qty-stepper">
          <button type="button" id="qty-minus">-</button>
          <input type="number" id="qty-input" value="1" min="1">
          <button type="button" id="qty-plus">+</button>
        </div>
        <button class="btn" id="add-to-cart-btn" style="flex:1;">Thêm vào giỏ hàng</button>
      </div>

      <div class="meta-row"><strong>Danh mục:</strong>&nbsp;${product.categoryLabel}</div>
      <div class="meta-row"><strong>Tình trạng:</strong>&nbsp;Còn hàng</div>
    </div>
  `;

  document.querySelectorAll("[data-thumb]").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const slot = Number(thumb.getAttribute("data-thumb"));
      const gallery = document.querySelector(".gallery");
      gallery.querySelector(".gallery-main").outerHTML = renderMediaBox("gallery-main", product.id + slot, product.icon, uploaded[slot] || localImg, product.tags);
      document.querySelectorAll("[data-thumb]").forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  document.querySelectorAll("[data-size]").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedSize = btn.getAttribute("data-size");
      document.querySelectorAll("[data-size]").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });

  document.querySelectorAll("[data-color]").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedColor = btn.getAttribute("data-color");
      document.querySelectorAll("[data-color]").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });

  const qtyInput = document.getElementById("qty-input");
  document.getElementById("qty-minus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qtyInput.value = Number(qtyInput.value) + 1;
  });

  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    addToCart(product.id, Number(qtyInput.value), selectedSize, selectedColor);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  });

  renderRelatedProducts(product);
}

function renderRelatedProducts(product) {
  const grid = document.getElementById("related-grid");
  if (!grid) return;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  grid.innerHTML = related.map(renderProductCard).join("");
  wireQuickAddButtons(grid);
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
