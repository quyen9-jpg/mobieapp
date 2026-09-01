// Giao diện đăng nhập / đăng ký (chưa nối backend thật)

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;
      const errorEl = document.getElementById("login-error");

      if (!email || password.length < 6) {
        errorEl.textContent = "Vui lòng nhập email hợp lệ và mật khẩu tối thiểu 6 ký tự.";
        errorEl.classList.add("show");
        return;
      }
      errorEl.classList.remove("show");
      localStorage.setItem("reve_user", JSON.stringify({ email }));
      showToast("Đăng nhập thành công!");
      setTimeout(() => (location.href = "index.html"), 800);
    });
  }

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = registerForm.name.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value;
      const confirm = registerForm.confirm.value;
      const errorEl = document.getElementById("register-error");

      if (!name || !email || password.length < 6) {
        errorEl.textContent = "Vui lòng điền đầy đủ thông tin, mật khẩu tối thiểu 6 ký tự.";
        errorEl.classList.add("show");
        return;
      }
      if (password !== confirm) {
        errorEl.textContent = "Mật khẩu nhập lại không khớp.";
        errorEl.classList.add("show");
        return;
      }
      errorEl.classList.remove("show");
      localStorage.setItem("reve_user", JSON.stringify({ name, email }));
      showToast("Tạo tài khoản thành công! Vui lòng đăng nhập.");
      setTimeout(() => (location.href = "login.html"), 800);
    });
  }
});
