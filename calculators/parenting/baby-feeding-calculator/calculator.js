document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const unit = document.getElementById('unit').value;

    if (!age || isNaN(weight) || weight <= 0) {
      result.textContent = 'Please enter valid weight and age.';
      return;
    }

    let amount = 0;
    if (unit === 'kg') {
      amount = weight * 150; // ml per kg per day
      result.textContent = `Estimated daily intake: ${amount.toFixed(0)} ml`;
    } else {
      amount = weight * 2.5; // oz per lb per day
      result.textContent = `Estimated daily intake: ${amount.toFixed(1)} oz`;
    }
  });
});
