const form = document.getElementById('register-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    Swal.fire('Error', 'Passwords do not match', 'error');
    return;
  }

  // Send data to PHP backend
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);

  const response = await fetch('../admin/php/registration.php', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();

  if (result.success) {
    Swal.fire('Success', result.message, 'success').then(() => {
      window.location.href = '../admin/login.html';
    });
  } else {
    Swal.fire('Error', result.message, 'error');
  }
});


const showPasswordCheckbox = document.getElementById("show-password");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

showPasswordCheckbox.addEventListener("change", () => {
  const type = showPasswordCheckbox.checked ? "text" : "password";
  passwordInput.type = type;
  confirmPasswordInput.type = type;
});