document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('gradeForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const earned = parseFloat(document.getElementById('earned').value);
    const total = parseFloat(document.getElementById('total').value);

    if (isNaN(earned) || isNaN(total) || total <= 0) {
      result.textContent = 'Please enter valid numbers. Total must be greater than zero.';
      return;
    }

    const percentage = (earned / total) * 100;
    result.textContent = `Your grade is ${percentage.toFixed(2)}%.`;
  });
});