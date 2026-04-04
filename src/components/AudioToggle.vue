<template>
  <div class="audio-control">
    <button class="audio-btn" :class="{ muted: isMuted }" @click="toggle" :title="isMuted ? 'Bật nhạc' : 'Tắt nhạc'">
      <i :class="isMuted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill'"></i>
    </button>

    <!-- YouTube Hidden Player -->
    <div id="youtube-player-container" style="display: none;">
      <div id="player"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  shouldPlay: {
    type: Boolean,
    default: false
  }
})

const isMuted = ref(true)
const player = ref(null)
const isApiReady = ref(false)

const toggle = () => {
  isMuted.value = !isMuted.value
}

// Watch shouldPlay prop to start music
watch(() => props.shouldPlay, (val) => {
  if (val && player.value) {
    isMuted.value = false
    player.value.playVideo()
    player.value.unMute()
  }
})

// Watch mute state to control player
watch(isMuted, (val) => {
  if (!player.value) return

  if (val) {
    player.value.pauseVideo()
  } else {
    player.value.playVideo()
    player.value.unMute()
  }
})

onMounted(() => {
  // Load YouTube IFrame API
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }

  window.onYouTubeIframeAPIReady = () => {
    isApiReady.value = true
    player.value = new window.YT.Player('player', {
      height: '0',
      width: '0',
      videoId: 'BjVHBGGm00k',
      playerVars: {
        'autoplay': 0,
        'controls': 0,
        'loop': 1,
        'playlist': 'BjVHBGGm00k',
        'modestbranding': 1,
        'showinfo': 0,
        'mute': 1 // Start muted to allow background load
      },
      events: {
        'onReady': (event) => {
          if (props.shouldPlay) {
            isMuted.value = false
            event.target.playVideo()
            event.target.unMute()
          }
        }
      }
    })
  }
})

onBeforeUnmount(() => {
  if (player.value && player.value.destroy) {
    player.value.destroy()
  }
})
</script>

<style scoped>
.audio-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #22d3ee;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.audio-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.audio-btn.muted {
  color: rgba(255, 255, 255, 0.3);
}
</style>
