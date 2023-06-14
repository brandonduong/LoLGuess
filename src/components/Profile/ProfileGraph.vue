<script setup lang="ts">
import { ref } from "vue";
import type { Guess } from "@/API";
import { calculateScore } from "@/common/helper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

const props = defineProps<{
  guesses: Guess[];
}>();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const scoreData = ref<number[]>([]);
const maxScoreData = ref<number[]>([]);
const labels = ref<string[]>([]);

// Initialize data for graph
props.guesses.forEach((x: Guess) => {
  const [score, maxScore] = calculateScore(
    x.placements,
    x.guessedRank,
    x.rank,
    x.ranks
  );
  labels.value.push(x.createdAt.substring(0, 10));
  scoreData.value.push(score);
  maxScoreData.value.push(maxScore);
});

console.log(scoreData.value);
console.log(labels.value);

const data = {
  labels: labels.value,
  datasets: [
    {
      label: "Score",
      backgroundColor: "#f87979",
      data: scoreData.value,
    },
  ],
};
const options = {
  responsive: true,
};
</script>

<template>
  <div class="graph">
    <Line :data="data" :options="options" />
  </div>
</template>

<style scoped>
.graph {
  border: solid 1px lightslategray;
  padding: 1rem;
}
</style>
