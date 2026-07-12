<script setup lang="ts">
withDefaults(
  defineProps<{
    type: 'calendar' | 'weather' | 'notifications'
  }>(),
  {},
)
</script>

<template>
  <div class="widget" :class="type">
    <template v-if="type === 'calendar'">
      <div class="cal-header">SAT</div>
      <div class="cal-date">14</div>
      <div class="cal-month">JULY</div>
    </template>

    <template v-else-if="type === 'weather'">
      <div class="weather-top">
        <span class="weather-place">Jakarta</span>
        <svg class="weather-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="13" cy="13" r="6" fill="#ffcf4d" />
          <path
            d="M9 24c-2.76 0-5-2.13-5-4.76 0-2.34 1.75-4.29 4.06-4.68C8.6 11.5 11.3 9.4 14.5 9.4c3.75 0 6.8 2.76 7.2 6.32 2.5.4 4.3 2.42 4.3 4.75 0 2.63-2.24 4.76-5 4.76H9Z"
            fill="#ffffff"
          />
        </svg>
      </div>
      <div class="weather-temp">29°</div>
      <div class="weather-cond">Partly Cloudy</div>
    </template>

    <template v-else>
      <span class="notif-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4c-2.76 0-4.5 2-4.5 4.8v2.6c0 .6-.24 1.2-.7 1.6l-.85.85c-.55.55-.17 1.5.6 1.5h10.9c.77 0 1.15-.95.6-1.5l-.85-.85c-.46-.4-.7-1-.7-1.6V8.8C16.5 6 14.76 4 12 4Z"
            fill="#fff"
          />
          <path d="M10.1 16.5a1.9 1.9 0 0 0 3.8 0h-3.8Z" fill="#fff" />
        </svg>
      </span>
      <div class="notif-body">
        <div class="notif-title">Notifications</div>
        <div class="notif-preview">You have 3 new notifications</div>
      </div>
      <span class="notif-time">now</span>
    </template>
  </div>
</template>

<style scoped>
.widget {
  border-radius: 18px;
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(255, 255, 255, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
}

.calendar {
  width: clamp(84px, 8vw, 104px);
  aspect-ratio: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.cal-header {
  width: 100%;
  text-align: center;
  background: #e0262b;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 4px 0;
}

.cal-date {
  font-size: clamp(28px, 3.2vw, 36px);
  font-weight: 700;
  color: #2b2621;
  line-height: 1.1;
  margin-top: 4px;
}

.cal-month {
  font-size: 10px;
  font-weight: 600;
  color: #9a9088;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.weather {
  width: clamp(130px, 12vw, 160px);
  padding: 12px 14px;
  background: linear-gradient(160deg, #6fb6ff, #2f7fe0);
  color: #fff;
}

.weather-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.weather-place {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.9;
}

.weather-icon {
  width: 22px;
  height: 22px;
}

.weather-temp {
  font-size: 28px;
  font-weight: 700;
  margin-top: 2px;
}

.weather-cond {
  font-size: 10.5px;
  font-weight: 500;
  opacity: 0.85;
  margin-top: 2px;
}

.notifications {
  width: clamp(190px, 18vw, 230px);
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(30, 28, 26, 0.92);
}

.notif-icon {
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: #e0262b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notif-icon svg {
  width: 15px;
  height: 15px;
}

.notif-body {
  flex: 1;
  min-width: 0;
}

.notif-title {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}

.notif-preview {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notif-time {
  flex: none;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
