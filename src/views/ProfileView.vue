<script setup lang="ts">
import Profile from "../components/Profile/index.vue";
defineProps<{ sub: string }>();
</script>

<template>
  <div style="padding: 1rem 0">
    <Profile :sub="sub" />
  </div>
</template>

<style scoped></style>
