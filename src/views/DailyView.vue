<script setup lang="ts">
import Daily from "../components/Daily/index.vue";
defineProps<{ date: string; category: string }>();
</script>

<template>
  <div class="main">
    <Daily :date="date" :category="category" />
  </div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}
</style>
