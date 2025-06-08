document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('fracForm');
  const result = document.getElementById('result');

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const n1 = parseFloat(document.getElementById('num1').value);
    const d1 = parseFloat(document.getElementById('den1').value);
    const n2 = parseFloat(document.getElementById('num2').value);
    const d2 = parseFloat(document.getElementById('den2').value);
    const op = document.getElementById('operation').value;

    if ([n1,d1,n2,d2].some(x => isNaN(x)) || d1 === 0 || d2 === 0) {
      result.textContent = 'Please enter valid numbers. Denominators cannot be zero.';
      return;
    }

    let num, den;
    switch(op) {
      case 'add':
        num = n1*d2 + n2*d1;
        den = d1*d2;
        break;
      case 'subtract':
        num = n1*d2 - n2*d1;
        den = d1*d2;
        break;
      case 'multiply':
        num = n1*n2;
        den = d1*d2;
        break;
      case 'divide':
        num = n1*d2;
        den = d1*n2;
        if (den === 0) {
          result.textContent = 'Division by zero.';
          return;
        }
        break;
    }
    const divisor = gcd(Math.abs(num), Math.abs(den));
    num /= divisor;
    den /= divisor;
    const decimal = num/den;
    result.textContent = `${num}/${den} = ${decimal.toFixed(4)}`;
  });
});
