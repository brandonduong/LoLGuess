<script setup lang="ts">
import ProfileStats from "../components/ProfileStats.vue";
</script>

<template>
  <div class="main">
    This is profile view

    <ProfileStats />
  </div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}
</style>
