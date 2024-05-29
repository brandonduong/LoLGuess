<script setup lang="ts">
import Game from "../components/Game/index.vue";
defineProps<{ guessId: string }>();
</script>

<template>
  <Game :guessId="guessId" />
</template>

<style scoped></style>
