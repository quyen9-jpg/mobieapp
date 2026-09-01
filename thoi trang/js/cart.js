// Quản lý giỏ hàng bằng localStorage
const CART_KEY = "reve_cart";
const ORDERS_KEY = "reve_orders";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty, size, color) {
  const cart = getCart();
  const existing = cart.find(
    (item) => item.productId === productId && item.size === size && item.color === color
  );
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty, size, color });
  }
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateCartQty(index, qty) {
  const cart = getCart();
  if (cart[index]) {
    cart[index].qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.productId);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function createOrderFromCart(customer, payment) {
  const cart = getCart();
  const items = cart
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return {
        productId: product.id,
        name: product.name,
        icon: product.icon,
        price: product.price,
        qty: item.qty,
        size: item.size,
        color: item.color
      };
    })
    .filter(Boolean);

  const subtotal = cartTotal();
  const shipping = subtotal > 0 ? 30000 : 0;

  const order = {
    id: "DH" + Date.now(),
    date: new Date().toISOString(),
    status: "Đang xử lý",
    items,
    customer,
    payment,
    subtotal,
    shipping,
    total: subtotal + shipping
  };

  saveOrder(order);
  return order;
}

function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-badge");
  const count = cartCount();
  badges.forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
