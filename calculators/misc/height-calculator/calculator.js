const feetInput = document.getElementById("feet");
const inchesInput = document.getElementById("inches");
const centimetersInput = document.getElementById("centimeters");
const metersInput = document.getElementById("meters");

function round(val) {
  return Math.round(val * 100) / 100;
}

function updateFromFeetInches() {
  const ft = parseFloat(feetInput.value) || 0;
  const inch = parseFloat(inchesInput.value) || 0;
  const totalInches = ft * 12 + inch;
  const cm = totalInches * 2.54;
  centimetersInput.value = round(cm);
  metersInput.value = round(cm / 100);
}

function updateFromCentimeters() {
  const cm = parseFloat(centimetersInput.value) || 0;
  const totalInches = cm / 2.54;
  const ft = Math.floor(totalInches / 12);
  const inch = totalInches % 12;
  feetInput.value = ft;
  inchesInput.value = round(inch);
  metersInput.value = round(cm / 100);
}

function updateFromMeters() {
  const m = parseFloat(metersInput.value) || 0;
  const cm = m * 100;
  centimetersInput.value = round(cm);
  updateFromCentimeters();
}

feetInput.addEventListener("input", updateFromFeetInches);
inchesInput.addEventListener("input", updateFromFeetInches);
centimetersInput.addEventListener("input", updateFromCentimeters);
metersInput.addEventListener("input", updateFromMeters);

// Insert related calculators
const related = [
  { href: "/bmi-calculator", text: "BMI Calculator" },
  { href: "/ideal-weight-calculator", text: "Ideal Weight Calculator" },
  { href: "/growth-percentile-calculator", text: "Growth Percentile Calculator" }
];

const relatedLinks = document.getElementById("related-links");
related.forEach(link => {
  const a = document.createElement("a");
  a.href = link.href;
  a.textContent = link.text;
  relatedLinks.appendChild(a);
});
