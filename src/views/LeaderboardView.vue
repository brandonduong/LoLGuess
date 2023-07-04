<script setup lang="ts">
import Leaderboard from "../components/Leaderboard/Leaderboard.vue";
</script>

<template>
  <div class="leaderboard">
    <Leaderboard />
  </div>
</template>

<style>
.leaderboard {
  grid-column: span 2;
  border: solid 1px lightslategray;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: white;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
}
</style>
