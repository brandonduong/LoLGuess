<script setup lang="ts">
import Profile from "../components/Profile/index.vue";
defineProps<{ sub: string }>();
</script>

<template>
  <div class="main">
    <Profile :sub="sub" :key="sub" />
  </div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}
</style>
