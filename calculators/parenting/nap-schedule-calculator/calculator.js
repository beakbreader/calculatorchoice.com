
function calcNaps() {
  const age = parseInt(document.getElementById('age').value);
  let schedule = "";
  if (age <= 3) schedule = "3-4 naps per day";
  else if (age <= 6) schedule = "3 naps per day";
  else if (age <= 12) schedule = "2 naps per day";
  else schedule = "1 nap per day";
  document.getElementById('result').innerText = "Suggested nap schedule: " + schedule;
}
