<template>
  <div class="snowfall-container" ref="container"></div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({ active: Boolean })
const container = ref(null)
let intervalId = null

const snowChars = ['❄', '❅', '❆', '✦', '•', '∘']

function createFlake() {
  if (!container.value) return
  const el = document.createElement('span')
  el.classList.add('snow-particle')
  el.textContent = snowChars[Math.floor(Math.random() * snowChars.length)]

  const size = Math.random() * 14 + 6
  const left = Math.random() * 100
  const dur = Math.random() * 8 + 6
  const delay = Math.random() * 2
  const opacity = Math.random() * 0.6 + 0.2

  el.style.cssText = `
    left:${left}%;font-size:${size}px;
    animation-duration:${dur}s;animation-delay:${delay}s;
    opacity:${opacity};color:rgba(255,255,255,${opacity});
    filter:blur(${Math.random() > 0.7 ? '1px' : '0px'});
  `
  container.value.appendChild(el)
  setTimeout(() => el.remove(), (dur + delay) * 1000)
}

watch(() => props.active, (val) => {
  if (val) {
    for (let i = 0; i < 40; i++) setTimeout(createFlake, i * 150)
    intervalId = setInterval(createFlake, 350)
  }
})

onBeforeUnmount(() => { if (intervalId) clearInterval(intervalId) })
</script>

<style scoped>
.snowfall-container {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

:deep(.snow-particle) {
  position: absolute;
  top: -10px;
  animation: snowdrift linear infinite;
  pointer-events: none;
  user-select: none;
}

@keyframes snowdrift {
  0%   { opacity: 0; transform: translateX(0) rotate(0deg); }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.5; }
  100% { opacity: 0; transform: translateX(80px) rotate(720deg); top: 100vh; }
}
</style>
