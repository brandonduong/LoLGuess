<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  onClick: () => void;
}>();
</script>
<template>
  <button class="home-btn" @click="() => onClick()">
    <h3>{{ title }}</h3>
    <h5>{{ description }}</h5>
  </button>
</template>
<style scoped>
.home-btn {
  padding: 1rem;
}
</style>
