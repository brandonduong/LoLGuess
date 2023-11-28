<script setup lang="ts">
import GameSettings from "../components/Game/GameSettings.vue";
defineProps<{ guessId: string }>();
</script>

<template>
  <div class="main">
    <GameSettings :guessId="guessId" />
  </div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}
</style>
