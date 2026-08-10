"""Generate Design C calculator pages from calculators.json.

Design decisions baked in:
- Live results. Every input fires a recalculation; there's no submit button.
  A stale "Calculate" button next to a number that already updated is noise.
- Hybrid inputs. A calculator gets a slider only when the spec gives it
  min/max/step AND the value is one people meaningfully ballpark (money,
  years, rate). Precise scientific inputs (6.022e23) stay as number boxes —
  a slider there is worse than useless.
- Content weight. Each page carries formula, explanation, worked example
  and FAQ blocks. These are what Google ranks; the calculator alone is thin.

Per-calculator JSON fields:
  title, id, compute            required
  inputs[]: name, label, type   required
  inputs[]: unit, default, min, max, step, hint   optional (min+max => slider)
  unit          string appended to the result, e.g. "m/s"
  decimals      rounding (default 4)
  result_label  heading above the result (default "Result")
  formula       shown as a mono chip
  about         one or two paragraphs of explanation
  example       worked example paragraph
  faq           list of {q, a}

Usage:
  python generate_calculators.py             # create missing pages only
  python generate_calculators.py --overwrite # regenerate everything
"""

import json
import os
import sys

SPEC_FILE = 'calculators.json'
SITE = 'https://calculatorchoice.com'
PUB = 'ca-pub-5423374274818618'
OVERWRITE = '--overwrite' in sys.argv

ICONS = {
    'financial': '💰', 'math': '➗', 'fitness': '🏃', 'education': '🎓',
    'chemistry': '🧪', 'parenting': '👶', 'physics': '🚀', 'astronomy': '🪐',
    'electronics': '⚡', 'engineering': '🔧', 'health': '💧', 'misc': '📐',
}


def esc(s):
    return (str(s).replace('&', '&amp;').replace('<', '&lt;')
            .replace('>', '&gt;').replace('"', '&quot;'))


def field_html(i):
    unit = f"<span class='unit'>{esc(i['unit'])}</span>" if i.get('unit') else ''
    default = i.get('default', '')
    slider = ''
    if i.get('min') is not None and i.get('max') is not None:
        slider = (f"\n        <input type='range' id='{i['name']}-range' "
                  f"min='{i['min']}' max='{i['max']}' step='{i.get('step', 1)}' "
                  f"value='{default}' aria-label='{esc(i['label'])} slider'>")
    hint = f"\n        <span class='hint'>{esc(i['hint'])}</span>" if i.get('hint') else ''
    return f"""      <div class="field">
        <div class="row"><label for="{i['name']}">{esc(i['label'])}</label>{unit}</div>
        <input type="number" id="{i['name']}" value="{default}" step="any" inputmode="decimal">{slider}{hint}
      </div>"""


def about_html(calc):
    parts = []
    if calc.get('formula'):
        parts.append(f"      <span class='formula'>{esc(calc['formula'])}</span>")
    if calc.get('about'):
        parts.append(f"      <p>{esc(calc['about'])}</p>")
    if calc.get('example'):
        parts.append("      <h2>Worked example</h2>")
        parts.append(f"      <p>{esc(calc['example'])}</p>")
    if not parts:
        return ''
    body = '\n'.join(parts)
    return f"\n    <div class='calc-about'>\n      <h2>How it works</h2>\n{body}\n    </div>"


def faq_html(calc):
    faqs = calc.get('faq') or []
    if not faqs:
        return ''
    items = '\n'.join(
        f"      <details><summary>{esc(f['q'])}</summary><p>{esc(f['a'])}</p></details>"
        for f in faqs
    )
    return f"\n    <div class='faq'>\n      <h2 style='font-size:1.05rem;margin:1.6rem 0 .3rem'>Common questions</h2>\n{items}\n    </div>"


def faq_schema(calc):
    """FAQPage structured data — earns rich results in Google."""
    faqs = calc.get('faq') or []
    if not faqs:
        return ''
    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": f['q'],
             "acceptedAnswer": {"@type": "Answer", "text": f['a']}}
            for f in faqs
        ]
    }
    return f'\n  <script type="application/ld+json">{json.dumps(data)}</script>'


def page_html(cat, calc, siblings):
    title = calc['title']
    slug = cat['slug']
    canonical = f"{SITE}/calculators/{slug}/{calc['id']}/"
    inputs_words = ', '.join(i['label'].split('(')[0].strip().lower() for i in calc['inputs'])
    desc = calc.get('description',
                    f"Free {title.lower()} — enter {inputs_words} and see the answer update instantly.")

    fields = '\n'.join(field_html(i) for i in calc['inputs'])
    related = '\n'.join(
        f"      <li><a href='../{s['id']}/'>{esc(s['title'])}</a></li>"
        for s in siblings if s['id'] != calc['id']
    )
    related_block = (
        f"""<aside class="related">
    <h2>More {cat['title'].lower()} calculators</h2>
    <ul>
{related}
    </ul>
  </aside>""" if related else ''
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={PUB}" crossorigin="anonymous"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{esc(desc)}">
  <meta name="theme-color" content="#0F1220">
  <title>{esc(title)} – Calculator Choice</title>
  <link rel="canonical" href="{canonical}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Nunito+Sans:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../../style.css">
  <script defer src="calculator.js"></script>{faq_schema(calc)}
</head>
<body>

<header class="header">
  <a class="logo" href="/">calculator<b>choice</b></a>
  <nav aria-label="Site"><ul><li><a href="/">All calculators</a></li></ul></nav>
</header>

<p class="breadcrumb"><a href="/">Home</a> · <a href="/#{slug}">{esc(cat['title'])}</a> · {esc(title)}</p>

<main class="calc-panel">
  <h1>{ICONS.get(slug, '')} {esc(title)}</h1>
  <p class="sub">{esc(calc.get('sub', 'Change any value — the answer updates as you type.'))}</p>

  <div id="fields">
{fields}
  </div>

  <div class="result">
    <div class="lbl">{esc(calc.get('result_label', 'Result'))}</div>
    <div class="value" id="result" aria-live="polite">–</div>
    <div class="note" id="note"></div>
  </div>
{about_html(calc)}{faq_html(calc)}
</main>

{related_block}

<footer class="footer">
  <p><a href="/privacy/">Privacy</a><span class="sep">·</span><a href="/terms/">Terms</a><span class="sep">·</span><a href="/contact/">Contact</a></p>
  <p>Calculator Choice © 2026</p>
</footer>

</body>
</html>
"""


def page_js(calc):
    names = [i['name'] for i in calc['inputs']]
    reads = '\n'.join(f"    const {n} = val('{n}');" for n in names)
    decimals = calc.get('decimals', 4)
    unit = calc.get('unit', '')
    unit_js = f" + ' {unit}'" if unit else ''
    sliders = [i['name'] for i in calc['inputs']
               if i.get('min') is not None and i.get('max') is not None]
    sync = '\n'.join(f"  link('{n}');" for n in sliders)

    return f"""// Live calculator — recomputes on every keystroke and slider drag.
(function () {{
  const ids = {json.dumps(names)};
  const out = document.getElementById('result');
  const note = document.getElementById('note');

  const val = id => parseFloat(document.getElementById(id).value);

  function fmt(n) {{
    if (Math.abs(n) !== 0 && (Math.abs(n) < 1e-4 || Math.abs(n) >= 1e9)) {{
      return n.toExponential(4);
    }}
    return Number(n.toFixed({decimals})).toLocaleString();
  }}

  function show(text, isError) {{
    out.textContent = text;
    out.classList.toggle('error', !!isError);
  }}

  function calc() {{
    const blank = ids.filter(id => document.getElementById(id).value.trim() === '');
    if (blank.length) {{
      show('–', false);
      note.textContent = 'Fill in every field to see the answer.';
      return;
    }}
{reads}
    const bad = ids.filter(id => !isFinite(val(id)));
    ids.forEach(id => document.getElementById(id).classList.toggle('invalid', !isFinite(val(id))));
    if (bad.length) {{
      show('Check those numbers', true);
      note.textContent = '';
      return;
    }}

    const result = {calc['compute']};
    if (!isFinite(result)) {{
      show('No valid answer for those values', true);
      note.textContent = 'Try a different combination — something is dividing by zero or out of range.';
      return;
    }}
    show(fmt(result){unit_js}, false);
    note.textContent = '';
  }}

  // Keep a number box and its slider in sync, both ways.
  function link(id) {{
    const box = document.getElementById(id);
    const range = document.getElementById(id + '-range');
    if (!range) return;
    range.addEventListener('input', () => {{ box.value = range.value; calc(); }});
    box.addEventListener('input', () => {{
      const v = parseFloat(box.value);
      if (isFinite(v) && v >= +range.min && v <= +range.max) range.value = v;
    }});
  }}

  ids.forEach(id => document.getElementById(id).addEventListener('input', calc));
{sync}
  calc();
}})();
"""


def write(path, content):
    exists = os.path.exists(path)
    if exists and not OVERWRITE:
        return 'skipped'
    with open(path, 'w') as f:
        f.write(content)
    return 'rewrote' if exists else 'created'


def main():
    with open(SPEC_FILE) as f:
        data = json.load(f)
    for cat in data.get('categories', []):
        calcs = cat.get('calculators', [])
        for calc in calcs:
            d = os.path.join('calculators', cat['slug'], calc['id'])
            os.makedirs(d, exist_ok=True)
            a = write(os.path.join(d, 'index.html'), page_html(cat, calc, calcs))
            b = write(os.path.join(d, 'calculator.js'), page_js(calc))
            print(f"{d}: html {a}, js {b}")


if __name__ == '__main__':
    main()
