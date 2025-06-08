document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('halfLifeForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const initial = parseFloat(document.getElementById('initial').value);
    const halfLife = parseFloat(document.getElementById('halfLife').value);
    const time = parseFloat(document.getElementById('time').value);

    if (initial < 0 || halfLife <= 0 || time < 0) {
      result.textContent = 'Please enter valid values.';
      return;
    }

    const remaining = initial * Math.pow(0.5, time / halfLife);

    result.textContent = `Remaining Amount: ${remaining.toFixed(4)}`;
  });
});
