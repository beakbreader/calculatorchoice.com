// Height Calculator Logic

const unitSelector = document.getElementById('unit');
const heightInput = document.getElementById('heightInput');
const resultDiv = document.getElementById('result');

function convertHeight() {
  const unit = unitSelector.value;
  const value = parseFloat(heightInput.value);

  if (isNaN(value) || value < 0) {
    resultDiv.textContent = 'Please enter a valid positive number';
    return;
  }

  let converted, unitLabel;

  if (unit === 'inches') {
    converted = (value * 2.54).toFixed(2);
    unitLabel = 'centimeters';
  } else {
    converted = (value / 2.54).toFixed(2);
    unitLabel = 'inches';
  }

  resultDiv.textContent = `${converted} ${unitLabel}`;
}

unitSelector.addEventListener('change', convertHeight);
heightInput.addEventListener('input', convertHeight);

document.addEventListener('DOMContentLoaded', convertHeight);
