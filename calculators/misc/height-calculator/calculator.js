function predictHeight() {
  const mother = parseFloat(document.getElementById("motherHeight").value);
  const father = parseFloat(document.getElementById("fatherHeight").value);
  const gender = document.getElementById("gender").value;
  const age = parseInt(document.getElementById("age").value);
  const current = parseFloat(document.getElementById("currentHeight").value);

  const resultBox = document.getElementById("result");
  resultBox.textContent = "";

  if (isNaN(mother) || isNaN(father) || isNaN(age) || isNaN(current)) {
    resultBox.textContent = "Please fill in all fields with valid numbers.";
    return;
  }

  let midParental;
  if (gender === "male") {
    midParental = (father + mother + 13) / 2;
  } else {
    midParental = (father + mother - 13) / 2;
  }

  // Adjustment factor (simple linear growth multiplier based on age)
  const growthFactor = age < 10 ? 1.2 : age < 14 ? 1.1 : age < 17 ? 1.05 : 1.02;
  const predicted = (midParental + current * growthFactor) / 2;

  const finalHeight = Math.round(predicted);
  resultBox.textContent = `Your predicted adult height is approximately ${finalHeight} cm.`;
}