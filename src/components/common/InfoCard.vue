<template>
  <div class="info-card">
    <div class="info-icon">⛄</div>
    <div class="info-body">
      <div class="info-label">CURRENT STATUS</div>
      <div class="info-value">
        <span class="highlight">Coding</span>
        <span class="sep">·</span>
        {{ currentTime }}
      </div>
      <div class="info-online">
        <span class="online-dot"></span>
        <span class="online-txt">Online</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentTime = ref('--:--')
let timerId = null

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh'
  }) + ' (GMT+7)'
}

onMounted(() => {
  updateTime()
  timerId = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => { if (timerId) clearInterval(timerId) })
</script>

<style scoped>
.info-card {
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 14px 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Hiệu ứng hover nhẹ */
.info-card:hover {
  background: rgba(0, 212, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.2);
  box-shadow: 0 0 24px rgba(0, 212, 255, 0.06), inset 0 0 20px rgba(0, 212, 255, 0.03);
}

/* Shimmer sweep nhẹ khi hover */
.info-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.04) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.8s ease;
  pointer-events: none;
}

.info-card:hover::after {
  transform: translateX(100%);
}

/* Icon */
.info-icon {
  font-size: 34px;
  animation: bounce 2.2s ease-in-out infinite;
  flex-shrink: 0;
  filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.25));
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

/* Body — căn giữa */
.info-body {
  text-align: center;
  width: 100%;
}

.info-label {
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(255, 255, 255, 0.32);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.info-value {
  font-size: 14px;
  font-weight: 500;
  color: #b8e4f0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* ← giữa */
  gap: 5px;
  flex-wrap: wrap;
}

.highlight {
  color: #22d3ee;
  font-weight: 700;
}

.sep {
  color: rgba(255, 255, 255, 0.25);
}

/* Online row */
.info-online {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 5px;
}

.online-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: ripple-dot 2s ease-in-out infinite;
}

@keyframes ripple-dot {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.online-txt {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #22c55e;
  letter-spacing: 1px;
}
</style>
