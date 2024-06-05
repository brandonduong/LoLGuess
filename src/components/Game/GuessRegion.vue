<script setup lang="ts">
const props = defineProps<{
  region: string;
}>();
</script>
<template>
  <div class="region-div">
    <p class="region">
      Region:
      <h4 style="display: inline-block; margin: 0">{{ props.region }}</h4>
    </p>
  </div>
</template>
<style scoped>
.region {
  margin: 0;
  white-space: nowrap;
}
</style>
