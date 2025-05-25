document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('bmiForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!age || !gender || isNaN(height) || isNaN(weight) || height <= 0) {
      result.textContent = 'Please fill in all fields correctly.';
      return;
    }

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);

    let category = '';
    if (bmi < 14) {
      category = 'Underweight (Below 5th percentile)';
    } else if (bmi < 18) {
      category = 'Healthy weight (5th to 85th percentile)';
    } else if (bmi < 21) {
      category = 'Overweight (85th to 95th percentile)';
    } else {
      category = 'Obese (95th percentile and above)';
    }

    result.textContent = `BMI: ${bmi.toFixed(1)} - ${category}`;
  });
});
