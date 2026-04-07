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
import { profileConfig } from '../../config/profile'

const isMuted = ref(true)
const player = ref(null)
const isApiReady = ref(false)
const pendingPlay = ref(false)

const youtubeId = profileConfig.audio.youtubeId

const toggle = () => {
  isMuted.value = !isMuted.value
}

// Method to start audio directly (called from user interaction)
const start = () => {
  if (isApiReady.value && player.value) {
    isMuted.value = false
    player.value.playVideo()
    player.value.unMute()
  } else {
    pendingPlay.value = true
  }
}

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
      height: '1',
      width: '1',
      videoId: youtubeId,
      playerVars: {
        'autoplay': 0,
        'controls': 0,
        'loop': 1,
        'playlist': youtubeId,
        'modestbranding': 1,
        'showinfo': 0,
        'mute': 1
      },
      events: {
        'onReady': (event) => {
          if (pendingPlay.value) {
            isMuted.value = false
            event.target.playVideo()
            event.target.unMute()
            pendingPlay.value = false
          }
        }
      }
    })
  }
})

defineExpose({ start })

onBeforeUnmount(() => {
  if (player.value && player.value.destroy) {
    player.value.destroy()
  }
})
</script>

<style scoped>
#youtube-player-container {
  position: fixed;
  top: -10px;
  left: -10px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
}

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
