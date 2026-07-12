<script setup lang="ts">
withDefaults(
  defineProps<{
    type: 'figma' | 'photoshop' | 'illustrator' | 'vscode' | 'aftereffects' | 'os'
    label: string
  }>(),
  {},
)
</script>

<template>
  <div class="app-icon">
    <span class="app-tooltip" role="tooltip">{{ label }}</span>
    <span class="glyph">
      <svg v-if="type === 'figma'" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="40" height="40" rx="9" fill="#2b2621" />
        <path d="M20 24a4 4 0 0 1 4-4v8a4 4 0 0 1-4-4Z" fill="#1abcfe" />
        <path d="M16 16a4 4 0 0 1 4-4h4v8h-4a4 4 0 0 1-4-4Z" fill="#0acf83" />
        <path d="M16 24a4 4 0 0 1 4-4h4v8h-4a4 4 0 0 1-4-4Z" fill="#a259ff" />
        <path d="M16 32a4 4 0 0 1 4-4h4a4 4 0 1 1 0 8h-4a4 4 0 0 1-4-4Z" fill="#f24e1e" />
        <path d="M28 16a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" fill="#ff7262" />
      </svg>

      <svg v-else-if="type === 'photoshop'" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="40" height="40" rx="9" fill="#001e36" />
        <text x="24" y="30" text-anchor="middle" font-size="17" font-weight="700" fill="#31a8ff" font-family="-apple-system, sans-serif">Ps</text>
      </svg>

      <svg v-else-if="type === 'illustrator'" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="40" height="40" rx="9" fill="#330000" />
        <text x="24" y="30" text-anchor="middle" font-size="17" font-weight="700" fill="#ff7c00" font-family="-apple-system, sans-serif">Ai</text>
      </svg>

      <svg v-else-if="type === 'vscode'" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="40" height="40" rx="9" fill="#1e1e1e" />
        <path
          d="M31.5 8.5 18 20 12 15.4 8.7 17l7 7-7 7 3.3 1.6L18 28l13.5 11.5 6-2.9V11.4l-6-2.9Zm0 8.9v13.2L21.6 24l9.9-6.6Z"
          fill="#3ba6ff"
        />
      </svg>

      <svg v-else-if="type === 'aftereffects'" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="40" height="40" rx="9" fill="#00005b" />
        <text x="24" y="30" text-anchor="middle" font-size="16" font-weight="700" fill="#9999ff" font-family="-apple-system, sans-serif">Ae</text>
      </svg>

      <svg v-else viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="40" height="40" rx="9" fill="#1c1a18" />
        <g transform="translate(11 5) scale(1.55)" fill="#fff">
          <path
            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.087 1.013 1.454 2.208 3.09 3.792 3.037 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09Z"
          />
          <path
            d="M15.567 3.779c.837-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.817-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.71-.688 3.56-1.701"
          />
        </g>
      </svg>
    </span>
  </div>
</template>

<style scoped>
.app-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(52px, 7vw, 68px);
  user-select: none;
}

.glyph {
  display: flex;
  width: clamp(32px, 4.6vw, 42px);
  aspect-ratio: 1;
  filter: drop-shadow(0 3px 6px rgba(20, 16, 12, 0.3));
  transition: transform 0.22s var(--ease-out-soft);
  transform-origin: bottom center;
}

.app-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 3px 7px;
  border-radius: 5px;
  background: #1c1a18;
  color: #fff;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.18s ease;
  z-index: 1;
}

.app-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #1c1a18;
}

@media (hover: hover) {
  .app-icon:hover .glyph {
    transform: translateY(-8px) scale(1.15);
  }

  .app-icon:hover .app-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
