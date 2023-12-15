<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}>();
</script>
<template>
  <a-button class="home-btn" @click="() => onClick()" :disabled="disabled">
    <h3>{{ title }}</h3>
    <h5>{{ description }}</h5>
  </a-button>
</template>
<style scoped>
.home-btn {
  padding: 1rem;
  height: 100%;
  white-space: break-spaces;
  border-color: hsl(51, 99%, 43%);
  border-radius: 0.25rem;
}

.home-btn:hover {
  border-color: hsl(51, 99%, 43%);
  background-color: hsl(51, 100%, 83%);
}

.home-btn:disabled {
  background-color: rgb(214, 214, 214);
}
</style>
