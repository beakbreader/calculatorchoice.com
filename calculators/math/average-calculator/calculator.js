document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('avgForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('numbers').value;
    const numbers = input.split(/[,\s]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
    if (numbers.length === 0) {
      result.textContent = 'Please enter valid numbers separated by commas.';
      return;
    }
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = sum / numbers.length;
    result.textContent = `Average: ${avg.toFixed(2)}`;
  });
});
