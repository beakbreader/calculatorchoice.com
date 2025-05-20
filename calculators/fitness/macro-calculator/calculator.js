document.getElementById('macroForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const age = +document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const height = +document.getElementById('height').value;
  const weight = +document.getElementById('weight').value;
  const activity = +document.getElementById('activity').value;
  const goal = document.getElementById('goal').value;

  // BMR calculation
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // TDEE
  let tdee = bmr * activity;

  // Adjust TDEE based on goal
  if (goal === 'lose') tdee -= 500;
  if (goal === 'gain') tdee += 300;

  // Macro ratios: protein 30%, carbs 40%, fat 30%
  const proteinCals = tdee * 0.3;
  const carbsCals = tdee * 0.4;
  const fatCals = tdee * 0.3;

  const proteinGrams = proteinCals / 4;
  const carbsGrams = carbsCals / 4;
  const fatGrams = fatCals / 9;

  const results = `
    <h2>Daily Macros</h2>
    <p><strong>Calories:</strong> ${Math.round(tdee)} kcal</p>
    <p><strong>Protein:</strong> ${Math.round(proteinGrams)}g</p>
    <p><strong>Carbs:</strong> ${Math.round(carbsGrams)}g</p>
    <p><strong>Fat:</strong> ${Math.round(fatGrams)}g</p>
  `;

  document.getElementById('results').innerHTML = results;
});
