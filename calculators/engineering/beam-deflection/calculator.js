document.getElementById('calc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const load = parseFloat(document.getElementById('load').value);
  const length = parseFloat(document.getElementById('length').value);
  const modulus = parseFloat(document.getElementById('modulus').value);
  const inertia = parseFloat(document.getElementById('inertia').value);
  const result = (load * Math.pow(length,3)) / (48 * modulus * inertia);
  document.getElementById('result').textContent = result;
});
