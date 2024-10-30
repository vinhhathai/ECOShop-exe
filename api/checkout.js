const progressBar = document.getElementById('progressBar');
const paymentMethodSelect = document.getElementById('paymentMethod');
const bankPaymentInfo = document.getElementById('bankPaymentInfo');
const momoPaymentInfo = document.getElementById('momoPaymentInfo');
const cashPaymentInfo = document.getElementById('cashPaymentInfo');
const momoPayButton = document.getElementById('momoPayButton');
let currentStep = 1;

// Cập nhật thanh tiến trình
function updateProgressBar(step) {
  const progressPercent = step * 33; // Tăng mỗi bước 33%
  progressBar.style.width = progressPercent + '%';
  progressBar.setAttribute('aria-valuenow', progressPercent);

  if (step === 1) {
    progressBar.innerText = 'Bước 1: Chọn phương thức';
  } else if (step === 2) {
    progressBar.innerText = 'Bước 2: Xác nhận thông tin';
  } else if (step === 3) {
    progressBar.innerText = 'Bước 3: Hoàn tất thanh toán';
  }
}

// Xử lý thay đổi phương thức thanh toán
paymentMethodSelect.addEventListener('change', function() {
  const selectedMethod = paymentMethodSelect.value;
  bankPaymentInfo.style.display = 'none';
  momoPaymentInfo.style.display = 'none';
  cashPaymentInfo.style.display = 'none';

  if (selectedMethod === 'bank') {
    bankPaymentInfo.style.display = 'block';
  } else if (selectedMethod === 'momo') {
    momoPaymentInfo.style.display = 'block';
  } else if (selectedMethod === 'cash') {
    cashPaymentInfo.style.display = 'block';
  }
  currentStep = 2; // Chuyển sang bước xác nhận
  updateProgressBar(currentStep);
});

// Giả lập xử lý thanh toán với MoMo
momoPayButton.addEventListener('click', function() {
  alert("Chuyển đến ứng dụng MoMo để hoàn tất thanh toán.");
});

// Xác nhận thanh toán
document.getElementById('confirmPayment').addEventListener('click', function() {
  const selectedMethod = paymentMethodSelect.value;
  if (selectedMethod === 'bank') {
    alert("Vui lòng chuyển khoản theo thông tin ngân hàng đã cung cấp.");
  } else if (selectedMethod === 'momo') {
    alert("Vui lòng hoàn tất thanh toán qua MoMo.");
  } else if (selectedMethod === 'cash') {
    alert("Thanh toán bằng tiền mặt sẽ được thực hiện khi nhận hàng.");
  }
  currentStep = 3; // Chuyển sang bước hoàn tất thanh toán
  updateProgressBar(currentStep);
});