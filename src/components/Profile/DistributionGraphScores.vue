<script setup lang="ts">
import { ref, watch } from "vue";
import CustomLineGraph from "./CustomGraph.vue";

const props = defineProps<{
  scores: number[];
  labels: string[];
  label: string;
  highlight?: number;
}>();
const backgroundColor = ref<string[]>(calculateColors());
const data = ref(calculateData());
function calculateData() {
  const copy = [...props.scores];
  const scoreData: number[] = [];
  const labels: string[] = [];

  // Initialize data for graph
  copy.forEach((x, ind) => {
    labels.push(props.labels[ind]);
    scoreData.push(x);
  });

  return {
    labels: labels,
    datasets: [
      {
        label: props.label,
        borderColor: "#2d9eca",
        backgroundColor: backgroundColor.value,
        data: scoreData,
      },
    ],
  };
}

function calculateColors() {
  const newColors = new Array(props.labels.length).fill("#2d9eca");
  if (props.highlight) {
    newColors[props.highlight] = "rgb(200, 155, 60)";
  }
  return newColors;
}
watch(
  () => props.scores,
  () => {
    data.value = calculateData();
    backgroundColor.value = calculateColors();
  }
);
</script>
<template>
  <CustomLineGraph :data="data" type="Bar" />
</template>
