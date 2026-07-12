<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import DesktopWidget from './DesktopWidget.vue'
import { useDragOffsets } from '../../composables/useDragOffsets'

const props = withDefaults(defineProps<{ compact?: boolean; exiting?: boolean }>(), {
  compact: false,
  exiting: false,
})

interface WidgetItem {
  kind: 'widget'
  type: 'calendar' | 'weather' | 'notifications'
  left: string
  top: string
  rotate: number
  delay: number
}

interface IconItem {
  kind: 'icon'
  type: 'figma' | 'photoshop' | 'illustrator' | 'vscode' | 'aftereffects' | 'os'
  label: string
  left: string
  top: string
  rotate: number
  delay: number
}

type FloatItem = WidgetItem | IconItem

// Kept clear of the central Photo Booth window (~25-75% x, ~19-83% y), the 4 corner photo
// cards, and the bottom Dock (bottom ~14% of the screen, centered) so nothing sits on top of a
// photo or gets crowded by the dock.
const fullItems: FloatItem[] = [
  { kind: 'widget', type: 'calendar', left: '30%', top: '9%', rotate: -5, delay: 0.03 },
  { kind: 'widget', type: 'notifications', left: '50%', top: '8%', rotate: 0, delay: 0.1 },
  { kind: 'widget', type: 'weather', left: '70%', top: '9%', rotate: 5, delay: 0.17 },

  { kind: 'icon', type: 'figma', label: 'Figma', left: '6%', top: '39%', rotate: -8, delay: 0.2 },
  { kind: 'icon', type: 'photoshop', label: 'Photoshop', left: '4%', top: '62%', rotate: 6, delay: 0.25 },

  // Right-edge column (x stays >90%, clear of photo0/photo2 which top out under 91%).
  { kind: 'icon', type: 'illustrator', label: 'Illustrator', left: '94%', top: '39%', rotate: 5, delay: 0.3 },
  { kind: 'icon', type: 'vscode', label: 'VS Code', left: '93%', top: '57%', rotate: -6, delay: 0.35 },
  { kind: 'icon', type: 'aftereffects', label: 'After Effects', left: '96%', top: '73%', rotate: 8, delay: 0.4 },
  { kind: 'icon', type: 'os', label: 'OS', left: '95%', top: '90%', rotate: -3, delay: 0.45 },
]

// Empty on mobile — these are purely decorative and on a narrow screen the Photo Booth window
// alone takes up nearly the full width, so there's no room for them without overlapping it.
const ms: FloatItem[] = []

const items = computed(() => (props.compact ? ms : fullItems))

const { dragState, onPointerDown, onPointerMove, onPointerUp } = useDragOffsets(fullItems.length)
</script>

<template>
  <div class="floating-apps" :class="{ exiting }">
    <div
      v-for="(item, i) in items"
      :key="item.type"
      class="floating-app-item"
      :class="{ dragged: dragState[i]?.moved }"
      :style="{
        left: item.left,
        top: item.top,
        '--rotate': `${item.rotate}deg`,
        '--delay': `${item.delay}s`,
        '--dx': `${dragState[i]?.dx ?? 0}px`,
        '--dy': `${dragState[i]?.dy ?? 0}px`,
      }"
      @pointerdown="onPointerDown(i, $event)"
      @pointermove="onPointerMove(i, $event)"
      @pointerup="onPointerUp(i)"
      @pointercancel="onPointerUp(i)"
    >
      <DesktopWidget v-if="item.kind === 'widget'" :type="item.type" />
      <AppIcon v-else :type="item.type" :label="item.label" />
    </div>
  </div>
</template>

<style scoped>
.floating-apps {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.floating-apps.exiting {
  opacity: 0;
}

.floating-app-item {
  position: absolute;
  pointer-events: auto;
  transform: translate(calc(-50% + var(--dx, 0px)), calc(-50% + var(--dy, 0px))) rotate(var(--rotate));
  animation:
    app-in 0.6s var(--ease-out-soft) backwards,
    app-float 6.5s ease-in-out infinite;
  animation-delay: var(--delay), calc(var(--delay) + 0.6s);
  cursor: grab;
  touch-action: none;
}

.floating-app-item.dragged {
  animation: none;
}

.floating-app-item:active {
  cursor: grabbing;
}

@keyframes app-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--rotate)) scale(0.7);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--rotate)) scale(1);
  }
}

@keyframes app-float {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(var(--rotate)) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) rotate(var(--rotate)) translateY(-10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-app-item {
    animation: none;
    opacity: 1;
  }
}
</style>
