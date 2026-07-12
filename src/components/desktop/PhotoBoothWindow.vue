<script setup lang="ts">
import DesktopWindowChrome from './DesktopWindowChrome.vue'
import ImageWithFallback from '../ImageWithFallback.vue'
import AestheticChip from './AestheticChip.vue'
import { PHOTO_PATHS } from '../../data/photos'

withDefaults(defineProps<{ exiting?: boolean }>(), { exiting: false })
</script>

<template>
  <div class="photo-booth" :class="{ exiting }">
    <DesktopWindowChrome title="Photo Booth" width="min(88vw, 720px)" height="min(64vh, 700px)" variant="primary">
      <div class="stage">
        <ImageWithFallback :src="PHOTO_PATHS.photoBooth" alt="Portrait photo" shape="rounded" />
      </div>
      <div class="filmstrip">
        <span v-for="n in 5" :key="n" class="dot" />
      </div>
    </DesktopWindowChrome>
    <p class="signature">Miiysa</p>
    <div class="hi-bubble">
      <AestheticChip type="chatbubble" text="HI, I am miiysa ><" />
    </div>
  </div>
</template>

<style scoped>
.hi-bubble {
  position: absolute;
  top: 39%;
  right: 7%;
  transform: translateY(-50%);
}

@media (max-width: 480px) {
  .hi-bubble {
    top: calc(39% + 23px);
  }
}
.photo-booth {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: idle-float 7s ease-in-out infinite;
  transition: opacity 0.5s ease, transform 0.55s var(--ease-out-soft), filter 0.5s ease;
}

.signature {
  position: absolute;
  bottom: 50px;
  left: 50%;
  width: min(88vw, 720px);
  margin: 0;
  font-family: 'Brush Script MT', 'Segoe Script', cursive;
  font-size: clamp(30px, 3.2vw, 82px);
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #fff;
  text-align: center;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  transform: translateX(-50%) rotate(-3deg);
}

.photo-booth.exiting {
  opacity: 0;
  transform: scale(0.9);
  filter: blur(6px);
  animation-play-state: paused;
}

.stage {
  padding: 16px;
  flex: 1;
  min-height: 0;
}

.filmstrip {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0 0 14px;
  flex: none;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border-soft);
}

.dot:first-child {
  background: #57c777;
}

@keyframes idle-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .photo-booth {
    animation: none;
  }
}
</style>
