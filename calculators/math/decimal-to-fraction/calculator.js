document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('decForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const value = parseFloat(document.getElementById('decimal').value);
    if (isNaN(value)) {
      result.textContent = 'Please enter a valid decimal number.';
      return;
    }
    const str = value.toString();
    const decimalPlaces = str.includes('.') ? str.split('.')[1].length : 0;
    const denominator = Math.pow(10, decimalPlaces);
    const numerator = Math.round(value * denominator);
    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    const divisor = gcd(numerator, denominator);
    result.textContent = `${numerator / divisor}/${denominator / divisor}`;
  });
});
