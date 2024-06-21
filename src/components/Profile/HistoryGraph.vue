<script setup lang="ts">
import { ref, watch } from "vue";
import { calculateScore } from "@/common/helper";
import CustomGraph from "./CustomGraph.vue";
import type { DailyGuess, Guess } from "@/API";
import { ALL, HIGH, LOW } from "@/common/constants";

const props = defineProps<{
  guesses: Guess[] | DailyGuess[];
}>();

const data = ref(calculateData(props.guesses));

function calculateData(newData: Guess[] | DailyGuess[]) {
  const copy = [...newData];
  const scoreData: number[] = [];
  const maxScoreData: number[] = [];
  const labels: string[] = [];

  // Initialize data for graph
  copy
    .sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0
    )
    .forEach((x: Guess | DailyGuess) => {
      let ranks;
      if ("ranks" in x) {
        ranks = x.ranks;
      } else {
        ranks = x.category === "low" ? LOW : x.category === "high" ? HIGH : ALL;
      }
      const [score, maxScore] = calculateScore(
        x.placements,
        x.guessedRank,
        x.rank,
        ranks
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
  <CustomGraph :data="data" type="Line" />
</template>
