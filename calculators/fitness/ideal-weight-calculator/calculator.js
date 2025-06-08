document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('idealForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    if (isNaN(height)) {
      result.textContent = 'Please enter your height.';
      return;
    }
    const inches = height / 2.54;
    let ideal;
    if (gender === 'male') {
      ideal = 50 + 2.3 * (inches - 60);
    } else {
      ideal = 45.5 + 2.3 * (inches - 60);
    }
    result.textContent = `Estimated ideal weight: ${ideal.toFixed(2)} kg`;
  });
});
