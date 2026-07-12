<script setup lang="ts">
withDefaults(
  defineProps<{
    type: 'search' | 'love' | 'rating' | 'nav' | 'social' | 'photo' | 'sparkle' | 'ring' | 'heart' | 'flower' | 'chatbubble'
    text?: string
  }>(),
  { text: 'Start living your life okay..' },
)
</script>

<template>
  <div class="chip" :class="type">
    <template v-if="type === 'search'">
      <svg class="chip-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" stroke="#b9432f" stroke-width="2" />
        <path d="M20 20l-4.6-4.6" stroke="#b9432f" stroke-width="2" stroke-linecap="round" />
      </svg>
      <span class="chip-text search-text">Search..</span>
    </template>

    <template v-else-if="type === 'love'">
      <svg class="chip-icon" viewBox="0 0 24 24" fill="#e0262b" aria-hidden="true">
        <path
          d="M12 20.5s-7.6-4.6-10-9.3C.4 8 2 4.5 5.6 4c2-.3 3.9.6 5 2.3a5.6 5.6 0 0 1 5-2.3C19.2 4.5 20.8 8 20 11.2c-2.4 4.7-8 9.3-8 9.3Z"
        />
      </svg>
      <span class="chip-text love-text">LOVE</span>
    </template>

    <template v-else-if="type === 'rating'">
      <button type="button" class="rate-btn" tabindex="-1">
        <svg viewBox="0 0 24 24" fill="none"><path d="M8 10v9H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Zm2 9h7.6a2 2 0 0 0 2-1.6l1.2-6A2 2 0 0 0 18.8 9H14l.7-3.4A1.8 1.8 0 0 0 13 3.4L10 10v9Z" fill="#2b2621"/></svg>
      </button>
      <span class="rate-divider" />
      <button type="button" class="rate-btn" tabindex="-1">
        <svg viewBox="0 0 24 24" fill="none"><path d="M16 14V5h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-3Zm-2-9H6.4a2 2 0 0 0-2 1.6l-1.2 6A2 2 0 0 0 5.2 15H10l-.7 3.4A1.8 1.8 0 0 0 13 20.6L16 14V5Z" fill="#2b2621"/></svg>
      </button>
    </template>

    <template v-else-if="type === 'nav'">
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-7.5Z" fill="#2b2621"/></svg>
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6" stroke="#2b2621" stroke-width="1.8"/><path d="M19 19l-4-4" stroke="#2b2621" stroke-width="1.8" stroke-linecap="round"/></svg>
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><path d="M6 3h12v18l-6-4-6 4V3Z" fill="#2b2621"/></svg>
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#e0262b"/><path d="M12 8v8M8 12h8" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="12" r="2.4" fill="#2b2621"/><circle cx="18" cy="6" r="2.4" fill="#2b2621"/><circle cx="18" cy="18" r="2.4" fill="#2b2621"/><path d="M8.2 10.8 15.8 7M8.2 13.2l7.6 3.8" stroke="#2b2621" stroke-width="1.6"/></svg>
    </template>

    <template v-else-if="type === 'social'">
      <a
        class="social-link"
        href="https://www.instagram.com/miiysa__"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram: @miiysa__"
        @pointerdown.stop
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="#2b2621" stroke-width="1.8" />
          <circle cx="12" cy="12" r="4" stroke="#2b2621" stroke-width="1.8" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="#2b2621" />
        </svg>
        <span class="social-tooltip">@miiysa__</span>
      </a>
      <a
        class="social-link"
        href="https://www.behance.net/manisabachtiar"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Behance: manisabachtiar"
        @pointerdown.stop
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <text x="12" y="17" text-anchor="middle" font-size="14" font-weight="700" fill="#2b2621" font-family="-apple-system, sans-serif">Be</text>
        </svg>
        <span class="social-tooltip">manisabachtiar</span>
      </a>
      <a
        class="social-link"
        href="https://github.com/ManisaBachtiar"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub: ManisaBachtiar"
        @pointerdown.stop
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="#2b2621" aria-hidden="true">
          <path
            d="M12 2.2c-5.5 0-10 4.5-10 10 0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.6 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.5 0-5.5-4.5-10-10-10Z"
          />
        </svg>
        <span class="social-tooltip">ManisaBachtiar</span>
      </a>
    </template>

    <template v-else-if="type === 'photo'">
      <img class="photo-thumb" src="/photos/walpaper.jpg" alt="" />
      <span class="photo-heart">
        <svg viewBox="0 0 24 24" fill="#e0262b"><path d="M12 20.5s-7.6-4.6-10-9.3C.4 8 2 4.5 5.6 4c2-.3 3.9.6 5 2.3a5.6 5.6 0 0 1 5-2.3C19.2 4.5 20.8 8 20 11.2c-2.4 4.7-8 9.3-8 9.3Z"/></svg>
      </span>
    </template>

    <template v-else-if="type === 'sparkle'">
      <svg class="sparkle-icon" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path d="M12 2c.6 4.4 2.1 6.9 6.5 7.5-4.4.6-5.9 3.1-6.5 7.5-.6-4.4-2.1-6.9-6.5-7.5C9.9 8.9 11.4 6.4 12 2Z" />
        <path d="M19.5 15c.3 2 .9 3.1 2.9 3.4-2 .3-2.6 1.4-2.9 3.4-.3-2-.9-3.1-2.9-3.4 2-.3 2.6-1.4 2.9-3.4Z" />
      </svg>
    </template>

    <template v-else-if="type === 'ring'">
      <svg class="ring-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 4" />
      </svg>
    </template>

    <template v-else-if="type === 'heart'">
      <svg class="heart-icon" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path
          d="M12 20.5s-7.6-4.6-10-9.3C.4 8 2 4.5 5.6 4c2-.3 3.9.6 5 2.3a5.6 5.6 0 0 1 5-2.3C19.2 4.5 20.8 8 20 11.2c-2.4 4.7-8 9.3-8 9.3Z"
        />
      </svg>
    </template>

    <template v-else-if="type === 'flower'">
      <svg class="flower-icon" viewBox="0 0 24 24" aria-hidden="true">
        <g fill="#e0262b">
          <circle cx="12" cy="6.2" r="4" />
          <circle cx="17.8" cy="9.8" r="4" />
          <circle cx="15.6" cy="16.3" r="4" />
          <circle cx="8.4" cy="16.3" r="4" />
          <circle cx="6.2" cy="9.8" r="4" />
        </g>
        <circle cx="12" cy="12" r="2.6" fill="#ffd64a" />
      </svg>
    </template>

    <template v-else>
      <p class="bubble-text">{{ text }}</p>
    </template>
  </div>
</template>

<style scoped>
.chip {
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: var(--shadow-md), 0 0 0 1px rgba(255, 255, 255, 0.4);
  user-select: none;
}

.search {
  gap: 14px;
  margin: 50px 0 0 0;
  width: clamp(230px, 20vw, 290px);
  padding: 18px 26px;
  border-radius: 999px;
}

.search .chip-icon {
  width: 26px;
  height: 26px;
}

.search-text {
  font-size: 19px;
  font-weight: 500;
  color: #9a9088;
}

.chip-icon {
  width: 20px;
  height: 20px;
  flex: none;
}

.love {
  gap: 8px;
  padding: 12px 22px;
  border-radius: 999px;
}

.love .chip-icon {
  width: 22px;
  height: 22px;
}

.love-text {
  font-size: 16px;
  font-weight: 700;
  color: #e0262b;
  letter-spacing: 0.5px;
}

.rating {
  gap: 0;
  padding: 6px;
  border-radius: 999px;
}

.rate-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: none;
  cursor: var(--cursor-arrow);
}

.rate-btn svg {
  width: 20px;
  height: 20px;
}

.rate-divider {
  width: 1px;
  height: 22px;
  background: var(--border-soft);
}

.nav,
.social {
  gap: clamp(12px, 1.8vw, 18px);
  padding: 10px 20px;
  border-radius: 999px;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex: none;
}

.social-link {
  position: relative;
  display: flex;
  cursor: var(--cursor-arrow);
}

.social-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 4px 9px;
  border-radius: 6px;
  background: #2b2621;
  color: #fff;
  font-size: 10.5px;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.social-link:hover .social-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.photo {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 16px;
  padding: 0;
}

.photo-thumb {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
}

.photo-heart {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-heart svg {
  width: 13px;
  height: 13px;
}

.sparkle,
.ring,
.heart,
.flower {
  background: none;
  box-shadow: none;
}

.sparkle-icon {
  width: clamp(18px, 2vw, 26px);
  height: clamp(18px, 2vw, 26px);
  filter: drop-shadow(0 2px 4px rgba(20, 16, 12, 0.3));
}

.ring-icon {
  width: clamp(30px, 3.4vw, 42px);
  height: clamp(30px, 3.4vw, 42px);
  opacity: 0.6;
}

.heart-icon {
  width: clamp(16px, 1.8vw, 22px);
  height: clamp(16px, 1.8vw, 22px);
  filter: drop-shadow(0 2px 4px rgba(20, 16, 12, 0.3));
}

.flower-icon {
  width: clamp(16px, 1.7vw, 22px);
  height: clamp(16px, 1.7vw, 22px);
  filter: drop-shadow(0 2px 4px rgba(20, 16, 12, 0.3));
}

.chatbubble {
  max-width: clamp(150px, 15vw, 190px);
  padding: 10px 14px;
  border-radius: 14px 14px 14px 3px;
}

.bubble-text {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.35;
  color: #2b2621;
}

@media (max-width: 480px) {
  .nav,
  .social {
    gap: 8px;
    padding: 6px 12px;
  }

  .nav-icon {
    width: 15px;
    height: 15px;
  }
}
</style>
