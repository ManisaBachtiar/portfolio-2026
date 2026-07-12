<script setup lang="ts">
import DockIcon from './DockIcon.vue'

withDefaults(defineProps<{ compact?: boolean; exiting?: boolean; openKeys?: string[] }>(), {
  compact: false,
  exiting: false,
  openKeys: () => [],
})

defineEmits<{ open: [key: string] }>()

const folderItems = [
  { key: 'about', label: 'About Me' },
  { key: 'skills', label: 'My Skill' },
  { key: 'projects', label: 'My Project' },
  { key: 'hobbies', label: 'My Hobby' },
  { key: 'notes', label: 'My Notes' },
]
</script>

<template>
  <nav class="dock" :class="{ exiting }" aria-label="Dock">
    <ul class="dock-list">
      <li v-for="item in folderItems" :key="item.key">
        <DockIcon :label="item.label" :active="openKeys.includes(item.key)" @click="$emit('open', item.key)" />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.dock {
  position: absolute;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  max-width: calc(100vw - 24px);
  padding: 10px 16px;
  border-radius: 24px;
  background: #fff;
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(255, 255, 255, 0.4);
  z-index: 50;
  transition: transform 0.55s var(--ease-out-soft), opacity 0.5s ease;
}

.dock.exiting {
  transform: translateX(-50%) translateY(140%);
  opacity: 0;
}

.dock-list {
  display: flex;
  align-items: flex-end;
  gap: clamp(8px, 1.4vw, 16px);
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (prefers-reduced-motion: reduce) {
  .dock {
    transition: opacity 0.4s ease;
  }
}

@media (max-width: 480px) {
  .dock {
    padding: 8px 10px;
  }

  .dock-list {
    gap: clamp(4px, 2vw, 8px);
  }
}
</style>
