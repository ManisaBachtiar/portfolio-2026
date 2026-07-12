<script setup lang="ts">
defineEmits<{ close: []; zoom: [] }>()
</script>

<template>
  <div class="traffic-lights">
    <button type="button" class="light red" aria-label="Close window" @click="$emit('close')">
      <svg viewBox="0 0 8 8" class="glyph">
        <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#4d0000" stroke-width="1.1" stroke-linecap="round" />
      </svg>
    </button>
    <button type="button" class="light yellow" aria-label="Minimize window">
      <svg viewBox="0 0 8 8" class="glyph">
        <path d="M1.3 4h5.4" stroke="#5c4300" stroke-width="1.1" stroke-linecap="round" />
      </svg>
    </button>
    <button type="button" class="light green" aria-label="Zoom window" @click="$emit('zoom')">
      <svg viewBox="0 0 8 8" class="glyph">
        <path
          d="M1.4 3.1V1.4h1.7M6.6 4.9v1.7H4.9M1.4 1.4l2.2 2.2M6.6 6.6L4.4 4.4"
          stroke="#003d09"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.traffic-lights {
  display: flex;
  align-items: center;
  gap: 8px;
}

.light {
  position: relative;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: var(--cursor-arrow);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s var(--ease-out-soft), filter 0.2s ease;
}

.light.red {
  background: linear-gradient(180deg, #ff6a5f, #e4443a);
}

.light.yellow {
  background: linear-gradient(180deg, #ffc02f, #e5a723);
}

.light.green {
  background: linear-gradient(180deg, #38c94a, #22ab35);
}

.glyph {
  width: 7px;
  height: 7px;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.traffic-lights:hover .glyph {
  opacity: 1;
}

.light:hover {
  filter: brightness(1.08);
}

.light:active {
  transform: scale(0.88);
  filter: brightness(0.94);
}

@media (hover: none) {
  .glyph {
    opacity: 1;
  }
}
</style>
