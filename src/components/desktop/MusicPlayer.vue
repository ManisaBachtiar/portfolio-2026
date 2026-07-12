<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const audioRef = ref<HTMLAudioElement | null>(null)
const playing = ref(false)
const progress = ref(0)
// Browsers block unmuted autoplay without a prior user gesture — if the direct
// attempt is rejected, this flags a fallback that plays on the user's first tap/click anywhere.
const needsGesture = ref(false)

function toggle() {
  const audio = audioRef.value
  if (!audio) return
  if (playing.value) {
    audio.pause()
  } else {
    audio.play().catch(() => {})
  }
}

function attemptAutoplay() {
  const audio = audioRef.value
  if (!audio) return
  audio.play().then(() => {
    needsGesture.value = false
  }).catch(() => {
    needsGesture.value = true
  })
}

function onFirstInteraction() {
  if (needsGesture.value) attemptAutoplay()
}

function onTimeUpdate() {
  const audio = audioRef.value
  if (!audio || !audio.duration) return
  progress.value = (audio.currentTime / audio.duration) * 100
}

onMounted(() => {
  attemptAutoplay()
  window.addEventListener('pointerdown', onFirstInteraction, { once: true })
})

onUnmounted(() => {
  window.removeEventListener('pointerdown', onFirstInteraction)
})
</script>

<template>
  <div class="music-player">
    <audio
      ref="audioRef"
      src="/audio/music.mp3"
      loop
      preload="auto"
      @play="playing = true"
      @pause="playing = false"
      @timeupdate="onTimeUpdate"
    />
    <span class="mfs-label">My Fav Song</span>
    <button type="button" class="player-pill" :class="{ playing }" @click="toggle" :aria-label="playing ? 'Pause music' : 'Play music'">
      <span class="play-btn" aria-hidden="true">
        <svg v-if="!playing" viewBox="0 0 24 24" fill="none">
          <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="red" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none">
          <rect x="6.5" y="5" width="4" height="14" rx="1.3" fill="red" />
          <rect x="13.5" y="5" width="4" height="14" rx="1.3" fill="red" />
        </svg>
      </span>

      <span class="track">
        <span class="track-fill" :style="{ width: progress + '%' }" />
        <span class="track-dot" :style="{ left: progress + '%' }" />
      </span>

      <svg class="sparkle sparkle-1" viewBox="0 0 24 24" fill="#f4b942" aria-hidden="true">
        <path d="M12 2c.6 4.4 2.1 6.9 6.5 7.5-4.4.6-5.9 3.1-6.5 7.5-.6-4.4-2.1-6.9-6.5-7.5C9.9 8.9 11.4 6.4 12 2Z" />
      </svg>

      <svg class="note-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 18.5a2.5 2.5 0 1 1-2.5-2.5A2.5 2.5 0 0 1 9 18.5Zm0 0V6.4a1 1 0 0 1 .78-.98l7-1.6a1 1 0 0 1 1.22.98V16.5a2.5 2.5 0 1 1-1.5-2.29V8.3l-6 1.37V18.5"
          stroke="#e0262b"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.music-player {
  position: absolute;
  left: 26px;
  bottom: 40px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transform: rotate(-4deg);
}

.mfs-label {
  padding-left: 6px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: #fff;
  text-shadow: 0 1px 3px rgba(20, 8, 12, 0.45);
}

.player-pill {
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  width: clamp(135px, 15vw, 161px);
  height: 37px;
  padding: 5px 12px 5px 5px;
  border: none;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(255, 255, 255, 0.4);
  cursor: var(--cursor-arrow);
  transition: transform 0.22s var(--ease-out-soft);
}

.player-pill:hover {
  transform: translateY(-2px);
}

.player-pill:active {
  transform: scale(0.97);
}

.play-btn {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fdeceb;
}

.play-btn svg {
  width: 12px;
  height: 12px;
}

.track {
  position: relative;
  flex: 1;
  height: 2px;
  border-radius: 999px;
  background: var(--border-soft);
}

.track-fill {
  position: absolute;
  inset: 0 auto 0 0;
  height: 100%;
  border-radius: 999px;
  background: #e0262b;
}

.track-dot {
  position: absolute;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e0262b;
  transform: translate(-50%, -50%);
}

.sparkle {
  position: absolute;
  top: 3px;
  right: 20px;
  width: 8px;
  height: 8px;
  opacity: 0.9;
  animation: twinkle 1.8s ease-in-out infinite;
}

.note-icon {
  flex: none;
  width: 13px;
  height: 13px;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.35;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sparkle {
    animation: none;
  }
}

@media (max-width: 900px) {
  .music-player {
    /* Stacked above the Dock instead of beside it — on narrow screens the Dock's 5 icons
       span nearly the full width, leaving no horizontal room for this widget on the same row. */
    left: 10px;
    bottom: 92px;
  }

  .player-pill {
    width: clamp(112px, 34vw, 136px);
  }
}
</style>
