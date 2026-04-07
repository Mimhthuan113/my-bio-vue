<template>
  <div class="typing-wrapper">
    <span class="typing-output">{{ displayText }}</span>
    <span class="typing-cursor"></span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  texts: { type: Array, required: true },
  typeSpeed: { type: Number, default: 70 },
  deleteSpeed: { type: Number, default: 35 },
  pauseTime: { type: Number, default: 2200 }
})

const displayText = ref('')
let textIdx = 0
let charIdx = 0
let isDeleting = false
let timerId = null

function tick() {
  const current = props.texts[textIdx]

  if (isDeleting) {
    charIdx--
  } else {
    charIdx++
  }

  displayText.value = current.substring(0, charIdx)

  let delay = isDeleting ? props.deleteSpeed : props.typeSpeed

  if (!isDeleting && charIdx === current.length) {
    delay = props.pauseTime
    isDeleting = true
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false
    textIdx = (textIdx + 1) % props.texts.length
    delay = 400
  }

  timerId = setTimeout(tick, delay)
}

onMounted(() => tick())
onBeforeUnmount(() => { if (timerId) clearTimeout(timerId) })
</script>

<style scoped>
.typing-wrapper {
  text-align: center;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  color: #22d3ee;
  min-height: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 18px;
  background: #22d3ee;
  margin-left: 3px;
  animation: blink-cursor 1s step-end infinite;
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
