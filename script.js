/**
 * Valentine Proposal – Script
 * ============================
 * ▸ "No" button shrinks + text changes each click
 * ▸ "Yes" button grows each time "No" is pressed
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

// ── "No" handler ──
function onNoClick() {
    noCount++;
    const noBtn  = document.getElementById("no-btn");
    const yesBtn = document.getElementById("yes-btn");

    // Update No button text
    const idx = Math.min(noCount, noTexts.length - 1);
    noBtn.textContent = noTexts[idx];

    // Shrink No button
    const noScale  = Math.max(0.45, 1 - noCount * 0.07);
    noBtn.style.transform = `scale(${noScale})`;

    // Grow Yes button so it gets irresistible
    const yesScale = 1 + noCount * 0.15;
    const capScale = Math.min(yesScale, 2.4);
    yesBtn.style.transform = `scale(${capScale})`;
    yesBtn.style.boxShadow = `0 ${6 + noCount * 2}px ${22 + noCount * 4}px rgba(233,30,99,${Math.min(0.35 + noCount * 0.04, 0.7)})`;

    // After a few clicks, add a pleading text
    if (noCount >= 4) {
        document.getElementById("main-text").textContent = "Please? 🥺💕";
    }
    if (noCount >= 8) {
        document.getElementById("main-text").textContent = "I won't stop asking 😤💕";
    }
    if (noCount >= 12) {
        document.getElementById("main-text").textContent = "Just say YES already! 😭💖";
    }
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
