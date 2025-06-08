document.getElementById('calc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const mass = parseFloat(document.getElementById('mass').value);
  const radius = parseFloat(document.getElementById('radius').value);
  const result = Math.sqrt(2 * 6.67430e-11 * mass / radius);
  document.getElementById('result').textContent = result;
});
