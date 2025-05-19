document.getElementById('heightForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const age = parseFloat(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const childHeight = parseFloat(document.getElementById('childHeight').value);
  const childWeight = parseFloat(document.getElementById('childWeight').value);
  const motherHeight = parseFloat(document.getElementById('motherHeight').value);
  const fatherHeight = parseFloat(document.getElementById('fatherHeight').value);

  let predictedHeight;

  if (gender === 'male') {
    predictedHeight = ((motherHeight * 13 / 12) + fatherHeight) / 2;
  } else {
    predictedHeight = ((fatherHeight * 12 / 13) + motherHeight) / 2;
  }

  predictedHeight = predictedHeight.toFixed(1);

  document.getElementById('result').innerText =
    `Predicted Adult Height: ${predictedHeight} cm`;
});
