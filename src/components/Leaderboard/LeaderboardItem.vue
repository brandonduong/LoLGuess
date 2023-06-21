<script setup lang="ts">
import type { User } from "@/API";

const props = defineProps<{
  user: User;
  rank: number;
}>();
</script>

<template>
  <RouterLink :to="`/profile/${user.id}`">
    <div class="leaderboard-item">
      <h3>{{ rank }}</h3>
      <h3>{{ user.username }}</h3>
      <h3>{{ user.score }} / {{ user.maxScore }}</h3>
      <h3>{{ user.correctPlacements }}</h3>
      <h3>{{ user.correctRanks }}</h3>
    </div>
  </RouterLink>
</template>

<style scoped>
.leaderboard-item {
  display: grid;
  border-bottom: solid 1px lightslategray;
  border-left: solid 1px lightslategray;
  border-right: solid 1px lightslategray;
  padding: 1rem 0;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
}

.leaderboard-item:hover {
  background-color: rgb(216, 222, 235);
  transition: 0.2s;
}

.leaderboard-item > h3 {
  margin: 0;
}
</style>
