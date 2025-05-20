// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  const loanForm = document.getElementById('loan-form');
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  loanForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Retrieve input values
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);


::contentReference[oaicite:0]{index=0}
 
