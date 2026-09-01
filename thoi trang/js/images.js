// Quản lý ảnh do người dùng tự tải lên (lưu trong localStorage), thay thế cho khối gradient mặc định
const IMAGE_STORE_KEY = "reve_images";
const MAX_DIMENSION = 900;
const JPEG_QUALITY = 0.82;

function defaultImageStore() {
  return { hero: null, collections: {}, about: [null, null], products: {} };
}

function getImageStore() {
  try {
    const stored = JSON.parse(localStorage.getItem(IMAGE_STORE_KEY));
    return stored ? { ...defaultImageStore(), ...stored } : defaultImageStore();
  } catch {
    return defaultImageStore();
  }
}

function saveImageStore(store) {
  try {
    localStorage.setItem(IMAGE_STORE_KEY, JSON.stringify(store));
    return true;
  } catch (err) {
    alert("Không thể lưu ảnh: bộ nhớ trình duyệt đã đầy. Hãy xóa bớt ảnh cũ hoặc dùng ảnh có dung lượng nhỏ hơn.");
    return false;
  }
}

function getHeroImage() {
  return getImageStore().hero;
}

function setHeroImage(dataUrl) {
  const store = getImageStore();
  store.hero = dataUrl;
  return saveImageStore(store);
}

function clearHeroImage() {
  const store = getImageStore();
  store.hero = null;
  saveImageStore(store);
}

function getCollectionImage(key) {
  return getImageStore().collections[key] || null;
}

function setCollectionImage(key, dataUrl) {
  const store = getImageStore();
  store.collections[key] = dataUrl;
  return saveImageStore(store);
}

function clearCollectionImage(key) {
  const store = getImageStore();
  delete store.collections[key];
  saveImageStore(store);
}

function getAboutImages() {
  return getImageStore().about || [null, null];
}

function setAboutImage(slot, dataUrl) {
  const store = getImageStore();
  const current = store.about || [null, null];
  current[slot] = dataUrl;
  store.about = current;
  return saveImageStore(store);
}

function clearAboutImage(slot) {
  const store = getImageStore();
  const current = store.about || [null, null];
  current[slot] = null;
  store.about = current;
  saveImageStore(store);
}

function getProductImages(id) {
  const store = getImageStore();
  return store.products[String(id)] || [null, null, null];
}

function setProductImage(id, slot, dataUrl) {
  const store = getImageStore();
  const key = String(id);
  const current = store.products[key] || [null, null, null];
  current[slot] = dataUrl;
  store.products[key] = current;
  return saveImageStore(store);
}

function clearProductImage(id, slot) {
  const store = getImageStore();
  const key = String(id);
  const current = store.products[key] || [null, null, null];
  current[slot] = null;
  store.products[key] = current;
  saveImageStore(store);
}

function resetAllImages() {
  localStorage.removeItem(IMAGE_STORE_KEY);
}

// Resize ảnh qua canvas trước khi lưu để tránh vượt giới hạn localStorage
function resizeImageFile(file, maxDim = MAX_DIMENSION, quality = JPEG_QUALITY) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round(height * (maxDim / width));
          width = maxDim;
        } else if (height >= width && height > maxDim) {
          width = Math.round(width * (maxDim / height));
          height = maxDim;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Không đọc được ảnh"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("Không đọc được file"));
    reader.readAsDataURL(file);
  });
}

// Ảnh thời trang minh họa lấy theo từ khóa (dùng khi người dùng chưa tự tải ảnh lên)
function stockImageUrl(tags, lockSeed, width = 600, height = 800) {
  return `https://loremflickr.com/${width}/${height}/${encodeURIComponent(tags)}?lock=${lockSeed}`;
}

// Trả về HTML cho một khối media: luôn có nền gradient + icon làm lớp nền,
// và ảnh (đã tải lên hoặc ảnh minh họa) phủ lên trên. Nếu ảnh lỗi, tự ẩn để lộ lại gradient + icon.
function renderMediaBox(extraClass, gradSeed, icon, uploadedImgSrc, stockTags) {
  const imgSrc = uploadedImgSrc || (stockTags ? stockImageUrl(stockTags, gradSeed) : null);
  const imgTag = imgSrc ? `<img src="${imgSrc}" alt="" loading="lazy" onerror="this.remove()">` : "";
  return `<div class="${extraClass} media-placeholder ${gradClass(gradSeed)}"><span class="placeholder-icon">${icon}</span>${imgTag}</div>`;
}
