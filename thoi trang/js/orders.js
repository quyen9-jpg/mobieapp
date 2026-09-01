// Logic riêng cho trang orders.html: hiển thị lịch sử đặt hàng từ localStorage

const PAYMENT_LABELS = {
  cod: "Thanh toán khi nhận hàng (COD)",
  bank: "Chuyển khoản ngân hàng",
  card: "Thẻ tín dụng / ghi nợ"
};

function formatOrderDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

function renderOrdersPage() {
  const wrap = document.getElementById("orders-page-wrap");
  if (!wrap) return;

  const orders = getOrders();

  if (orders.length === 0) {
    wrap.innerHTML = `
      <div class="empty-state">
        <h2>Bạn chưa có đơn hàng nào</h2>
        <p>Lịch sử đặt hàng của bạn sẽ hiển thị tại đây sau khi bạn hoàn tất đặt hàng.</p>
        <a class="btn" href="shop.html">Tiếp tục mua sắm</a>
      </div>
    `;
    return;
  }

  wrap.innerHTML = `
    <div class="orders-list">
      ${orders.map(renderOrderCard).join("")}
    </div>
  `;
}

function renderOrderCard(order) {
  const itemsHtml = order.items
    .map((item) => {
      const product = getProductById(item.productId);
      const image = product ? (getProductImages(product.id)[0] || LOCAL_IMAGES.products[product.id]) : null;
      const tags = product ? product.tags : "";
      return `
        <div class="order-item-row">
          ${renderMediaBox("thumb-box-sm", item.productId, item.icon, image, tags)}
          <div>
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-meta">Size: ${item.size} · Màu: ${item.color} · SL: ${item.qty}</div>
          </div>
          <div class="order-item-line">${formatPrice(item.price * item.qty)}</div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="order-card">
      <div class="order-card-header">
        <div>
          <div class="order-card-id">Đơn hàng #${order.id}</div>
          <div class="order-card-date">${formatOrderDate(order.date)}</div>
        </div>
        <span class="order-status">${order.status}</span>
      </div>
      <div class="order-card-body">
        ${itemsHtml}
      </div>
      <div class="order-card-footer">
        <div class="order-card-customer">
          ${order.customer.fullname} · ${order.customer.phone}<br>
          ${order.customer.address}<br>
          ${PAYMENT_LABELS[order.payment] || order.payment}
        </div>
        <div class="order-card-total">Tổng cộng: ${formatPrice(order.total)}</div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderOrdersPage);
