document.getElementById('calc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const velocity = parseFloat(document.getElementById('velocity').value);
  const angle = parseFloat(document.getElementById('angle').value);
  const result = (Math.pow(velocity,2) * Math.sin(2 * angle * Math.PI / 180)) / 9.81;
  document.getElementById('result').textContent = result;
});
