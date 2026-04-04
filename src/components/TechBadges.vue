<template>
  <div class="tech-row d-flex justify-content-center flex-wrap gap-2 mt-3">
    <span v-for="(badge, i) in badges" :key="badge" class="tech-badge" :style="`animation-delay: ${0.8 + i * 0.08}s`">
      {{ badge }}
    </span>
  </div>
</template>

<script setup>
defineProps({ badges: { type: Array, required: true } })
</script>

<style scoped>
.tech-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  padding: 5px 13px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.5px;
  cursor: default;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: badge-pop 0.5s ease both;
  position: relative;
  overflow: hidden;
}

.tech-badge::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.08), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.tech-badge:hover {
  border-color: rgba(0, 212, 255, 0.5);
  color: #22d3ee;
  background: rgba(0, 212, 255, 0.07);
  transform: translateY(-3px) scale(1.06);
  box-shadow: 0 6px 20px rgba(0, 212, 255, 0.15);
}

.tech-badge:hover::before {
  transform: translateX(100%);
}

@keyframes badge-pop {
  0% {
    opacity: 0;
    transform: scale(0.7) translateY(8px);
  }

  70% {
    transform: scale(1.07) translateY(-2px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
