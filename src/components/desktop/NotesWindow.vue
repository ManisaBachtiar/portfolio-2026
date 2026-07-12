<script setup lang="ts">
import { computed, ref } from 'vue'
import DesktopWindowChrome from './DesktopWindowChrome.vue'
import { notes } from '../../data/menuContent'

defineEmits<{ close: [] }>()

const selectedId = ref(notes[0]?.id ?? '')

const selectedNote = computed(() => notes.find((n) => n.id === selectedId.value) ?? notes[0])

function snippet(content: string) {
  return content.split('\n').find((line) => line.trim().length > 0) ?? ''
}
</script>

<template>
  <DesktopWindowChrome title="My Notes" width="min(92vw, 680px)" height="min(80vh, 520px)" variant="primary" @close="$emit('close')">
    <div class="notes-layout">
      <aside class="notes-sidebar">
        <button
          v-for="note in notes"
          :key="note.id"
          type="button"
          class="note-row"
          :class="{ active: note.id === selectedId }"
          @click="selectedId = note.id"
        >
          <span class="note-title">{{ note.title }}</span>
          <span class="note-meta">
            <span class="note-date">{{ note.date }}</span>
            <span class="note-snippet">{{ snippet(note.content) }}</span>
          </span>
        </button>
      </aside>
      <section class="notes-preview">
        <template v-if="selectedNote">
          <h2 class="preview-title">{{ selectedNote.title }}</h2>
          <span class="preview-date">{{ selectedNote.date }}</span>
          <p class="preview-content">{{ selectedNote.content }}</p>
        </template>
      </section>
    </div>
  </DesktopWindowChrome>
</template>

<style scoped>
.notes-layout {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: row;
}

.notes-sidebar {
  flex: none;
  width: 38%;
  max-width: 220px;
  min-height: 0;
  overflow-y: auto;
  border-right: 1px solid var(--border-soft);
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.015);
}

.note-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  padding: 9px 14px;
  cursor: var(--cursor-arrow);
  border-bottom: 1px solid var(--border-soft);
  color: inherit;
  font: inherit;
}

.note-row:hover {
  background: rgba(43, 38, 33, 0.05);
}

.note-row.active {
  background: rgba(255, 214, 74, 0.28);
}

.note-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.note-meta {
  display: flex;
  gap: 6px;
  font-size: 11.5px;
  color: var(--text-soft);
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
}

.note-date {
  flex: none;
}

.note-snippet {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notes-preview {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  padding: 22px 26px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
}

.preview-date {
  font-size: 12px;
  color: var(--text-soft);
  margin-bottom: 14px;
}

.preview-content {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--text);
  white-space: pre-wrap;
}

@media (max-width: 560px) {
  .notes-sidebar {
    max-width: 130px;
  }
}
</style>
