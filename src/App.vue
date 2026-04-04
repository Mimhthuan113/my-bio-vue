<template>
  <SplashScreen v-if="!entered" @enter="onEnter" />
  <div v-show="entered" style="width:100%;height:100%;position:relative;">
    <!-- Aurora Bokeh Particles -->
    <div class="bokeh-layer" ref="bokehLayer"></div>

    <!-- Snowfall -->
    <SnowfallEffect :active="entered" />

    <!-- Mouse Trail Canvas -->
    <canvas class="trail-canvas" ref="trailCanvas"></canvas>

    <!-- Audio -->
    <AudioToggle />

    <!-- Main -->
    <div class="main-container" :class="{ visible: entered }">
      <div class="glass-card" ref="card" @mousemove="onCardTilt" @mouseleave="resetCardTilt">
        <div class="status-dot" title="Online"></div>
        <AvatarGlow src="/avatar.png" alt="Minh Thuận" />
        <h1 class="profile-name">Minh Thuận</h1>
        <TypingText :texts="typingTexts" />
        <SocialLinks :links="socialLinks" />
        <InfoCard />
        <TechBadges :badges="techBadges" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import SplashScreen from './components/SplashScreen.vue'
import SnowfallEffect from './components/SnowfallEffect.vue'
import AudioToggle from './components/AudioToggle.vue'
import AvatarGlow from './components/AvatarGlow.vue'
import TypingText from './components/TypingText.vue'
import SocialLinks from './components/SocialLinks.vue'
import InfoCard from './components/InfoCard.vue'
import TechBadges from './components/TechBadges.vue'

const entered = ref(false)
const card = ref(null)
const bokehLayer = ref(null)
const trailCanvas = ref(null)

const onEnter = () => {
  entered.value = true
}

// ===== Bokeh Particles =====
const createBokeh = () => {
  if (!bokehLayer.value) return
  const sizes = [40, 60, 80, 100, 120, 160]
  const colors = [
    'rgba(135,206,235,0.25)',
    'rgba(0,212,255,0.2)',
    'rgba(123,47,255,0.18)',
    'rgba(0,198,255,0.22)',
  ]
  for (let i = 0; i < 12; i++) {
    setTimeout(() => spawnBokeh(sizes, colors), i * 400)
  }
  setInterval(() => spawnBokeh(sizes, colors), 2500)
}

const spawnBokeh = (sizes, colors) => {
  if (!bokehLayer.value) return
  const dot = document.createElement('div')
  dot.className = 'bokeh-dot'
  const s = sizes[Math.floor(Math.random() * sizes.length)]
  const c = colors[Math.floor(Math.random() * colors.length)]
  const dur = 12 + Math.random() * 10
  dot.style.cssText = `
    width:${s}px;height:${s}px;left:${Math.random() * 100}%;
    background:radial-gradient(circle,${c} 0%,transparent 70%);
    animation-duration:${dur}s;animation-delay:${Math.random() * 3}s;filter:blur(${s / 8}px);
  `
  bokehLayer.value.appendChild(dot)
  setTimeout(() => dot.remove(), (dur + 3) * 1000)
}

// ===== Card 3D Tilt =====
const onCardTilt = (e) => {
  if (!card.value) return
  const rect = card.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = (e.clientX - cx) / (rect.width / 2)
  const dy = (e.clientY - cy) / (rect.height / 2)
  card.value.style.transform = `perspective(900px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) scale(1.02)`
  card.value.style.boxShadow = `
    ${-dx * 20}px ${-dy * 20}px 60px rgba(0,0,0,0.35),
    0 0 80px rgba(0,212,255,0.06),
    inset 0 1px 0 rgba(255,255,255,0.08)
  `
}

const resetCardTilt = () => {
  if (!card.value) return
  card.value.style.transform = ''
  card.value.style.boxShadow = ''
}

// ===== Mouse Trail =====
const initTrail = () => {
  const canvas = trailCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = []

  const onMove = (e) => {
    const x = e.clientX, y = e.clientY
    for (let i = 0; i < 2; i++) {
      particles.push({
        x, y,
        size: Math.random() * 5 + 2,
        alpha: 0.8,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color: ['#00d4ff', '#87ceeb', '#ffffff'][Math.floor(Math.random() * 3)]
      })
    }
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.alpha
      ctx.fill()
      p.x += p.vx; p.y += p.vy
      p.alpha -= 0.025
      p.size *= 0.95
      if (p.alpha <= 0) particles.splice(i, 1)
    }
    ctx.globalAlpha = 1
    requestAnimationFrame(draw)
  }

  draw()
}

watch(entered, (val) => {
  if (val) {
    setTimeout(() => {
      createBokeh()
      initTrail()
    }, 300)
  }
})

const typingTexts = [
  '❄️ Full-Stack Developer',
  '🤖 AI & Chatbot Enthusiast',
  '☕ Coding with hot cocoa',
  '🏔️ Winter is my season',
  '💻 Java • Node.js • .NET • Python',
  '🎨 Vue.js • HTML • CSS',
  '⛄ Building cool stuff!'
]

const socialLinks = [
  { name: 'GitHub', icon: 'bi-github', url: 'https://github.com/Mimhthuan113', color: '#ffffff' },
  { name: 'Facebook', icon: 'bi-facebook', url: 'https://www.facebook.com/tran.quang.trung.954998', color: '#1877F2' },
  { name: 'Zalo', icon: 'bi-chat-dots-fill', url: 'https://zalo.me/0853413780', color: '#0068FF' },
  { name: 'Email', icon: 'bi-envelope-fill', url: 'mailto:mimhthuan113@gmail.com', color: '#EA4335' }
]

const techBadges = ['Java', 'Node.js', '.NET', 'Python', 'PHP', 'Vue.js', 'Docker']
</script>

<style>
.trail-canvas {
  position: fixed;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}
</style>
