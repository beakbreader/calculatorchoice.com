document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('normalityForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const equivalents = parseFloat(document.getElementById('equivalents').value);
    const volume = parseFloat(document.getElementById('volume').value);

    if (equivalents < 0 || volume <= 0) {
      result.textContent = 'Please enter valid values.';
      return;
    }

    const normality = equivalents / volume;

    result.textContent = `Normality: ${normality.toFixed(4)} N`;
  });
});
