document.getElementById('calc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const voltage = parseFloat(document.getElementById('voltage').value);
  const resistance = parseFloat(document.getElementById('resistance').value);
  const result = voltage / resistance;
  document.getElementById('result').textContent = result;
});
