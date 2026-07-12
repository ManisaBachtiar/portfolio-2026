<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Dock from './Dock.vue'
import FloatingAppIcons from './FloatingAppIcons.vue'
import FloatingAestheticChips from './FloatingAestheticChips.vue'
import PhotoBoothWindow from './PhotoBoothWindow.vue'
import FloatingWindowScatter from './FloatingWindowScatter.vue'
import InfoPanel from './InfoPanel.vue'
import NotesWindow from './NotesWindow.vue'
import MusicPlayer from './MusicPlayer.vue'

const compact = ref(false)
// Ordered by z-stack — last entry renders topmost. Multiple panels can be open at once; opening
// an already-open one (or clicking it) just brings it to front instead of closing it.
const openPanels = ref<string[]>([])

function updateCompact() {
  // Bumped from 640px: the full desktop layout (photo booth ~88vw + a dozen floating
  // icons/widgets/photos) needs real width to avoid overlapping itself — tablet widths get the
  // same sparse compact layout as phones rather than a squeezed version of the desktop one.
  compact.value = window.matchMedia('(max-width: 900px)').matches
}

function openPanel(key: string) {
  const idx = openPanels.value.indexOf(key)
  if (idx === -1) {
    openPanels.value.push(key)
  } else if (idx !== openPanels.value.length - 1) {
    openPanels.value.splice(idx, 1)
    openPanels.value.push(key)
  }
}

function focusPanel(key: string) {
  const idx = openPanels.value.indexOf(key)
  if (idx !== -1 && idx !== openPanels.value.length - 1) {
    openPanels.value.splice(idx, 1)
    openPanels.value.push(key)
  }
}

function closePanel(key: string) {
  const idx = openPanels.value.indexOf(key)
  if (idx !== -1) openPanels.value.splice(idx, 1)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && openPanels.value.length) {
    closePanel(openPanels.value[openPanels.value.length - 1])
  }
}

onMounted(() => {
  updateCompact()
  window.addEventListener('resize', updateCompact)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCompact)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="desktop">
    <div class="stage">
      <PhotoBoothWindow />
    </div>
    <FloatingWindowScatter :compact="compact" />
    <FloatingAppIcons :compact="compact" />
    <FloatingAestheticChips :compact="compact" />
    <Dock :compact="compact" :open-keys="openPanels" @open="openPanel" />
    <MusicPlayer />

    <TransitionGroup name="panel-fade">
      <div
        v-for="(key, index) in openPanels"
        :key="key"
        class="panel-window"
        :style="{ zIndex: 20 + index, '--cascade': index }"
        @mousedown.capture="focusPanel(key)"
      >
        <NotesWindow v-if="key === 'notes'" @close="closePanel(key)" />
        <InfoPanel v-else :active-key="(key as 'about' | 'skills' | 'projects' | 'hobbies')" @close="closePanel(key)" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.desktop {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cg fill='none' stroke='rgba(255,235,215,0.14)' stroke-width='2' stroke-linejoin='round'%3E%3Cpath d='M30 10 L36 26 L53 28 L40 39 L44 56 L30 47 L16 56 L20 39 L7 28 L24 26 Z'/%3E%3Cpath d='M120 70 L124 82 L136 84 L127 92 L130 104 L120 97 L110 104 L113 92 L104 84 L116 82 Z'/%3E%3C/g%3E%3Cg fill='rgba(255,235,215,0.18)'%3E%3Ccircle cx='70' cy='30' r='2'/%3E%3Ccircle cx='140' cy='20' r='1.6'/%3E%3Ccircle cx='20' cy='110' r='1.8'/%3E%3Ccircle cx='90' cy='130' r='2'/%3E%3Ccircle cx='150' cy='140' r='1.5'/%3E%3C/g%3E%3C/svg%3E")
      repeat,
    linear-gradient(150deg, #c1121f 0%, #5c0a10 100%);
}

.stage {
  position: absolute;
  inset: 120px 0 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .stage {
    inset: 64px 0 96px;
  }

  .panel-window {
    padding: 20px 10px;
    transform: translate(calc(var(--cascade) * 10px), calc(var(--cascade) * 10px));
  }
}

/* No full-screen scrim on purpose — the Dock and desktop stay clickable while panels are open,
   so multiple windows can be opened at once. Each window cascades slightly from the last so
   they don't land exactly on top of each other, and is individually draggable/closable. */
.panel-window {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  pointer-events: none;
  transform: translate(calc(var(--cascade) * 22px), calc(var(--cascade) * 22px));
}

.panel-window :deep(.window-chrome) {
  pointer-events: auto;
}

.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.28s var(--ease-out-soft);
}

.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
}
</style>
