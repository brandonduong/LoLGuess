<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { calculateScore } from "@/common/helper";
import CustomLineGraph from "./CustomLineGraph.vue";
import type { Guess } from "@/API";

const props = defineProps<{
  guesses: Guess[];
}>();

const data = ref(calculateData(props.guesses));

function calculateData(newData: Guess[]) {
  const copy = [...newData];
  const scoreData: number[] = [];
  const maxScoreData: number[] = [];
  const labels: string[] = [];

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
      labels.push(
        new Date(x.createdAt).toLocaleString("default", {
          month: "short",
          day: "numeric",
        })
      );
      scoreData.push(score);
      maxScoreData.push(maxScore);
    });

  return {
    labels: labels,
    datasets: [
      {
        label: "Max Score",
        borderColor: "rgb(200, 155, 60)",
        backgroundColor: "rgb(200, 155, 60)",
        data: maxScoreData,
      },
      {
        label: "Score",
        borderColor: "#2d9eca",
        backgroundColor: "#2d9eca",
        data: scoreData,
      },
      {
        label: "Deficit",
        borderColor: "#084152",
        backgroundColor: "#084152",
        data: maxScoreData.map((item, index) => item - scoreData[index]),
      },
    ],
  };
}
watch(
  () => props.guesses,
  (newData) => {
    data.value = calculateData(newData);
  },
  { deep: true }
);
</script>
<template>
  <CustomLineGraph :data="data" />
</template>
