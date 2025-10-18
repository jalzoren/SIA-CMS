const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

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
        window.location.href = "../admin/dashboard.html"; // redirect after success
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: result.message,
      });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Server not reachable",
    });
    console.error(err);
  }
});
