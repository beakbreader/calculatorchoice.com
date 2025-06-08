document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('dilutionForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const c1 = parseFloat(document.getElementById('c1').value);
    const v1 = parseFloat(document.getElementById('v1').value);
    const c2 = parseFloat(document.getElementById('c2').value);

    if (c1 <= 0 || v1 <= 0 || c2 <= 0) {
      result.textContent = 'Please enter valid values.';
      return;
    }

    const v2 = (c1 * v1) / c2;
    result.textContent = `Final volume (V2): ${v2.toFixed(4)} L`;
  });
});
