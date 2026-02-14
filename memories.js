/**
 * Memories – Photo Guessing Game Logic
 * =====================================
 * ▸ Reveal button shows answer with animation
 * ▸ Scroll-triggered card animations
 * ▸ Hero floating hearts
 */

// ── Reveal answer ──
function reveal(btn) {
    const card = btn.closest('.card-inner');
    const content = card.querySelector('.reveal-content');

    // Hide button
    btn.classList.add('clicked');

    // Show reveal content
    setTimeout(() => {
        content.classList.add('show');
    }, 200);

    // Little confetti pop on the card
    spawnMiniHearts(card);
}

// ── Mini hearts burst on reveal ──
function spawnMiniHearts(container) {
    const emojis = ['💖', '💕', '✨', '🩷', '💗'];
    for (let i = 0; i < 8; i++) {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.cssText = `
            position: absolute;
            font-size: ${0.8 + Math.random() * 0.8}rem;
            top: ${20 + Math.random() * 40}%;
            left: ${10 + Math.random() * 80}%;
            pointer-events: none;
            z-index: 50;
            animation: miniPop ${0.6 + Math.random() * 0.5}s ease-out forwards;
            animation-delay: ${Math.random() * 0.2}s;
        `;
        container.appendChild(span);
        setTimeout(() => span.remove(), 1500);
    }
}

// Inject the miniPop keyframe once
(function injectKeyframe() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes miniPop {
            0%   { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-60px) scale(0.3) rotate(20deg); }
        }
    `;
    document.head.appendChild(style);
})();

// ── Scroll-reveal for cards ──
(function initScrollReveal() {
    const cards = document.querySelectorAll('.memory-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach(card => observer.observe(card));
})();

// ── Hero floating hearts ──
(function spawnHeroHearts() {
    const container = document.querySelector('.hero-hearts');
    if (!container) return;

    const emojis = ['💕', '💗', '💖', '💘', '❤️', '🩷', '✨'];
    const count = 14;

    for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.classList.add('hero-float');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = Math.random() * 100 + '%';
        span.style.bottom = '-30px';
        span.style.animationDuration = (7 + Math.random() * 7) + 's';
        span.style.animationDelay = (Math.random() * 10) + 's';
        span.style.fontSize = (1 + Math.random() * 1.4) + 'rem';
        container.appendChild(span);
    }
})();
