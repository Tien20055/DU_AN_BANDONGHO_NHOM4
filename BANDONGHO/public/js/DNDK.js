// Hàm đăng ký
function dk() {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("passsword").value.trim();
    let rewritePassword = document.getElementById("rewrite-password").value.trim();
  
    const validateEmailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  
    // Lấy các phần tử hiển thị lỗi
    const errEmail = document.getElementById("erremail");
    const errPassword = document.getElementById("errpassword");
    const errReturnPassword = document.getElementById("err-returnpassword");
  
    // Kiểm tra email có hợp lệ không
    if (validateEmailRegex.test(email)) {
      errEmail.style.display = "none";
    } else {
      errEmail.style.display = "block";
      return; // Dừng hàm nếu email không hợp lệ
    }
  
    // Kiểm tra mật khẩu có hợp lệ không
    if (passwordRegex.test(password)) {
      errPassword.style.display = "none";
    } else {
      errPassword.style.display = "block";
      return;
    }

    // Kiểm tra xác nhận mật khẩu có khớp không
    if (password === rewritePassword && password !== "") {
      errReturnPassword.style.display = "none";
    } else {
      errReturnPassword.style.display = "block";
      return;
    }

    // Lưu thông tin đăng ký vào localStorage
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    showMessage('Đăng ký thành công!');
}

// Hàm đăng nhập
document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngăn form gửi đi để xử lý phía client

  // Lấy giá trị từ các ô input
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('mat khau').value.trim();

  // Các phần tử hiển thị lỗi
  const errEmail = document.getElementById('erremail');
  const errPassword = document.getElementById('errpassword');

  // Lấy thông tin đăng ký từ localStorage
  const registeredEmail = localStorage.getItem('registeredEmail');
  const registeredPassword = localStorage.getItem('registeredPassword');

  // Khởi tạo trạng thái mặc định
  let isValid = true;

  // Kiểm tra email
  if (email !== registeredEmail) {
    errEmail.style.display = 'block';
    isValid = false;
  } else {
    errEmail.style.display = 'none';
  }

  // Kiểm tra mật khẩu
  if (password !== registeredPassword) {
    errPassword.style.display = 'block';
    isValid = false;
  } else {
    errPassword.style.display = 'none';
  }

  // Nếu thông tin hợp lệ
  if (isValid) {
    showMessage('Đăng nhập thành công!');
  }
});

// Hàm hiển thị thông báo trên đầu trang
function showMessage(message) {
  const messageBox = document.createElement('div');
  messageBox.textContent = message;
  messageBox.style.position = 'fixed';
  messageBox.style.top = '0';
  messageBox.style.left = '50%';
  messageBox.style.transform = 'translateX(-50%)';
  messageBox.style.backgroundColor = '#4CAF50';
  messageBox.style.color = 'white';
  messageBox.style.padding = '10px';
 
  
  document.body.appendChild(messageBox);

  setTimeout(() => {
    document.body.removeChild(messageBox);
  }, 3000); // Thông báo sẽ tự động biến mất sau 3 giây
}
