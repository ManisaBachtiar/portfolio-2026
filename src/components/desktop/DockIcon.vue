<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    active?: boolean
  }>(),
  { active: false },
)

defineEmits<{ click: [] }>()
</script>

<template>
  <button type="button" class="dock-icon" :class="{ active }" @click="$emit('click')">
    <span class="dock-tooltip" role="tooltip">{{ label }}</span>
    <span class="file-glyph" aria-hidden="true">
      <svg viewBox="0 0 40 32" fill="none">
        <path
          d="M2 7.5C2 5.567 3.567 4 5.5 4h9.06c.98 0 1.9.46 2.49 1.24L18.9 8H34.5C36.433 8 38 9.567 38 11.5v13c0 1.933-1.567 3.5-3.5 3.5h-29C3.567 28 2 26.433 2 24.5v-17Z"
          fill="url(#folderBody)"
        />
        <path
          d="M2 7.5C2 5.567 3.567 4 5.5 4h9.06c.98 0 1.9.46 2.49 1.24L18.7 7.7H2v-.2Z"
          fill="url(#folderTab)"
        />
        <path d="M2 10.5h36V12H2z" fill="#ffffff" opacity="0.16" />
        <defs>
          <linearGradient id="folderBody" x1="20" y1="4" x2="20" y2="28" gradientUnits="userSpaceOnUse">
            <stop stop-color="#6fc3ff" />
            <stop offset="1" stop-color="#1f7ff0" />
          </linearGradient>
          <linearGradient id="folderTab" x1="10" y1="4" x2="10" y2="8" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9adcff" />
            <stop offset="1" stop-color="#5bb4ff" />
          </linearGradient>
        </defs>
      </svg>
    </span>
    <span v-if="active" class="active-dot" aria-hidden="true" />
  </button>
</template>

<style scoped>
.dock-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: clamp(78px, 10vw, 100px);
  background: none;
  border: none;
  padding: 4px 4px 2px;
  cursor: var(--cursor-arrow);
  font: inherit;
}

.dock-icon:hover,
.dock-icon:focus-visible {
  z-index: 20;
}

.file-glyph {
  display: flex;
  width: clamp(50px, 7vw, 66px);
  aspect-ratio: 40 / 32;
  filter: drop-shadow(0 3px 6px rgba(20, 16, 12, 0.22));
  transition: transform 0.22s var(--ease-out-soft);
  transform-origin: bottom center;
}

.dock-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 4px 9px;
  border-radius: 5px;
  background: #1c1a18;
  color: #fff;
  font-size: 12.5px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.18s ease;
  z-index: 5;
}

.dock-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #1c1a18;
}

.active-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #3768c9;
}

@media (hover: hover) {
  .dock-icon:hover .file-glyph {
    transform: translateY(-10px) scale(1.18);
  }

  .dock-icon:hover .dock-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.dock-icon:focus-visible .dock-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.dock-icon:active .file-glyph {
  transform: scale(0.94);
}

/* 78px min was too wide for 5 icons on a narrow phone (they'd overflow the dock's
   max-width:calc(100vw - 24px) and get clipped) — shrink the floor on small screens. */
@media (max-width: 480px) {
  .dock-icon {
    width: clamp(48px, 14vw, 78px);
  }

  .file-glyph {
    width: clamp(32px, 9.5vw, 50px);
  }
}
</style>
