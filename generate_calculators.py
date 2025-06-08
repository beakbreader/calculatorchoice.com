import json
import os

SPEC_FILE = 'calculators.json'

with open(SPEC_FILE) as f:
    data = json.load(f)

for category in data.get('categories', []):
    cat_dir = os.path.join('calculators', category['slug'])
    os.makedirs(cat_dir, exist_ok=True)
    for calc in category.get('calculators', []):
        calc_dir = os.path.join(cat_dir, calc['id'])
        os.makedirs(calc_dir, exist_ok=True)

        html_path = os.path.join(calc_dir, 'index.html')
        if not os.path.exists(html_path):
            with open(html_path, 'w') as f:
                f.write(f"""<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>{calc['title']}</title>
  <link rel='stylesheet' href='../../style.css'>
  <script defer src='calculator.js'></script>
</head>
<body>
  <h1>{calc['title']}</h1>
  <form id='calc-form'>
""")
                for inp in calc['inputs']:
                    f.write(f"    <label>{inp['label']}: <input type='{inp['type']}' id='{inp['name']}' name='{inp['name']}' required></label><br>\n")
                f.write("    <button type='submit'>Calculate</button>\n  </form>\n  <div id='result'></div>\n</body>\n</html>")

        js_path = os.path.join(calc_dir, 'calculator.js')
        if not os.path.exists(js_path):
            with open(js_path, 'w') as f:
                f.write("document.getElementById('calc-form').addEventListener('submit', function(e) {\n")
                f.write("  e.preventDefault();\n")
                for inp in calc['inputs']:
                    f.write(f"  const {inp['name']} = parseFloat(document.getElementById('{inp['name']}').value);\n")
                f.write(f"  const result = {calc['compute']};\n")
                f.write("  document.getElementById('result').textContent = result;\n")
                f.write("});\n")

        css_path = os.path.join(calc_dir, 'style.css')
        if not os.path.exists(css_path):
            with open(css_path, 'w') as f:
                f.write("/* Uses global styles */\n")
