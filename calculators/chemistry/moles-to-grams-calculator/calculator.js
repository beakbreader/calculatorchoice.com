document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('molesToGramsForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const moles = parseFloat(document.getElementById('moles').value);
    const molarMass = parseFloat(document.getElementById('molarMass').value);

    if (moles < 0 || molarMass <= 0) {
      result.textContent = 'Please enter valid values.';
      return;
    }

    const grams = moles * molarMass;

    result.textContent = `Mass: ${grams.toFixed(4)} g`;
  });
});
