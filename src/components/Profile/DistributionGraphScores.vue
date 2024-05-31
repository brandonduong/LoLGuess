<script setup lang="ts">
import { ref, watch } from "vue";
import CustomLineGraph from "./CustomGraph.vue";

const props = defineProps<{
  scores: number[];
}>();

const data = ref(calculateData());

function calculateData() {
  const copy = [...props.scores];
  const scoreData: number[] = [];
  const labels: string[] = [];

  // Initialize data for graph
  copy.forEach((x, ind) => {
    labels.push(ind.toString());
    scoreData.push(x);
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "Scores",
        borderColor: "#2d9eca",
        backgroundColor: "#2d9eca",
        data: scoreData,
      },
    ],
  };
}
watch(
  () => props.scores,
  () => {
    data.value = calculateData();
  }
);
</script>
<template>
  <CustomLineGraph :data="data" type="Bar" />
</template>
