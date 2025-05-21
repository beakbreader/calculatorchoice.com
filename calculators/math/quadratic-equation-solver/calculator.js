function solveQuadratic() {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);
  const resultDiv = document.getElementById('result');

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    resultDiv.textContent = 'Please enter valid numbers for a, b, and c.';
    return;
  }

  if (a === 0) {
    resultDiv.textContent = 'This is not a quadratic equation (a cannot be zero).';
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
