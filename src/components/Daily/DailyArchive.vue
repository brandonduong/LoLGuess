<script setup lang="ts">
import DailyButtons from "./DailyButtons.vue";

interface DailyGuess {
  placements: string[];
  rankedMatch: object[];
  rank: string;
  date: string;
  category: string;
  verifiedRank: string;
  region: string;
}

defineProps<{
  guessedBefore: (date: string, category: string) => void | DailyGuess;
}>();

function getDailyDates() {
  const startOfDailies = new Date("03/21/2024"); // Only support most recent set
  const dailies = [];
  const now = new Date();
  var date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  while (date >= startOfDailies) {
    console.log(date, startOfDailies);
    dailies.push(date.toISOString().split("T")[0]);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    console.log(date);
  }
  console.log(dailies);
  return dailies;
}
</script>

<template>
  <div v-for="d in getDailyDates()">
    <h4 style="text-align: end; margin: 0">
      <b>{{ d }}</b>
    </h4>
    <div class="buttons">
      <DailyButtons :guessed-before="guessedBefore" :date="d" />
    </div>
  </div>
</template>

<style scoped></style>
