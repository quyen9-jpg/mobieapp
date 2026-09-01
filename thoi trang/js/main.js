// Hành vi dùng chung cho tất cả các trang: menu mobile, footer year, render sản phẩm

function renderProductCard(product) {
  const hasSale = !!product.oldPrice;
  const uploadedImg = getProductImages(product.id)[0] || LOCAL_IMAGES.products[product.id];
  return `
    <div class="product-card">
      ${product.badge ? `<span class="badge ${hasSale ? "sale" : ""}">${product.badge}</span>` : ""}
      <a href="product.html?id=${product.id}">
        ${renderMediaBox("product-thumb", product.id, product.icon, uploadedImg, product.tags)}
      </a>
      <div class="product-info">
        <div class="product-cat">${product.categoryLabel}</div>
        <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${hasSale ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ""}
        </div>
        <button class="quick-add" data-add-id="${product.id}">Thêm vào giỏ</button>
      </div>
    </div>
  `;
}

function wireQuickAddButtons(root = document) {
  root.querySelectorAll("[data-add-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-add-id"));
      const product = getProductById(id);
      if (!product) return;
      addToCart(id, 1, product.sizes[0], product.colors[0]);
      showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
    });
  });
}

function renderFeaturedProducts() {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;
  const featured = PRODUCTS.slice(0, 8);
  grid.innerHTML = featured.map(renderProductCard).join("");
  wireQuickAddButtons(grid);
}

function renderCollections() {
  const grid = document.getElementById("collections-grid");
  if (!grid) return;
  grid.innerHTML = COLLECTIONS.map((col, i) => {
    const uploadedImg = getCollectionImage(col.key);
    const imgSrc = uploadedImg || LOCAL_IMAGES.collections[col.key] || stockImageUrl(col.photoTags, 900 + i);
    return `
      <a class="collection-card ${gradClass(900 + i)}" href="${col.link}">
        <span class="collection-icon">${col.icon}</span>
        <img src="${imgSrc}" alt="${col.title}" loading="lazy" onerror="this.remove()">
        <span class="collection-tag">${col.tag}</span>
        <span class="collection-overlay">
          <span class="collection-season">${col.season}</span>
          <span class="collection-title">${col.title}</span>
          <span class="collection-link">Khám phá →</span>
        </span>
      </a>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // Footer year
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Highlight active nav link
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    if (link.getAttribute("href") === path) link.classList.add("active");
  });

  // Search panel
  const searchToggle = document.querySelector('.search-toggle');
  const searchPanel = document.getElementById('search-panel');
  const searchInput = document.getElementById('search-input');
  const searchSubmit = document.getElementById('search-submit');
  const searchImgFile = document.getElementById('search-img-file');
  const searchImgPreview = document.getElementById('search-img-preview');

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      searchPanel.classList.toggle('open');
      if (searchPanel.classList.contains('open')) searchInput.focus();
    });

    document.addEventListener('click', (e) => {
      if (!searchPanel.contains(e.target) && !searchToggle.contains(e.target)) {
        searchPanel.classList.remove('open');
      }
    });

    function doSearch() {
      const q = searchInput.value.trim();
      if (q) window.location.href = 'shop.html?q=' + encodeURIComponent(q);
    }

    searchSubmit.addEventListener('click', doSearch);
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });

    // Pre-fill search box if on shop page with ?q=
    const qParam = new URLSearchParams(location.search).get('q');
    if (qParam) {
      searchPanel.classList.add('open');
      searchInput.value = qParam;
    }

    // Image search
    if (searchImgFile) {
      searchImgFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try { sessionStorage.setItem('searchImage', ev.target.result); } catch (_) {}
          window.location.href = 'shop.html?imageSearch=1';
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Newsletter form (giao diện, không gửi thật)
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Cảm ơn bạn đã đăng ký nhận tin!");
      newsletterForm.reset();
    });
  }

  // Ảnh banner trang chủ (bên trái): nếu có ảnh tự tải lên (admin) thì hiện cố định ảnh đó,
  // ngược lại tự động chuyển đổi luân phiên qua các ảnh minh họa trong LOCAL_IMAGES.heroSlides.
  const heroMedia = document.getElementById("hero-media");
  if (heroMedia) {
    const customHero = typeof getHeroImage === "function" && getHeroImage();
    const slides = customHero
      ? [customHero]
      : (LOCAL_IMAGES.heroSlides && LOCAL_IMAGES.heroSlides.length
          ? LOCAL_IMAGES.heroSlides
          : [stockImageUrl("kids,fashion", 900, 1600, 900)]);

    heroMedia.innerHTML = slides
      .map((src, i) => `<div class="hero-slide${i === 0 ? " active" : ""}" style="background-image:url('${src}')"></div>`)
      .join("");

    if (slides.length > 1) {
      const slideEls = heroMedia.querySelectorAll(".hero-slide");
      let current = 0;
      setInterval(() => {
        slideEls[current].classList.remove("active");
        current = (current + 1) % slideEls.length;
        slideEls[current].classList.add("active");
      }, 2200);
    }
  }

  // Ảnh khu vực "Câu chuyện của chúng tôi": ảnh tự tải lên nếu có, ngược lại dùng ảnh minh họa
  const aboutImgs = typeof getAboutImages === "function" ? getAboutImages() : [null, null];
  const aboutMain = document.getElementById("about-media-main");
  const aboutSecondary = document.getElementById("about-media-secondary");
  if (aboutMain) {
    aboutMain.outerHTML = renderMediaBox("about-media-main", 501, "🧸", aboutImgs[0] || LOCAL_IMAGES.about[0], "children,playing");
  }
  if (aboutSecondary) {
    aboutSecondary.outerHTML = renderMediaBox("about-media-secondary", 502, "🎨", aboutImgs[1] || LOCAL_IMAGES.about[1], "kids,clothes");
  }

  renderCollections();
  renderFeaturedProducts();
});
