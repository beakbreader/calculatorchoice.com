document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('percentCompForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const part = parseFloat(document.getElementById('part').value);
    const total = parseFloat(document.getElementById('total').value);

    if (part < 0 || total <= 0) {
      result.textContent = 'Please enter valid values.';
      return;
    }

    const percent = (part / total) * 100;

    result.textContent = `Percent Composition: ${percent.toFixed(2)}%`;
  });
});
