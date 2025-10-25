
document.getElementById("show-password").addEventListener("change", function () {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
  });

  document.getElementById("show-password").addEventListener("change", function () {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
  });
  
  document.getElementById("show-password").addEventListener("change", function () {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
  });
  
  const loginForm = document.getElementById("login-form");
  const loginButton = loginForm.querySelector("button[type='submit']");
  
  let failedAttempts = 0;
  let isLocked = false;
  
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    if (isLocked) {
      Swal.fire({
        icon: "warning",
        title: "Locked!",
        text: "Please wait for the countdown to finish before trying again.",
      });
      return;
    }
  
    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("password").value;
  
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "All fields are required",
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    Swal.fire({
      title: "Logging in...",
      text: "Please wait while we verify your credentials.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await fetch("../admin/php/login.php", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: result.message,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "../admin/index.html";
        });
      } else {
        failedAttempts++;
        const remaining = 3 - failedAttempts;
  
        if (remaining <= 0) {
          failedAttempts = 0;
          startCountdown(30);
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            html: `${result.message}<br><br><b>Attempts left: ${remaining}</b>`,
          });
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Server not reachable.",
      });
      console.error(err);
    }
  });
  
  function startCountdown(seconds) {
    isLocked = true;
    loginButton.disabled = true;
    let remaining = seconds;
  
    Swal.fire({
      icon: "info",
      title: "Too Many Attempts!",
      html: `You’ve been locked out.<br><br>Please wait <b>${remaining}</b> seconds.`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        const timer = setInterval(() => {
          remaining--;
          const html = `You’ve been locked out.<br><br>Please wait <b>${remaining}</b> seconds.`;
          Swal.getHtmlContainer().innerHTML = html;
  
          if (remaining <= 0) {
            clearInterval(timer);
            Swal.close();
            isLocked = false;
            loginButton.disabled = false;
            Swal.fire({
              icon: "success",
              title: "Unlocked!",
              text: "You can now try logging in again.",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        }, 1000);
      },
    });
  }
  