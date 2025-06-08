document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bmrForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
      result.textContent = 'Please fill out all fields correctly.';
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    result.textContent = `Your estimated BMR is ${bmr.toFixed(2)} calories/day.`;
  });
});
