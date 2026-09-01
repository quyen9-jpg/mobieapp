// Logic riêng cho trang cart.html: render giỏ hàng, cập nhật số lượng, checkout giao diện

function renderCartPage() {
  const cart = getCart();
  const bodyWrap = document.getElementById("cart-page-wrap");

  if (cart.length === 0) {
    bodyWrap.innerHTML = `
      <div class="empty-state">
        <h2>Giỏ hàng của bạn đang trống</h2>
        <p>Hãy khám phá bộ sưu tập và thêm sản phẩm yêu thích vào giỏ hàng.</p>
        <a class="btn" href="shop.html">Tiếp tục mua sắm</a>
      </div>
    `;
    return;
  }

  const rows = cart
    .map((item, index) => {
      const product = getProductById(item.productId);
      if (!product) return "";
      const lineTotal = product.price * item.qty;
      return `
        <tr>
          <td>
            <div class="cart-product">
              ${renderMediaBox("thumb-box-sm", product.id, product.icon, getProductImages(product.id)[0] || LOCAL_IMAGES.products[product.id], product.tags)}
              <div>
                <div class="cart-product-name">${product.name}</div>
                <div class="cart-product-meta">Size: ${item.size} · Màu: ${item.color}</div>
                <button class="remove-item" data-remove="${index}">Xóa</button>
              </div>
            </div>
          </td>
          <td>${formatPrice(product.price)}</td>
          <td>
            <div class="qty-stepper">
              <button type="button" data-qty-minus="${index}">-</button>
              <input type="number" min="1" value="${item.qty}" data-qty-input="${index}">
              <button type="button" data-qty-plus="${index}">+</button>
            </div>
          </td>
          <td><strong>${formatPrice(lineTotal)}</strong></td>
        </tr>
      `;
    })
    .join("");

  const subtotal = cartTotal();
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  bodyWrap.innerHTML = `
    <div class="cart-layout">
      <div>
        <table class="cart-table">
          <thead>
            <tr><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Tạm tính</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <form class="checkout-form" id="checkout-form">
          <h2>Thông tin giao hàng</h2>
          <div class="form-grid">
            <div class="form-field">
              <label>Họ và tên</label>
              <input type="text" name="fullname" required>
            </div>
            <div class="form-field">
              <label>Số điện thoại</label>
              <input type="tel" name="phone" required pattern="[0-9]{9,11}">
            </div>
            <div class="form-field full">
              <label>Địa chỉ</label>
              <input type="text" name="address" required>
            </div>
            <div class="form-field full">
              <label>Ghi chú</label>
              <textarea name="note" rows="3"></textarea>
            </div>
          </div>

          <h2>Phương thức thanh toán</h2>
          <div class="payment-options">
            <label><input type="radio" name="payment" value="cod" checked> Thanh toán khi nhận hàng (COD)</label>
            <label><input type="radio" name="payment" value="bank"> Chuyển khoản ngân hàng</label>
            <label><input type="radio" name="payment" value="card"> Thẻ tín dụng / ghi nợ</label>
          </div>

          <button type="submit" class="btn btn-block">Đặt hàng</button>
        </form>
      </div>

      <div class="summary-box">
        <h3>Tóm tắt đơn hàng</h3>
        <div class="summary-row"><span>Tạm tính</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Phí vận chuyển</span><span>${formatPrice(shipping)}</span></div>
        <div class="summary-row total"><span>Tổng cộng</span><span>${formatPrice(total)}</span></div>
      </div>
    </div>
  `;

  wireCartRowEvents();

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const customer = {
      fullname: form.fullname.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      note: form.note.value.trim()
    };
    const payment = form.payment.value;
    const order = createOrderFromCart(customer, payment);
    clearCart();
    bodyWrap.innerHTML = `
      <div class="empty-state">
        <h2>Đặt hàng thành công!</h2>
        <p>Mã đơn hàng <strong>${order.id}</strong>. Cảm ơn bạn đã mua sắm tại ÉLUME. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.</p>
        <a class="btn" href="orders.html" style="margin-right:12px;">Xem lịch sử đặt hàng</a>
        <a class="btn btn-outline" href="index.html">Về trang chủ</a>
      </div>
    `;
  });
}

function wireCartRowEvents() {
  document.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.getAttribute("data-remove")));
      renderCartPage();
    });
  });
  document.querySelectorAll("[data-qty-minus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-qty-minus"));
      const cart = getCart();
      updateCartQty(idx, cart[idx].qty - 1);
      renderCartPage();
    });
  });
  document.querySelectorAll("[data-qty-plus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-qty-plus"));
      const cart = getCart();
      updateCartQty(idx, cart[idx].qty + 1);
      renderCartPage();
    });
  });
  document.querySelectorAll("[data-qty-input]").forEach((input) => {
    input.addEventListener("change", () => {
      const idx = Number(input.getAttribute("data-qty-input"));
      updateCartQty(idx, Number(input.value));
      renderCartPage();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCartPage);
