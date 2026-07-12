<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    src: string
    alt?: string
    shape?: 'circle' | 'rounded' | 'square'
    zoom?: number
  }>(),
  {
    alt: '',
    shape: 'rounded',
    zoom: 1,
  },
)

const failed = ref(false)
</script>

<template>
  <span class="image-with-fallback" :class="shape">
    <img v-if="!failed" :src="src" :alt="alt" loading="lazy" :style="{ transform: zoom !== 1 ? `scale(${zoom})` : undefined }" @error="failed = true" />
    <span v-else class="fallback" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2.5" y="5.5" width="19" height="14" rx="2.5" stroke="currentColor" stroke-width="1.4" />
        <circle cx="8.2" cy="10.2" r="1.7" stroke="currentColor" stroke-width="1.4" />
        <path d="M3 16.5l5-4.5 4 3.5 3-2.7 6 4.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  </span>
</template>

<style scoped>
.image-with-fallback {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--bg-alt);
}

.image-with-fallback.rounded {
  ;
}

.image-with-fallback.circle {
  border-radius: 50%;
}

.image-with-fallback img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-soft);
  background: linear-gradient(155deg, var(--bg-alt), var(--card-bg));
}

.fallback svg {
  width: 34%;
  height: 34%;
}
</style>
