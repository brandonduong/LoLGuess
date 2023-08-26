<script setup lang="ts">
import router from "@/router";

router.push({ path: "/404" });
</script>

<template>
  <div class="main">404 Not Found</div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}
</style>
