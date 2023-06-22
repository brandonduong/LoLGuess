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

console.log(props.guesses);

const scoreData = ref<number[]>([]);
const maxScoreData = ref<number[]>([]);
const labels = ref<string[]>([]);
const copy = [...props.guesses];

// Initialize data for graph
copy
  .sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0
  )
  .forEach((x: Guess) => {
    const [score, maxScore] = calculateScore(
      x.placements,
      x.guessedRank,
      x.rank,
      x.ranks
    );
    labels.value.push(
      new Date(x.createdAt).toLocaleString("default", {
        month: "short",
        day: "numeric",
      })
    );
    scoreData.value.push(score);
    maxScoreData.value.push(maxScore);
  });

const data = {
  labels: labels.value,
  datasets: [
    {
      label: "Max Score",
      borderColor: "#99c2ff",
      backgroundColor: "#66a3ff",
      data: maxScoreData.value,
    },
    {
      label: "Score",
      borderColor: "#ff9999",
      backgroundColor: "#ff6666",
      data: scoreData.value,
    },
    {
      label: "Deficit",
      borderColor: "#cc99ff",
      backgroundColor: "#b366ff",
      data: maxScoreData.value.map(
        (item, index) => item - scoreData.value[index]
      ),
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: true,
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
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: white;
  display: flex;
  align-items: center;
}
</style>
