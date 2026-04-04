<template>
  <div class="avatar-container">
    <div class="avatar-wrapper" @mouseenter="pulse = true" @mouseleave="pulse = false">
      <!-- Outer orbit ring -->
      <div class="orbit-ring">
        <span class="orbit-dot"></span>
      </div>
      <!-- Glow layers -->
      <div class="glow-blur"></div>
      <div class="glow-sharp" :class="{ pulsing: pulse }"></div>
      <!-- Image -->
      <div class="avatar-inner">
        <img :src="src" :alt="alt" draggable="false" />
        <!-- Shimmer overlay -->
        <div class="avatar-shimmer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ src: { type: String, required: true }, alt: { type: String, default: 'Avatar' } })
const pulse = ref(false)
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  cursor: pointer;
}

/* Orbit ring */
.orbit-ring {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  border: 1px dashed rgba(0, 212, 255, 0.2);
  animation: orbit-slow 10s linear infinite;
}

.orbit-dot {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22d3ee;
  box-shadow: 0 0 8px #22d3ee;
}

@keyframes orbit-slow {
  to {
    transform: rotate(360deg);
  }
}

/* Glow blur */
.glow-blur {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: conic-gradient(#00d4ff, #87ceeb, #22d3ee, #b8e4f0, #7b2fff, #00d4ff);
  animation: spin-glow 4s linear infinite;
  filter: blur(8px);
  opacity: 0.55;
}

/* Glow sharp border */
.glow-sharp {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(#00d4ff, #87ceeb, #22d3ee, #b8e4f0, #00d4ff);
  animation: spin-glow 4s linear infinite;
  transition: filter 0.4s ease;
}

.glow-sharp.pulsing {
  filter: drop-shadow(0 0 16px #00d4ff);
}

@keyframes spin-glow {
  to {
    transform: rotate(360deg);
  }
}

/* Avatar inner */
.avatar-inner {
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  overflow: hidden;
  background: #0a1628;
}

.avatar-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.3s ease;
}

.avatar-wrapper:hover .avatar-inner img {
  transform: scale(1.1);
  filter: brightness(1.1) saturate(1.2);
}

/* Shimmer */
.avatar-shimmer {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
  animation: shimmer-rotate 6s ease-in-out infinite;
}

@keyframes shimmer-rotate {

  0%,
  100% {
    transform: rotate(0deg);
    opacity: 0.5;
  }

  50% {
    transform: rotate(180deg);
    opacity: 0;
  }
}
</style>
