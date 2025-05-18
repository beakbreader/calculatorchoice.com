const periodicTable = {
  "H": 1.008, "He": 4.0026, "Li": 6.94, "Be": 9.0122, "B": 10.81, "C": 12.011,
  "N": 14.007, "O": 15.999, "F": 18.998, "Ne": 20.18, "Na": 22.99, "Mg": 24.305,
  "Al": 26.982, "Si": 28.085, "P": 30.974, "S": 32.06, "Cl": 35.45, "Ar": 39.948,
  "K": 39.098, "Ca": 40.078, "Sc": 44.956, "Ti": 47.867, "V": 50.942, "Cr": 51.996,
  "Mn": 54.938, "Fe": 55.845, "Co": 58.933, "Ni": 58.693, "Cu": 63.546, "Zn": 65.38,
  "Ga": 69.723, "Ge": 72.63, "As": 74.922, "Se": 78.971, "Br": 79.904, "Kr": 83.798,
  "Rb": 85.468, "Sr": 87.62, "Y": 88.906, "Zr": 91.224, "Nb": 92.906, "Mo": 95.95,
  "Tc": 98.0, "Ru": 101.07, "Rh": 102.91, "Pd": 106.42, "Ag": 107.87, "Cd": 112.41,
  "In": 114.82, "Sn": 118.71, "Sb": 121.76, "Te": 127.6, "I": 126.9, "Xe": 131.29,
  "Cs": 132.91, "Ba": 137.33, "La": 138.91, "Ce": 140.12, "Pr": 140.91, "Nd": 144.24,
  "Pm": 145.0, "Sm": 150.36, "Eu": 151.96, "Gd": 157.25, "Tb": 158.93, "Dy": 162.5,
  "Ho": 164.93, "Er": 167.26, "Tm": 168.93, "Yb": 173.05, "Lu": 174.97, "Hf": 178.49,
  "Ta": 180.95, "W": 183.84, "Re": 186.21, "Os": 190.23, "Ir": 192.22, "Pt": 195.08,
  "Au": 196.97, "Hg": 200.59, "Tl": 204.38, "Pb": 207.2, "Bi": 208.98, "Po": 209.0,
  "At": 210.0, "Rn": 222.0, "Fr": 223.0, "Ra": 226.0, "Ac": 227.0, "Th": 232.04,
  "Pa": 231.04, "U": 238.03, "Np": 237.0, "Pu": 244.0, "Am": 243.0, "Cm": 247.0,
  "Bk": 247.0, "Cf": 251.0, "Es": 252.0, "Fm": 257.0, "Md": 258.0, "No": 259.0,
  "Lr": 262.0, "Rf": 267.0, "Db": 270.0, "Sg": 271.0, "Bh": 270.0, "Hs": 277.0,
  "Mt": 276.0, "Ds": 281.0, "Rg": 280.0, "Cn": 285.0, "Nh": 284.0, "Fl": 289.0,
  "Mc": 288.0, "Lv": 293.0, "Ts": 294.0, "Og": 294.0
};


const nameToFormula = {
  water: "H2O",
  hydrogenPeroxide: "H2O2",
  ammonia: "NH3",
  methane: "CH4",
  carbonDioxide: "CO2",
  carbonMonoxide: "CO",
  oxygen: "O2",
  ozone: "O3",
  nitrogen: "N2",
  hydrogen: "H2",
  chlorine: "Cl2",
  bromine: "Br2",
  sulfurDioxide: "SO2",
  sulfurTrioxide: "SO3",
  nitricAcid: "HNO3",
  nitrousAcid: "HNO2",
  hydrochloricAcid: "HCl",
  hydrofluoricAcid: "HF",
  hydrobromicAcid: "HBr",
  hydroiodicAcid: "HI",
  sulfuricAcid: "H2SO4",
  sulfurousAcid: "H2SO3",
  phosphoricAcid: "H3PO4",
  aceticAcid: "CH3COOH",
  formicAcid: "HCOOH",
  citricAcid: "C6H8O7",
  lacticAcid: "C3H6O3",
  oxalicAcid: "C2H2O4",
  calciumCarbonate: "CaCO3",
  sodiumChloride: "NaCl",
  potassiumChloride: "KCl",
  sodiumHydroxide: "NaOH",
  potassiumHydroxide: "KOH",
  calciumHydroxide: "Ca(OH)2",
  magnesiumHydroxide: "Mg(OH)2",
  aluminumHydroxide: "Al(OH)3",
  bariumHydroxide: "Ba(OH)2",
  sodiumBicarbonate: "NaHCO3",
  sodiumCarbonate: "Na2CO3",
  magnesiumSulfate: "MgSO4",
  copperSulfate: "CuSO4",
  zincSulfate: "ZnSO4",
  ironSulfate: "FeSO4",
  ironIIIChloride: "FeCl3",
  ironIIChloride: "FeCl2",
  calciumPhosphate: "Ca3(PO4)2",
  ammoniumNitrate: "NH4NO3",
  ammoniumChloride: "NH4Cl",
  ammoniumSulfate: "(NH4)2SO4",
  sodiumThiosulfate: "Na2S2O3",
  glucose: "C6H12O6",
  fructose: "C6H12O6",
  sucrose: "C12H22O11",
  lactose: "C12H22O11",
  ethanol: "C2H5OH",
  methanol: "CH3OH",
  propanol: "C3H7OH",
  butanol: "C4H9OH",
  isopropanol: "C3H8O",
  acetone: "C3H6O",
  glycerol: "C3H8O3",
  formaldehyde: "CH2O",
  acetamide: "CH3CONH2",
  urea: "CH4N2O",
  caffeine: "C8H10N4O2",
  aspirin: "C9H8O4",
  paracetamol: "C8H9NO2",
  ibuprofen: "C13H18O2",
  penicillinG: "C16H18N2O4S",
  vitaminC: "C6H8O6",
  vitaminB1: "C12H17N4OS",
  vitaminD3: "C27H44O",
  cholesterol: "C27H46O",
  testosterone: "C19H28O2",
  estrogen: "C18H24O2",
  hemoglobin: "C2952H4664N812O832S8Fe4", // approx
  DNAUnit: "C10H14N5O7P",
  RNAUnit: "C9H13N3O8P",
  sodiumHypochlorite: "NaClO",
  bleach: "NaClO",
  bakingSoda: "NaHCO3",
  lye: "NaOH",
  vinegar: "CH3COOH",
  rubbingAlcohol: "C3H8O",
  nailPolishRemover: "C3H6O",
  teflon: "(C2F4)n",
  PVC: "(C2H3Cl)n",
  nylon66: "C12H22N2O2",
  polyethylene: "(C2H4)n",
  polystyrene: "(C8H8)n",
  sulfurHexafluoride: "SF6",
  phosphine: "PH3",
  hydrazine: "N2H4",
  sodiumAzide: "NaN3",
  trinitrotoluene: "C7H5N3O6",
  nitroglycerin: "C3H5N3O9",
  gunpowder: "KNO3+S+C",
  hydrogenCyanide: "HCN",
  cyanide: "CN-",
  carbonTetrachloride: "CCl4",
  chloroform: "CHCl3",
  freon12: "CCl2F2"
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
