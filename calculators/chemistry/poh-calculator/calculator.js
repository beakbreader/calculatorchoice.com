document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('pohForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const conc = parseFloat(document.getElementById('concentration').value);

    if (conc <= 0) {
      result.textContent = 'Please enter a valid concentration.';
      return;
    }

    const pOH = -Math.log10(conc);
    result.textContent = `pOH: ${pOH.toFixed(4)}`;
  });
});
