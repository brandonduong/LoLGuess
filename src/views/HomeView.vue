<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
</script>

<template>
  <div class="main">
    <h1>This is the main page</h1>
    <TheWelcome />
  </div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}
</style>
