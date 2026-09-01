// Logic riêng cho trang admin.html: tự tải ảnh lên cho banner, bộ sưu tập, câu chuyện thương hiệu, sản phẩm

function uploadBoxHtml(kind, key, slot, imgSrc) {
  return `
    <div class="admin-upload-box">
      ${imgSrc ? `<img src="${imgSrc}" alt="">` : `<span class="upload-hint">+ Tải ảnh lên</span>`}
      <input type="file" accept="image/*" data-kind="${kind}" data-key="${key}" data-slot="${slot}">
      ${imgSrc ? `<button type="button" class="admin-remove-btn" data-remove-kind="${kind}" data-remove-key="${key}" data-remove-slot="${slot}">✕</button>` : ""}
    </div>
  `;
}

function renderAdminHero() {
  const el = document.getElementById("admin-hero-slot");
  if (!el) return;
  el.innerHTML = uploadBoxHtml("hero", "hero", 0, getHeroImage());
}

function renderAdminCollections() {
  const el = document.getElementById("admin-collections-grid");
  if (!el) return;
  el.innerHTML = COLLECTIONS.map(
    (col) => `
    <div>
      ${uploadBoxHtml("collection", col.key, 0, getCollectionImage(col.key))}
      <div class="admin-slot-label text-center">${col.title}</div>
    </div>
  `
  ).join("");
}

function renderAdminAbout() {
  const el = document.getElementById("admin-about-grid");
  if (!el) return;
  const imgs = getAboutImages();
  const labels = ["Ảnh lớn", "Ảnh nhỏ (chồng góc)"];
  el.innerHTML = [0, 1]
    .map(
      (i) => `
    <div>
      ${uploadBoxHtml("about", "about", i, imgs[i])}
      <div class="admin-slot-label text-center">${labels[i]}</div>
    </div>
  `
    )
    .join("");
}

function renderAdminProducts() {
  const el = document.getElementById("admin-products-grid");
  if (!el) return;
  el.innerHTML = PRODUCTS.map((p) => {
    const imgs = getProductImages(p.id);
    const slotLabels = ["Ảnh chính", "Ảnh phụ 1", "Ảnh phụ 2"];
    return `
      <div class="admin-product-card">
        <div class="admin-product-name">${p.name}</div>
        <div class="admin-slots">
          ${[0, 1, 2]
            .map(
              (i) => `
            <div class="admin-slot">
              ${uploadBoxHtml("product", p.id, i, imgs[i])}
              <div class="admin-slot-label">${slotLabels[i]}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }).join("");
}

function renderAdminAll() {
  renderAdminHero();
  renderAdminCollections();
  renderAdminAbout();
  renderAdminProducts();
}

function wireAdminEvents() {
  document.body.addEventListener("change", async (e) => {
    const input = e.target.closest('input[type="file"]');
    if (!input) return;
    const file = input.files[0];
    if (!file) return;

    const kind = input.getAttribute("data-kind");
    const key = input.getAttribute("data-key");
    const slot = Number(input.getAttribute("data-slot"));

    try {
      const dataUrl = await resizeImageFile(file);
      if (kind === "hero") setHeroImage(dataUrl);
      else if (kind === "collection") setCollectionImage(key, dataUrl);
      else if (kind === "about") setAboutImage(slot, dataUrl);
      else if (kind === "product") setProductImage(key, slot, dataUrl);
      renderAdminAll();
      showToast("Đã lưu ảnh");
    } catch (err) {
      alert("Không thể xử lý ảnh này. Vui lòng thử một ảnh khác.");
    }
  });

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove-kind]");
    if (!btn) return;
    const kind = btn.getAttribute("data-remove-kind");
    const key = btn.getAttribute("data-remove-key");
    const slot = Number(btn.getAttribute("data-remove-slot"));

    if (kind === "hero") clearHeroImage();
    else if (kind === "collection") clearCollectionImage(key);
    else if (kind === "about") clearAboutImage(slot);
    else if (kind === "product") clearProductImage(key, slot);

    renderAdminAll();
    showToast("Đã xóa ảnh");
  });

  const resetBtn = document.getElementById("reset-all-images");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Xóa toàn bộ ảnh đã tải lên và quay về giao diện mặc định?")) {
        resetAllImages();
        renderAdminAll();
        showToast("Đã khôi phục ảnh mặc định");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAdminAll();
  wireAdminEvents();
});
