document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('yieldForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const actual = parseFloat(document.getElementById('actual').value);
    const theoretical = parseFloat(document.getElementById('theoretical').value);

    if (actual < 0 || theoretical <= 0) {
      result.textContent = 'Please enter valid values.';
      return;
    }

    const percent = (actual / theoretical) * 100;

    result.textContent = `Percent Yield: ${percent.toFixed(2)}%`;
  });
});
