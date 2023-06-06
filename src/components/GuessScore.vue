<script setup lang="ts">
const props = defineProps<{
  verifiedRank: string;
  selectedRank: string;
  verifiedGuess: string[];
}>();
</script>
<template>
  <h2 class="score">Score:</h2>
</template>
<style scoped>
.score {
  margin: 0;
}
</style>
