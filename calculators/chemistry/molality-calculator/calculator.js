document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('molalityForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const moles = parseFloat(document.getElementById('moles').value);
    const kg = parseFloat(document.getElementById('kg').value);

    if (moles < 0 || kg <= 0) {
      result.textContent = 'Please enter valid values.';
      return;
    }

    const molality = moles / kg;

    result.textContent = `Molality: ${molality.toFixed(4)} m`;
  });
});
