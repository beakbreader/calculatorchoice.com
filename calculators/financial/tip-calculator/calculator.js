function formatCurrency(value) {
  return '$' + value.toFixed(2);
}

function calculateTip() {
  const bill = parseFloat(document.getElementById('bill').value);
  const percentage = parseFloat(document.getElementById('percentage').value);
  const people = parseInt(document.getElementById('people').value) || 1;
  const output = document.getElementById('output');

  if (isNaN(bill) || bill <= 0) {
    output.innerText = 'Please enter a valid bill amount.';
    return;
  }
  if (isNaN(percentage) || percentage < 0) {
    output.innerText = 'Please enter a valid tip percentage.';
    return;
  }

  const tipAmount = bill * (percentage / 100);
  const total = bill + tipAmount;
  const tipPerPerson = tipAmount / people;
  const totalPerPerson = total / people;

  output.innerHTML = `
    <strong>Tip:</strong> ${formatCurrency(tipAmount)}<br>
    <strong>Total:</strong> ${formatCurrency(total)}<br>
    <strong>Tip per person:</strong> ${formatCurrency(tipPerPerson)}<br>
    <strong>Total per person:</strong> ${formatCurrency(totalPerPerson)}
  `;
}

['bill', 'percentage', 'people'].forEach(id => {
  document.getElementById(id).addEventListener('input', calculateTip);
});

window.addEventListener('DOMContentLoaded', calculateTip);
