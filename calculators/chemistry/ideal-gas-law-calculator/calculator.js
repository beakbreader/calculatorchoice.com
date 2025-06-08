document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('gasForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const n = parseFloat(document.getElementById('moles').value);
    const T = parseFloat(document.getElementById('temperature').value);
    const V = parseFloat(document.getElementById('volume').value);

    if (n <= 0 || T <= 0 || V <= 0) {
      result.textContent = 'Please enter valid values.';
      return;
    }

    const R = 0.0821; // L·atm/(mol·K)
    const P = (n * R * T) / V;

    result.textContent = `Pressure: ${P.toFixed(4)} atm`;
  });
});
