<script setup lang="ts">
const props = defineProps<{
  rank: string;
}>();
</script>
<template>
  <img
    class="rank-icon"
    :src="`/${rank.toLowerCase()}.png`"
    :alt="rank"
    :title="rank"
  />
</template>
<style scoped>
.rank-icon {
  width: 1.75rem;
  height: 1.75rem;
  margin-left: 0.5rem;
  margin-top: -0.5rem;
}
</style>
