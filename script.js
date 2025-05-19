// — Typing Effect for Header — 
const headerText = "Happy Mother's Day!";
const headerEl   = document.getElementById('headerText');
let i = 0;
function type() {
  if (i < headerText.length) {
    headerEl.textContent += headerText.charAt(i++);
    setTimeout(type, 100);
  }
}
type();

// — Heart‑triggered Quotes — 
const quotes = [
  "A mother's love is endless and unconditional.",
  "A mother can take the place of all others, but no one else can take hers.",
  "Life doesn't come with a manual, it comes with a mother.",
  "Motherhood is the greatest thing—and the hardest thing.",
  "A mother’s hug lasts long after she lets go."
];
const hearts   = document.querySelectorAll('.heart');
const quoteBox = document.getElementById('quoteBox');
const quoteTxt = document.getElementById('quoteText');

hearts.forEach(h => {
  h.addEventListener('click', e => {
    const idx = +e.currentTarget.dataset.idx;
    quoteTxt.textContent = quotes[idx];
    quoteBox.style.display = 'block';
  });
});

// Hide quote when clicking outside
document.addEventListener('click', e => {
  if (!quoteBox.contains(e.target) && ![...hearts].includes(e.target)) {
    quoteBox.style.display = 'none';
  }
});

// — Scroll‑Reveal for Gallery Images — 
const galleryImgs = document.querySelectorAll('.gallery-img');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

galleryImgs.forEach(img => observer.observe(img));
