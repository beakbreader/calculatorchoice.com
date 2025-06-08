document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('molarityForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const mass = parseFloat(document.getElementById('mass').value);
    const molarMass = parseFloat(document.getElementById('molarMass').value);
    const volume = parseFloat(document.getElementById('volume').value);

    if (mass <= 0 || molarMass <= 0 || volume <= 0) {
      result.textContent = 'Please enter valid values.';
      return;
    }

    const moles = mass / molarMass;
    const molarity = moles / volume;

    result.textContent = `Molarity: ${molarity.toFixed(4)} M`;
  });
});
