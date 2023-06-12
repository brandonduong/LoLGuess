<script setup lang="ts">
const props = defineProps<{
  title: string;
  value: string;
}>();
</script>
<template>
  <div class="stat">
    <h2>{{ title }}</h2>
    <h3>{{ value }}</h3>
  </div>
</template>
<style scoped>
.stat {
  display: flex;
}
</style>
