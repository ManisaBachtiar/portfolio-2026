<script setup lang="ts">
import { computed } from 'vue'
import DesktopWindowChrome from './DesktopWindowChrome.vue'
import FloatingPhotoCard from './FloatingPhotoCard.vue'
import { PHOTO_PATHS } from '../../data/photos'
import { useDragOffsets } from '../../composables/useDragOffsets'

const props = withDefaults(defineProps<{ compact?: boolean; exiting?: boolean }>(), {
  compact: false,
  exiting: false,
})

interface ScatterItem {
  kind: 'window' | 'photo'
  left: string
  top: string
  width: string
  height: string
  rotate: number
  delay: number
  src?: string
  zoom?: number
}

const fullItems: ScatterItem[] = [
  { kind: 'window', left: '15%', top: '24%', width: 'clamp(140px, 16vw, 190px)', height: 'clamp(108px, 12vw, 148px)', rotate: -6, delay: 0.05 },
  // NOTE: width/height clamp() args must be min < max — these 3 used to have them swapped,
  // which makes clamp() resolve to a constant (the min), ignoring the viewport entirely and
  // rendering much bigger than intended. That oversized, non-responsive footprint was the
  // real cause of the "still overlapping" frames on the right.
  { kind: 'photo', left: '84%', top: '20%', width: 'clamp(156px, 12vw, 250px)', height: 'clamp(198px, 15vw, 288px)', rotate: 8, delay: 0.12, src: PHOTO_PATHS.scatter[0] },
  { kind: 'photo', left: '14%', top: '76%', width: 'clamp(146px, 11vw, 208px)', height: 'clamp(184px, 14vw, 236px)', rotate: 5, delay: 0.19, src: PHOTO_PATHS.scatter[1] },
  { kind: 'photo', left: '85%', top: '69%', width: 'clamp(158px, 12vw, 320px)', height: 'clamp(132px, 10vw, 196px)', rotate: -4, delay: 0.26, src: PHOTO_PATHS.scatter[2] },

  // Right frame pulled in tight against the Photo Booth window's edge (mid-height, where
  // photo0/photo2 and the icon column leave the most clearance).
  { kind: 'photo', left: '81%', top: '45%', width: 'clamp(110px, 9vw, 138px)', height: 'clamp(78px, 6.4vw, 97px)', rotate: -5, delay: 0.33, src: PHOTO_PATHS.quotes[0] },
  // Left frame: in the real gap between the love chip and the nav chip (which were nudged
  // apart slightly to give this more room), sized up a bit more.
  { kind: 'photo', left: '16%', top: '44.6%', width: 'clamp(198px, 9vw, 144px)', height: 'clamp(130px, 4.5vw, 72px)', rotate: 0, delay: 0.4, src: PHOTO_PATHS.quotes[2], zoom: 1.3 },
]

const compactItems: ScatterItem[] = [
  { kind: 'photo', left: '18%', top: '24%', width: 'clamp(110px, 30vw, 140px)', height: 'clamp(140px, 36vw, 176px)', rotate: -6, delay: 0.05, src: PHOTO_PATHS.scatter[0] },
  { kind: 'photo', left: '82%', top: '78%', width: 'clamp(110px, 30vw, 140px)', height: 'clamp(140px, 36vw, 176px)', rotate: 6, delay: 0.12, src: PHOTO_PATHS.scatter[1] },
  { kind: 'photo', left: '80%', top: '16%', width: 'clamp(70px, 20vw, 92px)', height: 'clamp(88px, 24vw, 114px)', rotate: -9, delay: 0.2, src: PHOTO_PATHS.scatter[2] },
  { kind: 'photo', left: '10%', top: '62%', width: 'clamp(96px, 26vw, 128px)', height: 'clamp(68px, 18vw, 90px)', rotate: 8, delay: 0.28, src: PHOTO_PATHS.quotes[0] },
]

const items = computed(() => (props.compact ? compactItems : fullItems))

const { dragState, onPointerDown, onPointerMove, onPointerUp } = useDragOffsets(fullItems.length)
</script>

<template>
  <div class="scatter">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="scatter-item"
      :class="{ exiting, dragged: dragState[i]?.moved }"
      :style="{
        left: item.left,
        top: item.top,
        width: item.width,
        height: item.height,
        '--delay': `${item.delay}s`,
        '--dx': `${dragState[i]?.dx ?? 0}px`,
        '--dy': `${dragState[i]?.dy ?? 0}px`,
      }"
      @pointerdown="onPointerDown(i, $event)"
      @pointermove="onPointerMove(i, $event)"
      @pointerup="onPointerUp(i)"
      @pointercancel="onPointerUp(i)"
    >
      <DesktopWindowChrome v-if="item.kind === 'window'" title="Finder" variant="floating" width="100%" height="85%">
        <div class="mini-finder">
          <span v-for="n in 3" :key="n" class="mini-row" />
        </div>
      </DesktopWindowChrome>
      <FloatingPhotoCard v-else :src="item.src!" :rotate="item.rotate" :zoom="item.zoom" />
    </div>
  </div>
</template>

<style scoped>
.scatter {
  /* Fixed + inset:0 so top/left percentages are true viewport percentages — matching
     FloatingAppIcons/FloatingAestheticChips/Dock. It used to be position:absolute inside
     .stage, whose inset (34px 0 128px) is NOT inset:0, so percentages here were silently
     relative to a smaller, offset box instead of the real screen — the root cause of every
     "still overlapping" report against the icons/chips/dock. */
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.scatter-item {
  position: absolute;
  transform: translate(calc(-50% + var(--dx, 0px)), calc(-50% + var(--dy, 0px)));
  animation:
    scatter-in 0.6s var(--ease-out-soft) backwards,
    scatter-float 6s ease-in-out infinite;
  animation-delay: var(--delay), calc(var(--delay) + 0.6s);
  transition: opacity 0.5s ease, filter 0.5s ease;
  cursor: grab;
  touch-action: none;
  pointer-events: auto;
}

.scatter-item.dragged {
  animation: none;
}

.scatter-item:active {
  cursor: grabbing;
}

.scatter-item.exiting {
  opacity: 0;
  transform: translate(calc(-50% + var(--dx, 0px)), calc(-50% + var(--dy, 0px))) scale(0.85);
  filter: blur(4px);
  animation-play-state: paused;
}

.mini-finder {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.mini-row {
  height: 7px;
  border-radius: 4px;
  background: var(--border-soft);
}

.mini-row:nth-child(1) {
  width: 70%;
}

.mini-row:nth-child(2) {
  width: 90%;
}

.mini-row:nth-child(3) {
  width: 55%;
}

@keyframes scatter-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.7);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes scatter-float {
  0%,
  100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scatter-item {
    animation: none;
    opacity: 1;
  }
}
</style>
