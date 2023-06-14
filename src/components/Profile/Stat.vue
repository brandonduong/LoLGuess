<script setup lang="ts">
const props = defineProps<{
  title: string;
  value: string;
}>();
</script>
<template>
  <div class="stat">
    <h3>{{ title }}</h3>
    <h4>{{ value }}</h4>
  </div>
</template>
<style scoped>
.stat {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.stat > h3 {
  margin: 0;
}
.stat > h4 {
  margin: 0;
  white-space: nowrap;
}
</style>
