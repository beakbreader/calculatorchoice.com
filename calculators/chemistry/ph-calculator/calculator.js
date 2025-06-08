document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('phForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const conc = parseFloat(document.getElementById('concentration').value);

    if (conc <= 0) {
      result.textContent = 'Please enter a valid concentration.';
      return;
    }

    const pH = -Math.log10(conc);
    result.textContent = `pH: ${pH.toFixed(4)}`;
  });
});
