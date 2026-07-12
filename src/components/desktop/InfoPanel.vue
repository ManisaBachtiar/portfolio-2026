<script setup lang="ts">
import DesktopWindowChrome from './DesktopWindowChrome.vue'
import ImageWithFallback from '../ImageWithFallback.vue'
import { aboutMe, skillGroups, projects, hobbies } from '../../data/menuContent'

const props = defineProps<{ activeKey: 'about' | 'skills' | 'projects' | 'hobbies' }>()
defineEmits<{ close: [] }>()

const titles: Record<string, string> = {
  about: 'About Me',
  skills: 'My Skill',
  projects: 'My Project',
  hobbies: 'My Hobby',
}
</script>

<template>
  <DesktopWindowChrome
    :title="titles[props.activeKey]"
    width="min(90vw, 560px)"
    height="min(78vh, 520px)"
    variant="primary"
    @close="$emit('close')"
  >
    <div class="panel-body">
      <div v-if="activeKey === 'about'" class="about">
        <div class="avatar"><ImageWithFallback :src="aboutMe.avatarSrc" alt="Avatar" shape="circle" /></div>
        <h2>{{ aboutMe.name }}</h2>
        <p class="tagline">{{ aboutMe.tagline }}</p>
        <p class="location">{{ aboutMe.location }}</p>
        <p v-for="(p, i) in aboutMe.bio" :key="i" class="bio">{{ p }}</p>
      </div>

      <div v-else-if="activeKey === 'skills'" class="skills">
        <div v-for="group in skillGroups" :key="group.category" class="skill-group">
          <h3>{{ group.category }}</h3>
          <div class="tag-row">
            <span v-for="item in group.items" :key="item" class="tag">{{ item }}</span>
          </div>
        </div>
      </div>

      <div v-else-if="activeKey === 'projects'" class="projects">
        <article v-for="project in projects" :key="project.title" class="project-card">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="tag-row">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </article>
      </div>

      <div v-else-if="activeKey === 'hobbies'" class="hobbies">
        <article v-for="hobby in hobbies" :key="hobby.title" class="hobby-card">
          <h3>{{ hobby.title }}</h3>
          <p>{{ hobby.description }}</p>
        </article>
      </div>
    </div>
  </DesktopWindowChrome>
</template>

<style scoped>
.panel-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 22px 26px 28px;
}

/* About */
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
}

.avatar {
  width: 88px;
  height: 88px;
  margin-bottom: 8px;
}

.about h2 {
  font-size: 19px;
  font-weight: 700;
}

.tagline {
  color: var(--text-soft);
  font-size: 14px;
  max-width: 380px;
}

.location {
  font-size: 12.5px;
  color: var(--text-soft);
  opacity: 0.8;
  margin-bottom: 8px;
}

.bio {
  text-align: center;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--text);
  max-width: 420px;
}

/* Skills */
.skills {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.skill-group h3 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-soft);
  margin-bottom: 10px;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 12.5px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--bg-alt);
  color: var(--text);
}

/* Projects */
.projects {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.project-card {
  padding: 16px;
  border-radius: var(--radius-sm);
  background: var(--bg-alt);
}

.project-card h3 {
  font-size: 14.5px;
  font-weight: 700;
  margin-bottom: 6px;
}

.project-card p {
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.55;
  margin-bottom: 10px;
}

/* Hobbies */
.hobbies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.hobby-card {
  padding: 14px;
  border-radius: var(--radius-sm);
  background: var(--bg-alt);
}

.hobby-card h3 {
  font-size: 13.5px;
  font-weight: 700;
  margin-bottom: 4px;
}

.hobby-card p {
  font-size: 12.5px;
  color: var(--text-soft);
  line-height: 1.5;
}
</style>
