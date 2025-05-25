document.addEventListener('DOMContentLoaded', () => {
  const fatherHeight = document.getElementById('fatherHeight');
  const motherHeight = document.getElementById('motherHeight');
  const unit = document.getElementById('unit');
  const gender = document.getElementById('gender');
  const result = document.getElementById('result');

  const calculateHeight = () => {
    let father = parseFloat(fatherHeight.value);
    let mother = parseFloat(motherHeight.value);
    const selectedUnit = unit.value;
    const selectedGender = gender.value;

    if (isNaN(father) || isNaN(mother)) {
      result.textContent = '-';
      return;
    }

    if (selectedUnit === 'in') {
      father *= 2.54;
      mother *= 2.54;
    }

    let heightCm;
    if (selectedGender === 'male') {
      heightCm = (father + mother + 13) / 2;
    } else {
      heightCm = (father + mother - 13) / 2;
    }

    const heightIn = heightCm / 2.54;
    result.textContent = `${heightCm.toFixed(1)} cm (${heightIn.toFixed(1)} in)`;
  };

  [fatherHeight, motherHeight, unit, gender].forEach(input => {
    input.addEventListener('input', calculateHeight);
  });
});