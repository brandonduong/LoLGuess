<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
}>();
</script>
<template>
  <div class="stat">
    <h5>{{ title }}</h5>
    <p class="number">{{ value }}</p>
  </div>
</template>
<style scoped>
.stat {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.stat > h5 {
  margin: 0;
  text-align: start;
}
.stat > p {
  margin: 0;
  white-space: nowrap;
}
</style>
