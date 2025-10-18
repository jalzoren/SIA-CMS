// SEND CODE PAGE


document.addEventListener("DOMContentLoaded", () => {

      // -----------------------------
  // 🔹 SHOW / HIDE PASSWORD TOGGLE
  // -----------------------------
  const toggle = document.getElementById("show-passwords");
  const newPass = document.getElementById("new-password");
  const confirmPass = document.getElementById("confirm-password");

  if (toggle && newPass && confirmPass) {
    toggle.addEventListener("change", () => {
      const type = toggle.checked ? "text" : "password";
      newPass.type = type;
      confirmPass.type = type;
    });
  }
    const sendBtn = document.querySelector(".send-code-btn");
    const forgotForm = document.getElementById("forgot-form");
  
    if (sendBtn) {
      sendBtn.addEventListener("click", async () => {
        const email = document.getElementById("email").value.trim();
        if (!email) return Swal.fire("Error", "Email is required", "error");
  
        const fd = new FormData();
        fd.append("email", email);
  
        try {
          const res = await fetch("../admin/php/forgot_password.php", {
            method: "POST",
            body: fd,
          });
          const data = await res.json();
  
          Swal.fire(
            data.success ? "Success" : "Error",
            data.message,
            data.success ? "success" : "error"
          );
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Something went wrong", "error");
        }
      });
    }
  
    if (forgotForm) {
      forgotForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const email = document.getElementById("email").value.trim();
        const code = document.getElementById("code").value.trim();
  
        if (!email || !code)
          return Swal.fire("Error", "Please enter your email and code", "error");
  
        try {
          const res = await fetch("../admin/php/verify_code.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ email, code }),
          });
  
          const data = await res.json();
  
          if (data.success) {
            Swal.fire("Success", "Code verified!", "success").then(() => {
              window.location.href = `reset.html?email=${encodeURIComponent(
                email
              )}&code=${encodeURIComponent(code)}`;
            });
          } else {
            Swal.fire("Error", data.message, "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Verification failed", "error");
        }
      });
    }
  
    // RESET PASSWORD PAGE
    const resetForm = document.getElementById("reset-form");
  
    if (resetForm) {
      resetForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const newPassword = document.getElementById("new-password").value.trim();
        const confirmPassword = document
          .getElementById("confirm-password")
          .value.trim();
  
        if (newPassword !== confirmPassword) {
          Swal.fire("Error", "Passwords do not match!", "error");
          return;
        }
  
        const params = new URLSearchParams(window.location.search);
        const email = params.get("email");
        const code = params.get("code");
  
        if (!email || !code) {
          Swal.fire("Error", "Missing email or code.", "error");
          return;
        }
  
        try {
          const response = await fetch("../admin/php/reset-password.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              email,
              code,
              new_password: newPassword,
            }),
          });
  
          const result = await response.json();
          if (result.success) {
            Swal.fire("Success", "Password reset successfully!", "success").then(
              () => {
                window.location.href = "login.html";
              }
            );
          } else {
            Swal.fire("Error", result.message, "error");
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire("Error", "An error occurred. Please try again later.", "error");
        }
      });
    }
  });
