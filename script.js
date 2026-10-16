/**
 * =========================================================================
 * SCRIPT.JS - Minimalist Romantic Experience (Pure Vanilla JavaScript)
 * 
 * Refined Micro-Interactions & Transitions:
 * 1. Warm Sine Web Audio Engine (Chimes, Clicks, Ambient Whoosh, Popping)
 * 2. Background Music Controller (Syncs with /audio/perfect-instrumental.mp3)
 * 3. Heart Rain & Sparkles Atmospheric Canvas (Deep aesthetic, smooth 60fps)
 * 4. Micro-Particle Fireworks Engine
 * 5. Fluid Screen Transition Engine (Graceful cross-fade leaving & entering)
 * 6. Tactile Button Ripples & Click feedback
 * 7. 10-Box PIN Validation (MISSLEHOOR)
 * 8. Minimalist Candle Blowing & Smoke Drift
 * 9. Wax Seal Unfolding & Staggered Reveal
 * 10. Floating Orb Popping & Birthday Notes
 * =========================================================================
 */

// --- CONFIGURATION ---
const CONFIG = {
  recipientName: "Mohtrama",
  secretCode: "MISSLEHOOR",
  balloonMessages: [
    "You are more special than you realize ❤️",
    "May every dream in your heart come true ✨",
    "Keep smiling because your smile is beautiful 🌸",
    "I hope this new year brings you endless happiness ❤️"
  ]
};

// =========================================================================
// 1. SOUND SYNTHESIS ENGINE (Warm, Gentle Harmonic Tones)
// =========================================================================
class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration = 0.25, type = 'sine', gainVal = 0.12) {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }

  playKeyClick() {
    // Elegant soft tactile click
    this.playTone(680 + Math.random() * 80, 0.06, 'sine', 0.08);
  }

  playUnlock() {
    // Warm harmonic arpeggio
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.45, 'sine', 0.14), i * 80);
    });
  }

  playError() {
    this.playTone(220, 0.15, 'sine', 0.1);
    setTimeout(() => this.playTone(180, 0.2, 'sine', 0.1), 90);
  }

  playCandleBlow() {
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 0.35);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();

      setTimeout(() => {
        this.playTone(880, 0.5, 'sine', 0.1);
      }, 80);
    } catch (e) {}
  }

  playMagicReveal() {
    const notes = [440, 523.25, 659.25, 783.99, 880, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.6, 'sine', 0.1), idx * 65);
    });
  }

  playBalloonPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.1);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);

      setTimeout(() => {
        this.playTone(987.77, 0.45, 'sine', 0.1);
      }, 50);
    } catch (e) {}
  }

  playFanfare() {
    const chords = [
      [523.25, 659.25, 783.99],
      [587.33, 739.99, 880],
      [659.25, 830.61, 987.77],
      [783.99, 987.77, 1174.66]
    ];
    chords.forEach((chord, step) => {
      setTimeout(() => {
        chord.forEach(freq => this.playTone(freq, 1.2, 'sine', 0.12));
      }, step * 250);
    });
  }
}

const sfx = new SoundEffects();

// =========================================================================
// 2. BACKGROUND MUSIC CONTROLLER
// =========================================================================
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('floating-music-btn');
const musicIconOn = document.getElementById('music-icon-on');
const musicIconOff = document.getElementById('music-icon-off');
let isMusicPlaying = false;

function toggleMusic() {
  sfx.init();
  if (!bgMusic) return;

  if (isMusicPlaying) {
    bgMusic.pause();
    isMusicPlaying = false;
    musicBtn.classList.remove('playing');
    musicIconOn.classList.add('hidden');
    musicIconOff.classList.remove('hidden');
  } else {
    bgMusic.play()
      .then(() => {
        isMusicPlaying = true;
        musicBtn.classList.add('playing');
        musicIconOn.classList.remove('hidden');
        musicIconOff.classList.add('hidden');
      })
      .catch(() => {
        // Fallback if local mp3 is not present in preview
        console.log("Audio file ready at: /audio/perfect-instrumental.mp3");
      });
  }
}

if (musicBtn) {
  musicBtn.addEventListener('click', toggleMusic);
}

// =========================================================================
// 3. HEART RAIN & ATMOSPHERIC PARTICLES CANVAS
// =========================================================================
(function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const heartColors = [
    'rgba(225, 29, 72, ',
    'rgba(244, 63, 94, ',
    'rgba(244, 114, 182, ',
    'rgba(190, 18, 60, ',
    'rgba(251, 113, 133, '
  ];

  // Subtle, elegant heart count
  const heartCount = Math.min(Math.max(Math.floor(width / 32), 20), 38);
  const rainHearts = [];

  for (let i = 0; i < heartCount; i++) {
    rainHearts.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 10 + 8,
      speedY: Math.random() * 1.4 + 0.8,
      speedX: (Math.random() - 0.5) * 0.3,
      rotation: (Math.random() - 0.5) * 0.5,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      alpha: Math.random() * 0.35 + 0.2,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      swayFreq: Math.random() * 0.02 + 0.01,
      swayAmp: Math.random() * 0.8 + 0.4,
      timeOffset: Math.random() * 1000
    });
  }

  // Refined subtle sparkles
  const sparkleCount = Math.min(Math.floor((width * height) / 28000), 22);
  const sparkles = [];

  for (let i = 0; i < sparkleCount; i++) {
    sparkles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -Math.random() * 0.25 - 0.05,
      alpha: Math.random() * 0.5 + 0.15,
      alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    });
  }

  function drawHeart(cx, cy, size, rotation, colorStr) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.beginPath();
    const s = size / 30;
    ctx.moveTo(0, 5 * s);
    ctx.bezierCurveTo(-15 * s, -12 * s, -28 * s, 8 * s, 0, 26 * s);
    ctx.bezierCurveTo(28 * s, 8 * s, 15 * s, -12 * s, 0, 5 * s);
    ctx.fillStyle = colorStr;
    ctx.fill();
    ctx.restore();
  }

  let tick = 0;

  function loop() {
    tick++;
    ctx.clearRect(0, 0, width, height);

    // Deep luxury plum vignette
    const bgGlow = ctx.createRadialGradient(
      width * 0.5, height * 0.4, 0,
      width * 0.5, height * 0.5, Math.max(width, height) * 0.75
    );
    bgGlow.addColorStop(0, 'rgba(38, 12, 28, 0.45)');
    bgGlow.addColorStop(0.6, 'rgba(18, 5, 14, 0.75)');
    bgGlow.addColorStop(1, 'rgba(10, 4, 8, 0.98)');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, width, height);

    // Sparkles
    sparkles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += p.alphaSpeed;
      if (p.alpha > 0.7 || p.alpha < 0.1) p.alphaSpeed = -p.alphaSpeed;
      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 114, 182, ${Math.max(0.05, Math.min(0.7, p.alpha))})`;
      ctx.fill();
    });

    // Falling Hearts
    rainHearts.forEach(h => {
      const sway = Math.sin((tick + h.timeOffset) * h.swayFreq) * h.swayAmp;
      h.x += h.speedX + sway;
      h.y += h.speedY;
      h.rotation += h.rotationSpeed;

      if (h.y > height + 30) {
        h.y = -25 - Math.random() * 30;
        h.x = Math.random() * width;
        h.speedY = Math.random() * 1.4 + 0.8;
      }
      if (h.x < -30) h.x = width + 20;
      if (h.x > width + 30) h.x = -20;

      drawHeart(h.x, h.y, h.size, h.rotation, `${h.color}${h.alpha})`);
    });

    requestAnimationFrame(loop);
  }

  loop();
})();

// =========================================================================
// 4. MICRO-PARTICLE CONFETTI SYSTEM
// =========================================================================
function fireConfetti(options = {}) {
  const count = options.particleCount || 45;
  const originX = (options.origin && options.origin.x !== undefined) ? options.origin.x : 0.5;
  const originY = (options.origin && options.origin.y !== undefined) ? options.origin.y : 0.5;
  const colors = options.colors || ['#e11d48', '#f472b6', '#fbcfe8', '#fef08a', '#ffffff'];

  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.inset = '0';
  confettiCanvas.style.width = '100vw';
  confettiCanvas.style.height = '100vh';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = '999';
  document.body.appendChild(confettiCanvas);

  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  const cctx = confettiCanvas.getContext('2d');
  if (!cctx) return;

  const startX = originX * confettiCanvas.width;
  const startY = originY * confettiCanvas.height;

  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 6 + 2.5;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 1.5,
      size: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      gravity: 0.15,
      drag: 0.965
    });
  }

  function renderConfetti() {
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let active = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.alpha -= 0.015;
      p.rotation += p.rotationSpeed;

      if (p.alpha > 0) {
        active = true;
        cctx.save();
        cctx.translate(p.x, p.y);
        cctx.rotate((p.rotation * Math.PI) / 180);
        cctx.globalAlpha = p.alpha;
        cctx.fillStyle = p.color;
        cctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        cctx.restore();
      }
    });

    if (active) {
      requestAnimationFrame(renderConfetti);
    } else {
      confettiCanvas.remove();
    }
  }

  renderConfetti();
}

function triggerCelebrationShower() {
  fireConfetti({ particleCount: 55, origin: { x: 0.5, y: 0.4 } });
  setTimeout(() => fireConfetti({ particleCount: 35, origin: { x: 0.25, y: 0.45 } }), 160);
  setTimeout(() => fireConfetti({ particleCount: 35, origin: { x: 0.75, y: 0.45 } }), 320);
}

// =========================================================================
// 5. FLUID SCREEN TRANSITIONS ENGINE
// Cross-fade with exit animation before entering target screen
// =========================================================================
const screens = {
  lock: document.getElementById('screen-lock'),
  loading: document.getElementById('screen-loading'),
  makeWish: document.getElementById('screen-make-wish'),
  secretWish: document.getElementById('screen-secret-wish'),
  letter: document.getElementById('screen-letter'),
  balloons: document.getElementById('screen-balloons'),
  grandSurprise: document.getElementById('screen-grand-surprise')
};

let currentScreenKey = 'lock';

function showScreen(targetScreenKey) {
  if (currentScreenKey === targetScreenKey) return;

  const currentEl = screens[currentScreenKey];
  const targetEl = screens[targetScreenKey];

  if (currentEl) {
    currentEl.classList.add('leaving');
    setTimeout(() => {
      currentEl.classList.remove('active', 'leaving');
      if (targetEl) {
        targetEl.classList.add('active');
        targetEl.scrollTop = 0;
        currentScreenKey = targetScreenKey;
      }
    }, 280);
  } else if (targetEl) {
    targetEl.classList.add('active');
    targetEl.scrollTop = 0;
    currentScreenKey = targetScreenKey;
  }
}

// =========================================================================
// 6. TACTILE BUTTON RIPPLE EFFECT ON CLICK
// =========================================================================
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-primary, .btn-secondary, .wax-seal-btn');
  if (!btn) return;

  const circle = document.createElement('span');
  circle.classList.add('ripple');
  const d = Math.max(btn.clientWidth, btn.clientHeight);
  const rect = btn.getBoundingClientRect();

  circle.style.width = circle.style.height = `${d}px`;
  circle.style.left = `${e.clientX - rect.left - d / 2}px`;
  circle.style.top = `${e.clientY - rect.top - d / 2}px`;

  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
});

// =========================================================================
// 7. SCREEN 1: LOCK SCREEN & 10-BOX PIN SYSTEM
// =========================================================================
const pinBoxes = Array.from(document.querySelectorAll('.pin-box'));
const pinStatus = document.getElementById('pin-status');
const btnUnlock = document.getElementById('btn-unlock');
const vkeys = document.querySelectorAll('.vkey');

function getEnteredPin() {
  return pinBoxes.map(box => box.value.trim().toUpperCase()).join('');
}

function verifyPin() {
  const entered = getEnteredPin();
  if (entered.length < CONFIG.secretCode.length) {
    pinStatus.textContent = "Please fill in all letters ❤️";
    pinStatus.className = "pin-status-msg error";
    return;
  }

  if (entered === CONFIG.secretCode) {
    sfx.playUnlock();
    pinStatus.textContent = "Unlocked! Opening surprise... ✨❤️";
    pinStatus.className = "pin-status-msg success";
    pinBoxes.forEach(box => box.classList.add('success'));

    setTimeout(() => {
      showScreen('loading');
      startLoadingSequence();
    }, 700);
  } else {
    sfx.playError();
    pinStatus.textContent = "Incorrect code! Check the hint above 🥺";
    pinStatus.className = "pin-status-msg error";
    pinBoxes.forEach(box => box.classList.add('shake'));

    setTimeout(() => {
      pinBoxes.forEach(box => {
        box.classList.remove('shake');
        box.value = '';
        box.classList.remove('filled');
      });
      if (pinBoxes[0]) pinBoxes[0].focus();
    }, 600);
  }
}

pinBoxes.forEach((box, index) => {
  box.addEventListener('input', () => {
    sfx.playKeyClick();
    const val = box.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    box.value = val ? val[val.length - 1] : '';

    if (box.value) {
      box.classList.add('filled');
      if (index < pinBoxes.length - 1) {
        pinBoxes[index + 1].focus();
      }
    } else {
      box.classList.remove('filled');
    }

    if (getEnteredPin().length === CONFIG.secretCode.length) {
      verifyPin();
    }
  });

  box.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !box.value && index > 0) {
      pinBoxes[index - 1].focus();
      pinBoxes[index - 1].value = '';
      pinBoxes[index - 1].classList.remove('filled');
    } else if (e.key === 'Enter') {
      verifyPin();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      pinBoxes[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < pinBoxes.length - 1) {
      pinBoxes[index + 1].focus();
    }
  });
});

if (btnUnlock) {
  btnUnlock.addEventListener('click', verifyPin);
}

// Virtual Touch Keypad Buttons
vkeys.forEach(k => {
  k.addEventListener('click', (e) => {
    e.preventDefault();
    sfx.playKeyClick();
    const key = k.dataset.key;

    if (key === 'BACKSPACE') {
      for (let i = pinBoxes.length - 1; i >= 0; i--) {
        if (pinBoxes[i].value) {
          pinBoxes[i].value = '';
          pinBoxes[i].classList.remove('filled');
          pinBoxes[i].focus();
          break;
        }
      }
    } else {
      for (let i = 0; i < pinBoxes.length; i++) {
        if (!pinBoxes[i].value) {
          pinBoxes[i].value = key;
          pinBoxes[i].classList.add('filled');
          if (i < pinBoxes.length - 1) {
            pinBoxes[i + 1].focus();
          }
          break;
        }
      }
      if (getEnteredPin().length === CONFIG.secretCode.length) {
        verifyPin();
      }
    }
  });
});

// =========================================================================
// 8. SCREEN 2: LOADING PROGRESS SEQUENCE
// =========================================================================
function startLoadingSequence() {
  const fill = document.getElementById('loading-progress-fill');
  if (fill) {
    fill.style.width = '0%';
    setTimeout(() => { fill.style.width = '100%'; }, 50);
  }

  setTimeout(() => {
    showScreen('makeWish');
  }, 2200);
}

// =========================================================================
// 9. SCREEN 3: MAKE A WISH (CANDLES)
// =========================================================================
const btnBlowCandles = document.getElementById('btn-blow-candles');
const btnWishNext = document.getElementById('btn-wish-next');
let candlesExtinguished = false;

function blowOutCandles() {
  if (candlesExtinguished) return;
  candlesExtinguished = true;

  sfx.playCandleBlow();

  [1, 2, 3].forEach(id => {
    const flame = document.getElementById(`flame-${id}`);
    const smoke = document.getElementById(`smoke-${id}`);
    if (flame) flame.classList.add('hidden');
    if (smoke) smoke.classList.remove('hidden');
  });

  fireConfetti({
    particleCount: 40,
    origin: { x: 0.5, y: 0.45 },
    colors: ['#f43f5e', '#ec4899', '#fbcfe8', '#ffffff']
  });

  if (btnBlowCandles) btnBlowCandles.classList.add('hidden');
  if (btnWishNext) btnWishNext.classList.remove('hidden');
}

if (btnBlowCandles) {
  btnBlowCandles.addEventListener('click', blowOutCandles);
}

if (btnWishNext) {
  btnWishNext.addEventListener('click', () => {
    sfx.playKeyClick();
    showScreen('secretWish');
  });
}

// =========================================================================
// 10. SCREEN 4: SECRET WISH (EDITORIAL WAX SEAL & STAGGERED REVEAL)
// =========================================================================
const btnOpenWaxSeal = document.getElementById('btn-open-wax-seal');
const secretWishClosed = document.getElementById('secret-wish-closed');
const secretWishOpened = document.getElementById('secret-wish-opened');
const btnSecretWishNext = document.getElementById('btn-secret-wish-next');
let isWishRevealed = false;

function openWaxSeal() {
  if (isWishRevealed) return;
  isWishRevealed = true;

  sfx.playMagicReveal();
  fireConfetti({ particleCount: 50, origin: { x: 0.5, y: 0.5 } });

  if (secretWishClosed) secretWishClosed.classList.add('hidden');
  if (secretWishOpened) secretWishOpened.classList.remove('hidden');

  const blocks = document.querySelectorAll('.wish-block');
  blocks.forEach((block, idx) => {
    setTimeout(() => {
      block.classList.remove('hidden');
      block.classList.add('visible');
      sfx.playTone(440 + idx * 50, 0.3, 'sine', 0.08);
    }, 200 + idx * 360);
  });

  setTimeout(() => {
    if (btnSecretWishNext) btnSecretWishNext.classList.remove('hidden');
  }, 200 + blocks.length * 360 + 150);
}

if (btnOpenWaxSeal) {
  btnOpenWaxSeal.addEventListener('click', openWaxSeal);
}

if (btnSecretWishNext) {
  btnSecretWishNext.addEventListener('click', () => {
    sfx.playKeyClick();
    showScreen('letter');
  });
}

// =========================================================================
// 11. SCREEN 5: LOVE LETTER
// =========================================================================
const btnLetterNext = document.getElementById('btn-letter-next');
if (btnLetterNext) {
  btnLetterNext.addEventListener('click', () => {
    sfx.playKeyClick();
    showScreen('balloons');
  });
}

// =========================================================================
// 12. SCREEN 6: BALLOONS POPPING INTERACTION
// =========================================================================
const balloonItems = document.querySelectorAll('.balloon-item');
const balloonModal = document.getElementById('balloon-modal');
const balloonModalText = document.getElementById('balloon-modal-text');
const btnCloseBalloonModal = document.getElementById('btn-close-balloon-modal');
const btnBalloonsNext = document.getElementById('btn-balloons-next');
const balloonCountText = document.getElementById('balloon-count-text');

let poppedIndices = new Set();

balloonItems.forEach((bItem, index) => {
  bItem.addEventListener('click', () => {
    if (poppedIndices.has(index)) return;

    const rect = bItem.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    sfx.playBalloonPop();
    fireConfetti({ particleCount: 35, origin: { x, y } });

    poppedIndices.add(index);

    const dot = document.querySelector(`.progress-dot.dot-${index}`);
    if (dot) dot.classList.add('active');

    if (balloonCountText) {
      balloonCountText.textContent = `${poppedIndices.size}/4 unlocked`;
    }

    // High-end pop transition
    bItem.style.transition = 'transform 0.2s var(--ease-out-expo), opacity 0.3s ease';
    bItem.style.transform = 'scale(0.88)';
    bItem.style.opacity = '0.35';
    bItem.style.pointerEvents = 'none';

    if (balloonModal && balloonModalText) {
      balloonModalText.textContent = CONFIG.balloonMessages[index] || "You are loved! ❤️";
      balloonModal.classList.remove('hidden');
    }

    if (poppedIndices.size === 4 && btnBalloonsNext) {
      btnBalloonsNext.classList.remove('hidden');
    }
  });
});

if (btnCloseBalloonModal) {
  btnCloseBalloonModal.addEventListener('click', () => {
    sfx.playKeyClick();
    if (balloonModal) balloonModal.classList.add('hidden');
  });
}

if (btnBalloonsNext) {
  btnBalloonsNext.addEventListener('click', () => {
    sfx.playKeyClick();
    showScreen('grandSurprise');
    sfx.playFanfare();
    triggerCelebrationShower();
  });
}

// =========================================================================
// 13. SCREEN 7: GRAND FINALE CELEBRATE & RESTART
// =========================================================================
const btnConfettiShower = document.getElementById('btn-confetti-shower');
const btnRestartExperience = document.getElementById('btn-restart-experience');

if (btnConfettiShower) {
  btnConfettiShower.addEventListener('click', () => {
    sfx.playKeyClick();
    sfx.playFanfare();
    triggerCelebrationShower();
  });
}

if (btnRestartExperience) {
  btnRestartExperience.addEventListener('click', () => {
    sfx.playKeyClick();
    window.location.reload();
  });
}

// Auto focus first PIN input on launch
window.addEventListener('DOMContentLoaded', () => {
  const firstPin = document.querySelector('.pin-box');
  if (firstPin) {
    firstPin.focus();
  }
});
