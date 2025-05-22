function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const result = document.getElementById('result');

  if (!height || !weight || height <= 0 || weight <= 0) {
    result.textContent = 'Please enter valid height and weight.';
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  const roundedBMI = bmi.toFixed(1);

  let category = '';
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal weight';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  result.textContent = `Your BMI is ${roundedBMI} (${category}).`;
}

// Real-time search bar suggestions
const calculators = [
  { name: "BMI Calculator", link: "/calculators/bmi-calculator/" },
  { name: "BMR Calculator", link: "/calculators/bmr-calculator/" },
  { name: "Ideal Weight Calculator", link: "/calculators/ideal-weight-calculator/" },
];

const search = document.getElementById('search');
const suggestions = document.getElementById('suggestions');

search.addEventListener('input', () => {
  const query = search.value.toLowerCase();
  suggestions.innerHTML = '';

  if (query) {
    const matches = calculators.filter(c => c.name.toLowerCase().includes(query));
    matches.forEach(match => {
      const li = document.createElement('li');
      li.textContent = match.name;
      li.onclick = () => window.location.href = match.link;
      suggestions.appendChild(li);
    });
  }
});
