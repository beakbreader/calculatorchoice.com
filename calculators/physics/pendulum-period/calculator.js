document.getElementById('calc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const length = parseFloat(document.getElementById('length').value);
  const result = 2 * Math.PI * Math.sqrt(length / 9.81);
  document.getElementById('result').textContent = result;
});
