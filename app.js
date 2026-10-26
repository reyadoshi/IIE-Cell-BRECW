const grid = document.querySelector('#role-grid');
const count = document.querySelector('#result-count');
const input = document.querySelector('#role-search');
let filter = 'All';
const cards = CLUB_ROLES.map(([category, title, tagline, responsibilities], i) => {
  const article = document.createElement('article');
  article.className = 'role-card';
  article.dataset.category = category;
  article.dataset.search = [title, tagline, ...responsibilities].join(' ').toLowerCase();
  const top = document.createElement('div'); top.className = 'role-card-top';
  const tag = document.createElement('span'); tag.textContent = category + (category === 'Executive' ? ' committee' : category === 'Functional' ? ' team' : ' & representation');
  const number = document.createElement('span'); number.className = 'role-number'; number.textContent = String(i + 1).padStart(2, '0'); top.append(tag, number);
  const heading = document.createElement('h3'); heading.textContent = title;
  const desc = document.createElement('p'); desc.className = 'role-tagline'; desc.textContent = tagline;
  const list = document.createElement('ul'); responsibilities.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
  article.append(top, heading, desc, list); grid.append(article); return article;
});
function updateRoles() {
  const query = input.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => { card.hidden = !((filter === 'All' || card.dataset.category === filter) && card.dataset.search.includes(query)); if (!card.hidden) visible++; });
  count.textContent = `SHOWING ${visible} OF ${cards.length} POSITIONS`;
  document.querySelector('#no-results').hidden = visible !== 0;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', active); });
  updateRoles();
}));
input.addEventListener('input', updateRoles); updateRoles();
const menu = document.querySelector('.menu'); const nav = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', open); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
let previousDetails;
window.addEventListener('beforeprint', () => { previousDetails = [...document.querySelectorAll('details')].map(detail => detail.open); document.querySelectorAll('details').forEach(detail => detail.open = true); });
window.addEventListener('afterprint', () => { if (previousDetails) document.querySelectorAll('details').forEach((detail, i) => detail.open = previousDetails[i]); });
document.querySelector('#print-button').addEventListener('click', () => window.print());
