<template>
  <div class="social-links d-flex justify-content-center gap-3 mb-4">
    <a v-for="(link, i) in links" :key="link.name" :href="link.url" target="_blank" rel="noopener" class="social-btn"
      :style="`animation-delay: ${i * 0.1}s`" @mouseenter="onHover($event, link.color)" @mouseleave="onLeave"
      @mousedown="onPress" @mouseup="onRelease">
      <span class="social-ripple"></span>
      <span class="social-tooltip">{{ link.name }}</span>
      <i :class="['bi', link.icon]"></i>
    </a>
  </div>
</template>

<script setup>
defineProps({ links: { type: Array, required: true } })

const onHover = (e, color) => {
  const btn = e.currentTarget
  btn.style.borderColor = color + '88'
  btn.style.boxShadow = `0 10px 30px ${color}30, 0 0 0 1px ${color}22`
  btn.querySelector('i').style.color = color
  btn.querySelector('i').style.transform = 'scale(1.25) rotate(-5deg)'
}

const onLeave = (e) => {
  const btn = e.currentTarget
  btn.style.borderColor = ''
  btn.style.boxShadow = ''
  btn.querySelector('i').style.color = ''
  btn.querySelector('i').style.transform = ''
}

const onPress = (e) => {
  e.currentTarget.style.transform = 'translateY(-2px) scale(0.96)'
}
const onRelease = (e) => {
  e.currentTarget.style.transform = ''
}
</script>

<style scoped>
.social-links {
  flex-wrap: wrap;
}

.social-btn {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  animation: btn-enter 0.5s ease both;
}

@keyframes btn-enter {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(10px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.social-btn:hover {
  transform: translateY(-6px) scale(1.08);
  background: rgba(255, 255, 255, 0.08);
}

.social-btn i {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.55);
  transition: color 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 1;
}

/* Ripple */
.social-ripple {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  transform: scale(0);
  opacity: 1;
  transition: transform 0.5s ease, opacity 0.5s ease;
  pointer-events: none;
}

.social-btn:hover .social-ripple {
  transform: scale(1);
  opacity: 0;
}

/* Tooltip */
.social-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(6px) scale(0.85);
  background: rgba(6, 12, 24, 0.9);
  backdrop-filter: blur(12px);
  color: #f0f8ff;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  padding: 5px 12px;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(6, 12, 24, 0.9);
}

.social-btn:hover .social-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0) scale(1);
}

/* Mobile */
@media (max-width: 480px) {
  .social-btn {
    width: 48px;
    height: 48px;
    border-radius: 14px;
  }

  .social-btn i {
    font-size: 19px;
  }
}
</style>
