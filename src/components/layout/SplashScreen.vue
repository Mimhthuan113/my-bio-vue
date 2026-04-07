<template>
  <div class="splash-screen" @click="$emit('enter')">
    <!-- Deep star field -->
    <div class="stars-layer">
      <span v-for="i in 60" :key="'s' + i" class="star" :style="starStyle(i)"></span>
    </div>

    <!-- Snowflakes -->
    <div class="splash-snowflakes">
      <span v-for="i in 30" :key="'f' + i" class="splash-flake" :style="flakeStyle(i)">
        {{ ['❄', '❅', '❆', '✦'][i % 4] }}
      </span>
    </div>

    <!-- Outer ring glow -->
    <div class="splash-halo"></div>

    <!-- Center content -->
    <div class="splash-content">
      <div class="splash-icon-wrap">
        <div class="splash-orbit"></div>
        <div class="splash-icon">❄️</div>
      </div>
      <div class="splash-name">Minh Thuận</div>
      <div class="splash-divider">
        <span v-for="i in 5" :key="i" class="divider-dot" :style="`animation-delay:${i * 0.15}s`">•</span>
      </div>
      <div class="splash-text">Click to Enter</div>
      <div class="splash-hint">❄ Winter Portfolio ❄</div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['enter'])

const flakeStyle = () => ({
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 10 + 6}s`,
  animationDelay: `${Math.random() * 5}s`,
  fontSize: `${Math.random() * 16 + 8}px`,
  opacity: Math.random() * 0.55 + 0.15
})

const starStyle = () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  width: `${Math.random() * 2.5 + 0.5}px`,
  height: `${Math.random() * 2.5 + 0.5}px`,
  animationDelay: `${Math.random() * 4}s`,
  animationDuration: `${Math.random() * 3 + 2}s`,
})
</script>

<style scoped>
.splash-screen {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at 50% 40%, #0d2048, #060c18 80%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  overflow: hidden;
}

/* ===== Stars ===== */
.stars-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  animation: star-twinkle ease-in-out infinite;
}

@keyframes star-twinkle {

  0%,
  100% {
    opacity: 0.1;
    transform: scale(0.8);
  }

  50% {
    opacity: 0.9;
    transform: scale(1.2);
  }
}

/* ===== Snowflakes ===== */
.splash-snowflakes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.splash-flake {
  position: absolute;
  top: -20px;
  color: rgba(255, 255, 255, 0.65);
  animation: splash-fall linear infinite;
}

@keyframes splash-fall {
  0% {
    transform: translateY(-10vh) rotate(0deg);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    transform: translateY(110vh) rotate(720deg);
    opacity: 0;
  }
}

/* ===== Halo ===== */
.splash-halo {
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 1px solid rgba(0, 212, 255, 0.1);
  box-shadow: 0 0 60px rgba(0, 212, 255, 0.08), inset 0 0 60px rgba(0, 212, 255, 0.04);
  animation: halo-pulse 4s ease-in-out infinite;
}

@keyframes halo-pulse {

  0%,
  100% {
    transform: scale(0.9);
    opacity: 0.4;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
}

/* ===== Icon ===== */
.splash-icon-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.splash-orbit {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 2px dashed rgba(0, 212, 255, 0.25);
  animation: orbit-spin 8s linear infinite;
}

.splash-orbit::before,
.splash-orbit::after {
  content: '❄';
  position: absolute;
  font-size: 14px;
  color: rgba(0, 212, 255, 0.7);
}

.splash-orbit::before {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.splash-orbit::after {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}

.splash-icon {
  font-size: 72px;
  animation: icon-float 3s ease-in-out infinite;
  filter: drop-shadow(0 0 25px rgba(0, 212, 255, 0.7)) drop-shadow(0 0 60px rgba(135, 206, 235, 0.3));
  z-index: 1;
}

@keyframes icon-float {

  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(-12px) scale(1.05);
  }
}

/* ===== Text ===== */
.splash-content {
  text-align: center;
  z-index: 2;
}

.splash-name {
  font-family: 'Inter', sans-serif;
  font-size: 34px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #fff, #87ceeb, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: slide-up 0.8s ease 0.3s both;
}

.splash-divider {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin: 12px 0;
}

.divider-dot {
  color: rgba(0, 212, 255, 0.6);
  font-size: 18px;
  animation: dot-bounce 1.2s ease-in-out infinite;
}

@keyframes dot-bounce {

  0%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  50% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

.splash-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  animation: blink 2s ease-in-out infinite, slide-up 0.8s ease 0.5s both;
}

.splash-text::after {
  content: '|';
  margin-left: 3px;
  color: #22d3ee;
  animation: cursor-blink 1s step-end infinite;
}

.splash-hint {
  margin-top: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(135, 206, 235, 0.4);
  animation: slide-up 0.8s ease 0.7s both;
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
}

@keyframes cursor-blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>
