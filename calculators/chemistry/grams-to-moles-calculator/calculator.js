document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('gramsToMolesForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const grams = parseFloat(document.getElementById('grams').value);
    const molarMass = parseFloat(document.getElementById('molarMass').value);

    if (grams < 0 || molarMass <= 0) {
      result.textContent = 'Please enter valid values.';
      return;
    }

    const moles = grams / molarMass;

    result.textContent = `Moles: ${moles.toFixed(4)} mol`;
  });
});
