document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('heightForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const father = parseFloat(document.getElementById('fatherHeight').value);
    const mother = parseFloat(document.getElementById('motherHeight').value);
    const gender = document.getElementById('gender').value;
    const unit = document.getElementById('unit').value;

    if (isNaN(father) || isNaN(mother) || !gender || !unit) {
      result.textContent = "Please fill in all fields correctly.";
      return;
    }

    let prediction;

    if (gender === 'male') {
      prediction = (father + mother + 5) / 2;
    } else {
      prediction = (father + mother - 5) / 2;
    }

    if (unit === 'cm') {
      prediction *= 2.54;
    }

    prediction = prediction.toFixed(1);
    const label = unit === 'cm' ? 'cm' : 'inches';

    result.textContent = `Your predicted adult height is approximately ${prediction} ${label}.`;
  });
});
