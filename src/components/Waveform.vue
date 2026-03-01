<template>
  <div class="wave">
    <svg viewBox="0 0 300 60" preserveAspectRatio="none">
      <path
        class="wave-path"
        :class="{ playing }"
        d="M0 30 Q 25 10 50 30 T 100 30 T 150 30 T 200 30 T 250 30 T 300 30"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{ playing: boolean }>()
</script>

<style scoped>
.wave {
  height: 54px;
  width: 240px;
  opacity: 0.95;
}
svg { width: 100%; height: 100%; }
.wave-path {
  fill: none;
  stroke: rgba(255,255,255,0.9);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.45;
}
.wave-path.playing {
  opacity: 1;
  animation: float 1.25s ease-in-out infinite;
}
@keyframes float {
  0%   { transform: translateY(0px) }
  50%  { transform: translateY(-6px) }
  100% { transform: translateY(0px) }
}
</style>
