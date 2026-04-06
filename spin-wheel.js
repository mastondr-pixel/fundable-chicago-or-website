// ============================================================================
// PROFESSIONAL SPIN WHEEL IMPLEMENTATION
// ============================================================================

const PRIZES = [
  { name: 'Micro Grant Entry', color: '#9333EA', icon: '💰' },
  { name: 'AI Tools Access', color: '#2563B0', icon: '🤖' },
  { name: 'Free Coaching Session', color: '#0891B2', icon: '🎓' },
  { name: 'Personalized Funding List', color: '#059669', icon: '📋' },
  { name: 'VIP Event Access', color: '#EA580C', icon: '👑' },
  { name: 'Spin Again!', color: '#DC2626', icon: '🔄' },
  { name: 'Bonus Points', color: '#DB2777', icon: '⭐' },
  { name: 'Extra Raffle Entry', color: '#4F46E5', icon: '🎟️' }
];

let isSpinning = false;
let currentRotation = 0;

// Play spinning sound effect
function playSpinSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < 8; i++) {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 200 + i * 100;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.05 + 0.2);
      
      oscillator.start(audioContext.currentTime + i * 0.05);
      oscillator.stop(audioContext.currentTime + i * 0.05 + 0.2);
    }
  } catch (e) {
    console.log('Audio context not available');
  }
}

// Play win sound effect
function playWinSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.log('Audio context not available');
  }
}

// Create confetti animation
function createConfetti() {
  const colors = ['#C9A84C', '#9333EA', '#2563B0', '#0891B2', '#059669', '#EA580C'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    document.body.appendChild(confetti);
    
    const duration = 2 + Math.random() * 1;
    const xMove = (Math.random() - 0.5) * 400;
    
    confetti.animate([
      { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${window.innerHeight}px) translateX(${xMove}px) rotate(360deg)`, opacity: 0 }
    ], { duration: duration * 1000, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' });
    
    setTimeout(() => confetti.remove(), duration * 1000);
  }
}

// Start spin animation
function startSpin() {
  if (isSpinning) return;
  
  isSpinning = true;
  const wheel = document.getElementById('wheel');
  const resultDiv = document.getElementById('spin-result');
  const btn = document.getElementById('spin-btn');
  
  if (!wheel || !resultDiv || !btn) {
    console.error('Spin wheel elements not found');
    isSpinning = false;
    return;
  }
  
  btn.disabled = true;
  btn.style.opacity = '0.6';
  resultDiv.textContent = '';
  
  playSpinSound();
  
  // Calculate random rotation (multiple full rotations + random final position)
  const randomRotation = Math.floor(Math.random() * 360) + 720;
  const prizeIndex = Math.floor((randomRotation % 360) / 45);
  const selectedPrize = PRIZES[prizeIndex];
  
  currentRotation += randomRotation;
  
  wheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  wheel.style.transform = `rotate(${currentRotation}deg)`;
  
  setTimeout(() => {
    playWinSound();
    createConfetti();
    resultDiv.innerHTML = `🎉 ${selectedPrize.icon} ${selectedPrize.name}! 🎉`;
    resultDiv.style.color = selectedPrize.color;
    isSpinning = false;
    btn.disabled = false;
    btn.style.opacity = '1';
    
    // Show registration prompt after 1 second
    setTimeout(() => {
      const popup = document.getElementById('registration-popup');
      if (popup) {
        popup.classList.add('active');
      }
    }, 1000);
  }, 4000);
}

// Attach spin button handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const spinBtn = document.getElementById('spin-btn');
  if (spinBtn) {
    spinBtn.addEventListener('click', startSpin);
  }
});
