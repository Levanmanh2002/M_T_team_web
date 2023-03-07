// Lấy giá trị của checkbox "Lưu mật khẩu"
var savePasswordCheckbox = document.getElementById("save-password-checkbox");

// Lấy giá trị của các trường input
var emailInput = document.getElementById("email-input");
var passwordInput = document.getElementById("password-input");

// Kiểm tra nếu có thông tin đăng nhập trong localStorage thì tự động điền vào form
if (localStorage.getItem("savedEmail")) {
  emailInput.value = localStorage.getItem("savedEmail");
  passwordInput.value = localStorage.getItem("savedPassword");
  savePasswordCheckbox.checked = true;
}

// Xử lý sự kiện khi người dùng đăng nhập thành công
function handleLoginSuccess() {
  // Nếu người dùng chọn lưu mật khẩu, lưu thông tin đăng nhập vào localStorage
  if (savePasswordCheckbox.checked) {
    localStorage.setItem("savedEmail", emailInput.value);
    localStorage.setItem("savedPassword", passwordInput.value);
  } else {
    // Nếu người dùng không chọn lưu mật khẩu, xoá thông tin đăng nhập khỏi localStorage
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedPassword");
  }
}
