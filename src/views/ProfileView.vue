<script setup lang="ts">
import ProfileGraph from "@/components/Profile/ProfileGraph.vue";
import ProfileStats from "../components/Profile/ProfileStats.vue";
import ProfileHistory from "../components/Profile/ProfileHistory.vue";
</script>

<template>
  <div class="main profile">
    <ProfileStats />
    <ProfileGraph />
    <ProfileHistory />
  </div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}

.profile {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
}
</style>
