<script setup lang="ts">
import GameSettings from "../components/Game/GameSettings.vue";
defineProps<{ matchId: string; rank: string }>();
</script>

<template>
  <div class="main">
    <GameSettings :matchId="matchId" :rank="rank" />
  </div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}
</style>
