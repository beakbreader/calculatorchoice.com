function parseAndSolve() {
  const equation = document.getElementById('equation').value.toLowerCase().replace(/\s+/g, '');
  const resultDiv = document.getElementById('result');

  const match = equation.match(/([+-]?\d*\.?\d*)x\^2([+-]\d*\.?\d*)x([+-]\d*\.?\d*)/);
  if (!match) {
    resultDiv.textContent = 'Please enter a valid quadratic expression (e.g., 2x^2+3x-5).';
    return;
  }

  let [_, a, b, c] = match;
  a = a === '' || a === '+' ? 1 : a === '-' ? -1 : parseFloat(a);
  b = b === '' || b === '+' ? 1 : b === '-' ? -1 : parseFloat(b);
  c = parseFloat(c);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    resultDiv.textContent = 'Error parsing coefficients. Please try again.';
    return;
  }

  const discriminant = b * b - 4 * a * c;
  const twoA = 2 * a;

  let resultText = `Discriminant: ${discriminant}\n`;

  if (discriminant > 0) {
    const root1 = (-b + Math.sqrt(discriminant)) / twoA;
    const root2 = (-b - Math.sqrt(discriminant)) / twoA;
    resultText += `Two Real Roots: x₁ = ${root1.toFixed(4)}, x₂ = ${root2.toFixed(4)}`;
  } else if (discriminant === 0) {
    const root = -b / twoA;
    resultText += `One Real Root: x = ${root.toFixed(4)}`;
  } else {
    const realPart = (-b / twoA).toFixed(4);
    const imaginaryPart = (Math.sqrt(-discriminant) / twoA).toFixed(4);
    resultText += `Two Complex Roots: x₁ = ${realPart} + ${imaginaryPart}i, x₂ = ${realPart} - ${imaginaryPart}i`;
  }

  resultDiv.textContent = resultText;
}

const calculators = [
  { name: "Quadratic Equation Solver", url: "/calculators/quadratic-equation-solver/" },
  { name: "Linear Equation Solver", url: "/calculators/linear-equation-solver/" },
  { name: "Cubic Equation Solver", url: "/calculators/cubic-equation-solver/" },
  { name: "Percentage Calculator", url: "/calculators/percentage-calculator/" },
  { name: "Compound Interest Calculator", url: "/calculators/compound-interest-calculator/" }
];

function filterCalculators() {
  const input = document.getElementById('searchBar').value.toLowerCase();
  const resultList = document.getElementById('searchResults');
  resultList.innerHTML = '';

  if (!input) return;

  calculators.forEach(calc => {
    if (calc.name.toLowerCase().includes(input)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = calc.url;
      a.textContent = calc.name;
      li.appendChild(a);
      resultList.appendChild(li);
    }
  });
}