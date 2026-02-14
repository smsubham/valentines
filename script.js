/**
 * Valentine Proposal – Script
 * ============================
 * ▸ "No" button dodges away on hover
 * ▸ "Yes" button grows each time "No" is hovered
 * ▸ Clicking "Yes" shows celebration with confetti
 */

// ── State ──
let noCount = 0;

const noTexts = [
    "No",             // 0 - initial
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you positive?",
    "So cold! ❄️",
    "Have a heart! 💔",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that final?",
    "Pretty please? 🥺",
    "You're breaking my heart 💔",
];

// ── Set up "No" button dodge on hover ──
document.addEventListener("DOMContentLoaded", () => {
    const noBtn  = document.getElementById("no-btn");
    const yesBtn = document.getElementById("yes-btn");

    noBtn.addEventListener("mouseenter", handleNoDodge);

    // Also handle touch for mobile
    noBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleNoDodge();
    });
});

function handleNoDodge() {
    noCount++;
    const noBtn  = document.getElementById("no-btn");
    const yesBtn = document.getElementById("yes-btn");
    const card   = document.querySelector(".card");

    // Update No button text
    const idx = Math.min(noCount, noTexts.length - 1);
    noBtn.textContent = noTexts[idx];

    // Move No button to a random position within the card
    const cardRect = card.getBoundingClientRect();
    const btnRect  = noBtn.getBoundingClientRect();

    // Calculate safe bounds (keep button inside the card with padding)
    const padding = 20;
    const maxX = cardRect.width - btnRect.width - padding * 2;
    const maxY = cardRect.height - btnRect.height - padding * 2;

    const randX = Math.random() * maxX + padding;
    const randY = Math.random() * maxY + padding;

    // Switch to absolute positioning inside card
    noBtn.classList.add("dodging");
    noBtn.style.left = randX + "px";
    noBtn.style.top  = randY + "px";

    // Grow Yes button so it gets irresistible
    const yesScale = 1 + noCount * 0.12;
    const capScale = Math.min(yesScale, 2.2);
    yesBtn.style.transform = `scale(${capScale})`;
    yesBtn.style.boxShadow = `0 ${6 + noCount * 2}px ${22 + noCount * 4}px rgba(233,30,99,${Math.min(0.35 + noCount * 0.04, 0.7)})`;

    // After a few hovers, add a pleading text
    if (noCount >= 3) {
        document.getElementById("main-text").textContent = "Please? 🥺💕";
    }
    if (noCount >= 6) {
        document.getElementById("main-text").textContent = "I won't stop asking 😤💕";
    }
    if (noCount >= 10) {
        document.getElementById("main-text").textContent = "Just say YES already! 😭💖";
    }
}

// ── "No" click does nothing now (dodge handles it) ──
function onNoClick() {
    // No-op: the dodge on hover handles everything
}

// ── "Yes" handler ──
function onYesClick() {
    document.getElementById("ask-section").style.display = "none";
    document.getElementById("yes-section").style.display = "flex";
    fireConfetti();
}

// ── Confetti celebration ──
function fireConfetti() {
    const colors = ["#ff6b9d", "#e91e63", "#ff9a9e", "#fecfef", "#f8bbd0", "#ffffff"];

    // Big initial burst
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });

    // Side cannons for 4 seconds
    const end = Date.now() + 4000;
    const frame = () => {
        if (Date.now() > end) return;
        confetti({ particleCount: 3, angle: 60,  spread: 50, origin: { x: 0 }, colors });
        confetti({ particleCount: 3, angle: 120, spread: 50, origin: { x: 1 }, colors });
        requestAnimationFrame(frame);
    };
    frame();

    // Extra pops
    setTimeout(() => confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors }), 600);
    setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.45 }, colors }), 1400);
}

// ── Floating hearts generator ──
(function spawnHearts() {
    const container = document.querySelector(".hearts-bg");
    const emojis = ["💕", "💗", "💖", "💘", "❤️", "🩷"];
    const count = 12;

    for (let i = 0; i < count; i++) {
        const span = document.createElement("span");
        span.classList.add("floating-heart");
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = Math.random() * 100 + "%";
        span.style.animationDuration = (6 + Math.random() * 6) + "s";
        span.style.animationDelay = (Math.random() * 8) + "s";
        span.style.fontSize = (1 + Math.random() * 1.2) + "rem";
        container.appendChild(span);
    }
})();
