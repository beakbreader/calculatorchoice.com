const periodicTable = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.01, N: 14.01,
  O: 16.00, F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982,
  Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078
};

const nameToFormula = {
  water: "H2O",
  ammonia: "NH3",
  carbonDioxide: "CO2",
  methane: "CH4",
  glucose: "C6H12O6",
  sodiumChloride: "NaCl"
};

function parseFormula(formula) {
  let elements = formula.match(/([A-Z][a-z]*)(\d*)/g);
  let parsed = {};
  elements.forEach(item => {
    let [, el, num] = item.match(/([A-Z][a-z]*)(\d*)/);
    num = parseInt(num || "1");
    if (!periodicTable[el]) return;
    parsed[el] = (parsed[el] || 0) + num;
  });
  return parsed;
}

function getMolarMass(parsedFormula) {
  let mass = 0;
  for (let el in parsedFormula) {
    mass += periodicTable[el] * parsedFormula[el];
  }
  return mass;
}

function convert() {
  let input = document.getElementById("inputFormula").value.trim().toLowerCase();
  let amount = parseFloat(document.getElementById("inputValue").value);
  let type = document.getElementById("inputType").value;
  let outputDiv = document.getElementById("output");

  if (nameToFormula[input]) input = nameToFormula[input];
  input = input.replace(/\s+/g, '');

  let parsed = parseFormula(input);
  if (Object.keys(parsed).length === 0) {
    outputDiv.innerHTML = "<p>Invalid chemical formula or name.</p>";
    return;
  }

  let molarMass = getMolarMass(parsed);
  let result = '';

  if (type === "grams") {
    let moles = amount / molarMass;
    result += `<p>Moles of ${input}: ${moles.toFixed(4)} mol</p>`;
  } else {
    let grams = amount * molarMass;
    result += `<p>Mass of ${input}: ${grams.toFixed(4)} g</p>`;
  }

  result += `<p>Molar mass of ${input}: ${molarMass.toFixed(3)} g/mol</p>`;
  outputDiv.innerHTML = result;
}
