<script setup lang="ts">
import { ref } from 'vue'
import LoadingScreen from './components/desktop/LoadingScreen.vue'
import Desktop from './components/desktop/Desktop.vue'

const phase = ref<'loading' | 'desktop'>('loading')
</script>

<template>
  <div class="app-shell">
    <LoadingScreen v-if="phase === 'loading'" @done="phase = 'desktop'" />
    <Desktop v-else />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
