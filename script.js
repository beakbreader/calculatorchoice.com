// Calculator Choice — homepage search.
// Filters the links inside each category card. Reads straight off the DOM,
// so adding a calculator to index.html makes it searchable automatically.

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('calc-search');
  if (!input) return;

  const noResults = document.getElementById('no-results');
  const chips = document.getElementById('chips');
  const cards = Array.from(document.querySelectorAll('.cat-card'));

  const items = [];
  cards.forEach(card => {
    const category = (card.querySelector('h2')?.firstChild?.textContent || '').trim().toLowerCase();
    card.querySelectorAll('.links a').forEach(link => {
      const slug = (link.getAttribute('href') || '').toLowerCase().replace(/[\/-]+/g, ' ');
      items.push({
        el: link,
        card,
        text: `${link.textContent.toLowerCase()} ${category} ${slug}`
      });
    });
  });

  function filter() {
    const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const searching = terms.length > 0;
    let hits = 0;

    items.forEach(item => {
      const match = !searching || terms.every(t => item.text.includes(t));
      item.el.hidden = !match;
      if (match && searching) hits++;
    });

    cards.forEach(card => {
      const visible = items.some(i => i.card === card && !i.el.hidden);
      card.hidden = !visible;
    });

    if (chips) chips.hidden = searching;
    if (noResults) noResults.hidden = !searching || hits > 0;
  }

  input.addEventListener('input', filter);

  // "/" focuses search, Escape clears it.
  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) {
      e.preventDefault();
      input.focus();
      input.select();
    } else if (e.key === 'Escape' && document.activeElement === input) {
      input.value = '';
      filter();
      input.blur();
    }
  });

  // Enter opens the first match.
  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const first = items.find(i => !i.el.hidden);
    if (first) window.location.href = first.el.getAttribute('href');
  });
});
