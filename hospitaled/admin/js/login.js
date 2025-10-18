const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("Email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) return alert("All fields are required");

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const response = await fetch("../admin/login.php", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    alert("Login successful!");
    window.location.href = "../admin/login.html";
  } else {
    alert("Login failed: " + result.message);
  }
});
