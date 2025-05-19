
function convertAll() {
  const input = document.getElementById('inputValue').value.trim();
  const resultDiv = document.getElementById('result');
  let percent = "", decimal = "", fraction = "";

  function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  }

  function toFraction(x) {
    if (Number.isInteger(x)) return x + "/1";
    let len = x.toString().split(".")[1]?.length || 0;
    let denominator = Math.pow(10, len);
    let numerator = Math.round(x * denominator);
    let common = gcd(numerator, denominator);
    return (numerator / common) + "/" + (denominator / common);
  }

  try {
    let value = input;
    if (value.endsWith("%")) {
      let p = parseFloat(value.slice(0, -1));
      decimal = (p / 100).toFixed(4);
      percent = p.toFixed(2) + "%";
      fraction = toFraction(p / 100);
    } else if (value.includes("/")) {
      let parts = value.split("/");
      if (parts.length === 2) {
        let num = parseFloat(parts[0]), den = parseFloat(parts[1]);
        let dec = num / den;
        decimal = dec.toFixed(4);
        percent = (dec * 100).toFixed(2) + "%";
        fraction = toFraction(dec);
      } else throw "Invalid fraction format.";
    } else {
      let d = parseFloat(value);
      if (isNaN(d)) throw "Invalid number.";
      decimal = d.toFixed(4);
      percent = (d * 100).toFixed(2) + "%";
      fraction = toFraction(d);
    }

    resultDiv.innerText =
      "Decimal: " + decimal +
      "\nPercent: " + percent +
      "\nFraction: " + fraction;
  } catch (e) {
    resultDiv.innerText = "Error: " + e;
  }
}
