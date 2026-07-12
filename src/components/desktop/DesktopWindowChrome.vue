<script setup lang="ts">
import { ref } from 'vue'
import WindowControls from '../WindowControls.vue'

withDefaults(
  defineProps<{
    title?: string
    width?: string
    height?: string
    variant?: 'primary' | 'floating'
  }>(),
  {
    title: '',
    width: 'auto',
    height: 'auto',
    variant: 'floating',
  },
)

defineEmits<{ close: [] }>()

// Drag-by-titlebar. State is local to this component instance, so it naturally resets whenever
// the window is closed/reopened or the page refreshes — nothing is persisted.
const dragX = ref(0)
const dragY = ref(0)
const dragging = ref(false)
let startX = 0
let startY = 0

function onTitlebarPointerDown(event: PointerEvent) {
  if ((event.target as HTMLElement).closest('.window-controls')) return
  dragging.value = true
  startX = event.clientX - dragX.value
  startY = event.clientY - dragY.value
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function onTitlebarPointerMove(event: PointerEvent) {
  if (!dragging.value) return
  dragX.value = event.clientX - startX
  dragY.value = event.clientY - startY
}

function onTitlebarPointerUp() {
  dragging.value = false
}
</script>

<template>
  <div
    class="window-chrome"
    :class="[variant, { dragging }]"
    :style="{ width, height, '--drag-x': `${dragX}px`, '--drag-y': `${dragY}px` }"
  >
    <header
      class="chrome-titlebar"
      @pointerdown="onTitlebarPointerDown"
      @pointermove="onTitlebarPointerMove"
      @pointerup="onTitlebarPointerUp"
      @pointercancel="onTitlebarPointerUp"
    >
      <WindowControls class="window-controls" @close="$emit('close')" />
      <span v-if="title" class="chrome-title">{{ title }}</span>
      <span class="chrome-spacer" />
    </header>
    <div class="chrome-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.window-chrome {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  transform: translate(var(--drag-x, 0px), var(--drag-y, 0px));
}

.window-chrome.dragging {
  transition: none;
}

.window-chrome.primary {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(255, 255, 255, 0.4);
}

.window-chrome.floating {
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(255, 255, 255, 0.35);
}

.chrome-titlebar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  flex: none;
  border-bottom: 1px solid var(--border-soft);
  cursor: grab;
  touch-action: none;
}

.window-chrome.dragging .chrome-titlebar {
  cursor: grabbing;
}

.chrome-title {
  flex: 1;
  text-align: center;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-soft);
}

.chrome-spacer {
  width: 49px;
}

.chrome-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
