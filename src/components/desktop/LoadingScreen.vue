<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits<{ done: [] }>()

const leaving = ref(false)
let showTimer: number | undefined
let hideTimer: number | undefined

onMounted(() => {
  showTimer = window.setTimeout(() => {
    leaving.value = true
    hideTimer = window.setTimeout(() => emit('done'), 420)
  }, 1100)
})

onUnmounted(() => {
  if (showTimer) window.clearTimeout(showTimer)
  if (hideTimer) window.clearTimeout(hideTimer)
})
</script>

<template>
  <div class="loading-screen" :class="{ leaving }">
    <span class="mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 5c6 4 6 12 0 16-6-4-6-12 0-16Z" fill="currentColor" />
        <circle cx="20" cy="27.5" r="7" fill="currentColor" />
      </svg>
    </span>
    <div class="loading-bar">
      <div class="loading-bar-fill" />
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  background: var(--bg);
  color: #2b2621;
  transition: opacity 0.42s var(--ease-out-soft), filter 0.42s var(--ease-out-soft);
  z-index: 100;
}

.loading-screen.leaving {
  opacity: 0;
  filter: blur(6px);
}

.mark {
  width: 40px;
  height: 40px;
  opacity: 0.85;
}

.loading-bar {
  width: 140px;
  height: 3px;
  border-radius: 999px;
  background: var(--border-soft);
  overflow: hidden;
}

.loading-bar-fill {
  width: 40%;
  height: 100%;
  border-radius: 999px;
  background: #3768c9;
  animation: loading-sweep 1.1s ease-in-out infinite;
}

@keyframes loading-sweep {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading-bar-fill {
    animation: none;
    width: 100%;
    transform: none;
  }
}
</style>
