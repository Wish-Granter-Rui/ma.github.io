// — Typing Effect —
function typeText(el, text, speed = 100, cb) {
  let i = 0;
  const iv = setInterval(() => {
    el.textContent += text.charAt(i++);
    if (i > text.length) {
      clearInterval(iv);
      if (cb) cb();
    }
  }, speed);
}

document.addEventListener('DOMContentLoaded', () => {
  // —— Audio setup ——
  const bgMusic = document.getElementById('bgMusic');

  // Start muted, but attempt to play immediately
  bgMusic.play().catch(() => {
    /* ignore autoplay rejection */
  });

  // On the first user gesture, unmute AND play (explicit)
  function enableSound() {
    bgMusic.muted = false;
    bgMusic.play().catch(console.error);
    // Remove all gesture listeners after first run
    ['click','scroll','keydown','touchstart'].forEach(evt =>
      document.removeEventListener(evt, enableSound)
    );
  }
  ['click','scroll','keydown','touchstart'].forEach(evt =>
    document.addEventListener(evt, enableSound, { once: true })
  );

  // —— Typing headers ——
  const headerEl = document.getElementById('headerText');
  typeText(headerEl, "Happy Mother's Day!", 100, () => {
    const galTitle = document.getElementById('galleryTitle');
    typeText(galTitle, "Special Moments with My Mom", 80);
  });

  // —— Build & shuffle images ——
  const imgSources = Array.from({ length: 24 }, (_, i) => `img/${i+1}.jpg`);
  // Fisher–Yates shuffle
  for (let i = imgSources.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imgSources[i], imgSources[j]] = [imgSources[j], imgSources[i]];
  }

  const grid = document.getElementById('galleryGrid');
  imgSources.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'gallery-img';
    img.onerror = () => img.remove();
    // Random tilt ±8°
    const angle = (Math.random() * 16) - 8;
    img.style.transform = `rotate(${angle}deg)`;
    grid.appendChild(img);
  });

  // —— Scroll‑reveal gallery ——
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.gallery-img').forEach(img => observer.observe(img));

  // —— Hearts & quotes ——
  const quotes = [
    "A mother's love is endless and unconditional.",
    "A mother can take the place of all others—but none can take hers.",
    "Life doesn't come with a manual; it comes with a mother.",
    "Motherhood: the greatest—and hardest—thing.",
    "A mother’s hug lasts long after she lets go."
  ];
  const hearts = document.querySelectorAll('.heart');
  const quoteBox = document.getElementById('quoteBox');
  const quoteText = document.getElementById('quoteText');

  hearts.forEach(h => {
    h.addEventListener('click', () => {
      const idx = +h.dataset.idx;
      quoteText.textContent = quotes[idx];
      quoteBox.style.display = 'block';
    });
  });
  document.addEventListener('click', e => {
    if (!quoteBox.contains(e.target) && ![...hearts].includes(e.target)) {
      quoteBox.style.display = 'none';
    }
  });

  // —— Sprinkled emojis ——
  const emojiChars = ['😊','🌸','✨','💖','🍰','🎀','🌷','💐'];
  const emojiContainer = document.getElementById('emoji-container');
  for (let i = 0; i < 15; i++) {
    const span = document.createElement('span');
    span.className = 'emoji';
    span.textContent = emojiChars[Math.floor(Math.random() * emojiChars.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.top  = `${Math.random() * 100}%`;
    span.style.fontSize = `${Math.random() * 2 + 1}rem`;
    emojiContainer.appendChild(span);
  }
});
