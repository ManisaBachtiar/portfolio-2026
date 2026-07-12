<script setup lang="ts">
import ImageWithFallback from '../ImageWithFallback.vue'

withDefaults(
  defineProps<{
    src: string
    rotate?: number
    zoom?: number
  }>(),
  { rotate: 0, zoom: 1 },
)
</script>

<template>
  <div class="floating-photo-card" :style="{ '--rotate': rotate + 'deg' }">
    <ImageWithFallback :src="src" alt="" shape="rounded" :zoom="zoom" />
  </div>
</template>

<style scoped>
.floating-photo-card {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: var(--shadow-md), 0 0 0 4px rgba(255, 255, 255, 0.75);
  transform: rotate(var(--rotate));
}
</style>
