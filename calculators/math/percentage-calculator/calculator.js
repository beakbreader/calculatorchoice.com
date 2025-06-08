document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('percentForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const part = parseFloat(document.getElementById('part').value);
    const whole = parseFloat(document.getElementById('whole').value);
    if (isNaN(part) || isNaN(whole) || whole === 0) {
      result.textContent = 'Please enter valid numbers. Whole must be non-zero.';
      return;
    }
    const percent = (part / whole) * 100;
    result.textContent = `${percent.toFixed(2)}%`;
  });
});
