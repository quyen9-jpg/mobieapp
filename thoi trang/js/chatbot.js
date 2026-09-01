// Trợ lý AI ÉLUME — tư vấn sản phẩm thời trang trẻ em

(function () {
  const GREET =
    'Xin chào! 👋 Tôi là trợ lý **ÉLUME**.\nTôi có thể giúp bạn:\n• Tìm sản phẩm theo loại, màu, size\n• Xem hàng đang giảm giá\n• Tư vấn phù hợp cho bé trai/bé gái\n• Giải đáp về vận chuyển & đổi trả';

  const QUICK_REPLIES = [
    { label: '🆕 Hàng mới', q: 'sản phẩm mới' },
    { label: '🏷️ Đang sale', q: 'sale' },
    { label: '👗 Váy bé gái', q: 'váy bé gái' },
    { label: '👕 Áo bé trai', q: 'áo bé trai' },
    { label: '📏 Tư vấn size', q: 'tư vấn size' },
    { label: '🚚 Vận chuyển', q: 'vận chuyển' },
  ];

  function fmt(text) {
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

  function getResponse(raw) {
    const q = raw.toLowerCase().trim();

    if (/xin chào|chào|hello|hi\b/.test(q))
      return { text: 'Chào bạn! 😊 Bạn đang tìm sản phẩm gì cho bé hôm nay?' };

    if (/cảm ơn|thanks|thank/.test(q))
      return { text: 'Cảm ơn bạn đã ghé ÉLUME! 🌸 Cần tư vấn thêm cứ hỏi nhé.' };

    if (/size|kích thước|tuổi|số đo/.test(q))
      return {
        text:
          '📏 **Hướng dẫn chọn size:**\n• 1–2 tuổi → size 80–90\n• 2–3 tuổi → size 90–100\n• 4–5 tuổi → size 100–110\n• 6–7 tuổi → size 110–120\n• 8–9 tuổi → size 120–130\n• 10–12 tuổi → size 130–150\n\nMỗi sản phẩm đều có bảng size chi tiết. Bạn muốn tìm sản phẩm nào?',
      };

    if (/vận chuyển|ship|giao hàng|phí ship/.test(q))
      return {
        text:
          '🚚 **Chính sách vận chuyển:**\n• Miễn phí ship đơn từ **500.000đ**\n• Giao toàn quốc, 2–5 ngày làm việc\n• Hỗ trợ COD & chuyển khoản',
      };

    if (/đổi trả|hoàn tiền|trả hàng|return/.test(q))
      return {
        text:
          '🔄 **Chính sách đổi trả:**\n• Đổi trả miễn phí trong **7 ngày**\n• Sản phẩm còn nguyên tem, chưa dùng\n• Hotline hỗ trợ: **1900 6868**',
      };

    if (/liên hệ|hotline|điện thoại|email|contact/.test(q))
      return {
        text:
          '📞 **Liên hệ ÉLUME:**\n• Hotline: **1900 6868**\n• Email: **hello@elume.vn**\n• Làm việc: 8:00 – 21:00 hàng ngày',
      };

    if (/sale|giảm giá|khuyến mãi|ưu đãi/.test(q)) {
      const list = PRODUCTS.filter((p) => p.oldPrice);
      return { text: `Có **${list.length} sản phẩm** đang giảm giá! 🏷️`, products: list };
    }

    if (/mới|new\b|mới nhất/.test(q)) {
      const list = PRODUCTS.filter((p) => p.badge === 'Mới');
      return { text: 'Sản phẩm mới nhất tại ÉLUME ✨', products: list };
    }

    if (/váy|đầm|chân váy|skirt|dress/.test(q)) {
      const list = PRODUCTS.filter((p) => p.category === 'vay');
      return { text: 'Bộ sưu tập váy & đầm bé gái 👗', products: list };
    }

    if (/\báo\b|shirt|top|thun|sơ mi|len|croptop/.test(q)) {
      const list = PRODUCTS.filter((p) => p.category === 'ao');
      return { text: 'Các loại áo cho bé tại ÉLUME 👕', products: list };
    }

    if (/quần|pants|short|jeans|legging|jogger/.test(q)) {
      const list = PRODUCTS.filter((p) => p.category === 'quan');
      return { text: 'Các loại quần cho bé tại ÉLUME 👖', products: list };
    }

    if (/bộ đồ|bộ|set\b|pyjama|đồ ngủ|siêu nhân|yếm/.test(q)) {
      const list = PRODUCTS.filter((p) => p.category === 'bo-do');
      return { text: 'Các bộ đồ dễ thương cho bé 🧸', products: list };
    }

    if (/phụ kiện|mũ|balo|nón|cap|backpack|accessories/.test(q)) {
      const list = PRODUCTS.filter((p) => p.category === 'phu-kien');
      return { text: 'Phụ kiện dễ thương cho bé 🎒', products: list };
    }

    if (/bé gái|con gái|girl/.test(q)) {
      const list = PRODUCTS.filter((p) => p.tags && p.tags.includes('girl'));
      return { text: 'Sản phẩm dành riêng cho bé gái 🎀', products: list };
    }

    if (/bé trai|con trai|boy/.test(q)) {
      const list = PRODUCTS.filter((p) => p.tags && p.tags.includes('boy'));
      return { text: 'Sản phẩm dành riêng cho bé trai ⚽', products: list };
    }

    if (/rẻ|giá thấp|ít tiền|tiết kiệm|cheap/.test(q)) {
      const list = [...PRODUCTS].sort((a, b) => a.price - b.price).slice(0, 6);
      return { text: 'Sản phẩm giá tốt nhất tại ÉLUME 💰', products: list };
    }

    if (/đắt|cao cấp|premium|luxury/.test(q)) {
      const list = [...PRODUCTS].sort((a, b) => b.price - a.price).slice(0, 6);
      return { text: 'Sản phẩm cao cấp của ÉLUME ✨', products: list };
    }

    // Keyword search across all product fields
    const found = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.tags && p.tags.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
    );
    if (found.length > 0)
      return { text: `Tìm thấy **${found.length} sản phẩm** phù hợp:`, products: found };

    return {
      text:
        'Tôi chưa hiểu câu hỏi đó. 🤔\nBạn có thể hỏi về:\n• Loại sản phẩm (váy, áo, quần, bộ đồ…)\n• Hàng sale, hàng mới\n• Phù hợp bé trai / bé gái\n• Size, vận chuyển, đổi trả',
    };
  }

  function addMessage(text, type, products) {
    const box = document.getElementById('elume-chat-messages');
    if (!box) return;

    const row = document.createElement('div');
    row.className = `echat-row echat-row--${type}`;

    if (type === 'bot') {
      row.innerHTML = `
        <span class="echat-avatar">E</span>
        <div class="echat-bubble echat-bubble--bot">${fmt(text)}</div>`;
    } else {
      row.innerHTML = `<div class="echat-bubble echat-bubble--user">${text}</div>`;
    }
    box.appendChild(row);

    if (products && products.length) {
      const cards = document.createElement('div');
      cards.className = 'echat-products';
      cards.innerHTML = products
        .slice(0, 4)
        .map(
          (p) => `
          <a class="echat-pcard" href="product.html?id=${p.id}">
            <span class="echat-pcard-icon">${p.icon}</span>
            <div class="echat-pcard-body">
              <div class="echat-pcard-name">${p.name}</div>
              <div class="echat-pcard-price">${formatPrice(p.price)}${p.oldPrice ? ` <s>${formatPrice(p.oldPrice)}</s>` : ''}</div>
            </div>
          </a>`
        )
        .join('');
      box.appendChild(cards);
    }

    box.scrollTop = box.scrollHeight;
  }

  function showTyping() {
    const box = document.getElementById('elume-chat-messages');
    const el = document.createElement('div');
    el.className = 'echat-row echat-row--bot';
    el.id = 'echat-typing';
    el.innerHTML = `<span class="echat-avatar">E</span><div class="echat-bubble echat-bubble--bot echat-typing"><span></span><span></span><span></span></div>`;
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('echat-typing');
    if (el) el.remove();
  }

  function showQuickReplies() {
    const qr = document.getElementById('elume-chat-qr');
    if (!qr) return;
    qr.innerHTML = QUICK_REPLIES.map(
      (r) => `<button class="echat-qr" data-q="${r.q}">${r.label}</button>`
    ).join('');
    qr.querySelectorAll('.echat-qr').forEach((btn) =>
      btn.addEventListener('click', () => handleQuery(btn.dataset.q))
    );
  }

  function handleQuery(text) {
    if (!text.trim()) return;
    const input = document.getElementById('elume-chat-input');
    if (input) input.value = '';
    document.getElementById('elume-chat-qr').innerHTML = '';
    addMessage(text, 'user');

    showTyping();
    setTimeout(() => {
      removeTyping();
      const { text: reply, products } = getResponse(text);
      addMessage(reply, 'bot', products);
    }, 600);
  }

  function buildWidget() {
    const wrap = document.createElement('div');
    wrap.id = 'elume-chat-widget';
    wrap.innerHTML = `
      <button class="echat-fab" id="echat-fab" aria-label="Chat với trợ lý ÉLUME">
        <span class="echat-fab-open">💬</span>
        <span class="echat-fab-close" style="display:none">✕</span>
        <span class="echat-fab-dot"></span>
      </button>
      <div class="echat-panel" id="echat-panel" aria-hidden="true">
        <div class="echat-header">
          <span class="echat-header-avatar">E</span>
          <div class="echat-header-info">
            <strong>Trợ lý ÉLUME</strong>
            <span>Trả lời ngay lập tức</span>
          </div>
          <button class="echat-header-close" id="echat-close" aria-label="Đóng">✕</button>
        </div>
        <div class="echat-messages" id="elume-chat-messages"></div>
        <div class="echat-qr-wrap" id="elume-chat-qr"></div>
        <div class="echat-footer">
          <input type="text" class="echat-input" id="elume-chat-input" placeholder="Nhập câu hỏi...">
          <button class="echat-send" id="echat-send" aria-label="Gửi">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildWidget();

    const fab = document.getElementById('echat-fab');
    const panel = document.getElementById('echat-panel');
    const closeBtn = document.getElementById('echat-close');
    const input = document.getElementById('elume-chat-input');
    const sendBtn = document.getElementById('echat-send');
    let opened = false;

    function openChat() {
      opened = true;
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      fab.querySelector('.echat-fab-open').style.display = 'none';
      fab.querySelector('.echat-fab-close').style.display = '';
      fab.querySelector('.echat-fab-dot').style.display = 'none';
      if (!document.getElementById('elume-chat-messages').children.length) {
        addMessage(GREET, 'bot');
        showQuickReplies();
      }
      setTimeout(() => input.focus(), 250);
    }

    function closeChat() {
      opened = false;
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      fab.querySelector('.echat-fab-open').style.display = '';
      fab.querySelector('.echat-fab-close').style.display = 'none';
    }

    fab.addEventListener('click', () => (opened ? closeChat() : openChat()));
    closeBtn.addEventListener('click', closeChat);

    sendBtn.addEventListener('click', () => handleQuery(input.value.trim()));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleQuery(input.value.trim());
    });
  });
})();
