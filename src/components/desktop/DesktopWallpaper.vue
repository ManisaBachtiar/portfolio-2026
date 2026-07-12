<script setup lang="ts">
withDefaults(defineProps<{ exiting?: boolean }>(), { exiting: false })
</script>

<template>
  <div class="wallpaper" :class="{ exiting }">
    <div class="photo" />
    <div class="tint" />
    <svg class="grain" aria-hidden="true">
      <filter id="wallpaper-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#wallpaper-grain)" />
    </svg>
  </div>
</template>

<style scoped>
.wallpaper {
  position: absolute;
  inset: 0;
  overflow: hidden;
  transition: opacity 0.7s var(--ease-out-soft);
}

.wallpaper.exiting {
  opacity: 0;
}
.photo {
  position: absolute;
  inset: 0;
  background-image: url('/photos/walpaper.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.tint {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 22% 18%, rgba(253, 240, 216, 0.4), transparent 52%),
    linear-gradient(155deg, rgba(120, 0, 0, 0.4) 0%, rgba(193, 18, 31, 0.28) 45%, rgba(120, 0, 0, 0.45) 100%);
  mix-blend-mode: soft-light;
}


</style>
