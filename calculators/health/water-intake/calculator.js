document.getElementById('calc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const weight = parseFloat(document.getElementById('weight').value);
  const result = weight * 0.033;
  document.getElementById('result').textContent = result;
});
