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
      result.textContent = 'Please fill in all fields correctly.';
      return;
    }

    let fatherInInches = father;
    let motherInInches = mother;
    if (unit === 'cm') {
      fatherInInches = father / 2.54;
      motherInInches = mother / 2.54;
    }

    let height;
    if (gender === 'male') {
      height = (fatherInInches + motherInInches + 5) / 2;
    } else {
      height = (fatherInInches + motherInInches - 5) / 2;
    }

    if (unit === 'cm') {
      height *= 2.54;
    }

    result.textContent = `Your predicted adult height is approximately ${height.toFixed(1)} ${unit === 'cm' ? 'cm' : 'inches'}.`;
  });
});
