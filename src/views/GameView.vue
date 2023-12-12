<script setup lang="ts">
import Game from "../components/Game/index.vue";
defineProps<{ guessId: string }>();
</script>

<template>
  <div class="main">
    <Game :guessId="guessId" />
  </div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}
</style>
