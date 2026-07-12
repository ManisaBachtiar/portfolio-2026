<script setup lang="ts">
import { computed } from 'vue'
import AestheticChip from './AestheticChip.vue'
import { useDragOffsets } from '../../composables/useDragOffsets'

const props = withDefaults(defineProps<{ compact?: boolean; exiting?: boolean }>(), {
  compact: false,
  exiting: false,
})

interface ChipItem {
  type: 'search' | 'love' | 'rating' | 'nav' | 'social' | 'photo' | 'flower' | 'chatbubble'
  left: string
  top: string
  rotate: number
  delay: number
}

// Two tidy aligned stacks (small, consistent rotation) kept clear of the 4 corner photo cards,
// the central Photo Booth window, and the bottom Dock: top-left (search + photo) and a middle
// left column (love / nav / rating) running down the gap beside the Figma/Photoshop icons.
const fullItems: ChipItem[] = [
  { type: 'search', left: '10%', top: '4%', rotate: -2, delay: 0.05 },
  // Below the search bar's actual footprint (was overlapping its bottom-left corner).
  { type: 'photo', left: '4%', top: '19%', rotate: 2, delay: 0.12 },

  { type: 'love', left: '17%', top: '58%', rotate: -2, delay: 0.08 },
  { type: 'nav', left: '30%', top: '63%', rotate: 2, delay: 0.16 },
  // Moved off the left column (down to the open bottom-right, clear of photo2/the OS icon) to
  // free up room for the bigger left photo frame in FloatingWindowScatter.
  { type: 'rating', left: '85%', top: '93%', rotate: -2, delay: 0.24 },

  { type: 'chatbubble', left: 'calc(74% + 50px)', top: '86%', rotate: -2, delay: 0.3 },

  // Social links (Instagram/Behance/GitHub), in the clear gap between the illustrator and
  // vscode icons on the right column, and clear of the photo0/photo2 corner cards (x stays
  // <90%, and this y-band sits between their footprints).
  { type: 'social', left: '64%', top: '48%', rotate: -3, delay: 0.27 },

  // 6 small flowers scattered right around the Photo Booth's edges, tiny enough (~2% of the
  // screen) to tuck into the gaps without crowding anything.
  { type: 'flower', left: '22%', top: '15%', rotate: -10, delay: 0.15 },
  { type: 'flower', left: '74%', top: '25%', rotate: 12, delay: 0.2 },
  { type: 'flower', left: '23%', top: '56%', rotate: 8, delay: 0.25 },
  { type: 'flower', left: '77%', top: '58%', rotate: -8, delay: 0.3 },
  { type: 'flower', left: '24%', top: '85%', rotate: 14, delay: 0.35 },
  { type: 'flower', left: '76%', top: '84%', rotate: -14, delay: 0.4 },
]

// Social links stay visible on mobile (user wants IG/Behance/GitHub reachable everywhere) —
// tucked centered in the thin strip above the Photo Booth window, above the two scatter photos.
const compactItems: ChipItem[] = [
  { type: 'social', left: '70%', top: '49%', rotate: -1, delay: 0.1 },
]

const items = computed(() => (props.compact ? compactItems : fullItems))

const { dragState, onPointerDown, onPointerMove, onPointerUp } = useDragOffsets(fullItems.length)
</script>

<template>
  <div class="floating-chips" :class="{ exiting }">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="floating-chip-item"
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
      <AestheticChip :type="item.type" />
    </div>
  </div>
</template>

<style scoped>
.floating-chips {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.floating-chips.exiting {
  opacity: 0;
}

.floating-chip-item {
  position: absolute;
  pointer-events: auto;
  transform: translate(calc(-50% + var(--dx, 0px)), calc(-50% + var(--dy, 0px))) rotate(var(--rotate));
  animation:
    chip-in 0.6s var(--ease-out-soft) backwards,
    chip-float 7s ease-in-out infinite;
  animation-delay: var(--delay), calc(var(--delay) + 0.6s);
  cursor: grab;
  touch-action: none;
}

.floating-chip-item.dragged {
  animation: none;
}

.floating-chip-item:active {
  cursor: grabbing;
}

@keyframes chip-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--rotate)) scale(0.7);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--rotate)) scale(1);
  }
}

@keyframes chip-float {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(var(--rotate)) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) rotate(var(--rotate)) translateY(-9px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-chip-item {
    animation: none;
    opacity: 1;
  }
}
</style>
