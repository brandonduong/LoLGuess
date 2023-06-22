<script setup lang="ts">
const props = defineProps<{
  region: string;
}>();
</script>
<template>
  <div class="region-div">
    <h2 class="region">Region: {{ props.region }}</h2>
  </div>
</template>
<style scoped>
.region {
  margin: 0;
  white-space: nowrap;
  padding: 0 0.75rem;
}
</style>
