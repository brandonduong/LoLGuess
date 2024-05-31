<script setup lang="ts">
import { ref, watch } from "vue";
import CustomGraph from "./CustomGraph.vue";

const props = defineProps<{
  scores: number[][];
  labels: string[];
}>();

const data = ref(calculateData());

function calculateData() {
  const copy = [...props.scores];
  const dataset: {
    label: string;
    backgroundColor: string[];
    data: number[];
  }[] = [];
  const labels: string[] = [];

  for (let i = 0; i < copy.length; i++) {
    labels.push(props.labels[i]);
    const data: number[] = [];
    const backgroundColor: string[] = [];
    for (let o = 0; o < copy.length; o++) {
      data.push(copy[o][i]);
      backgroundColor.push(i === o ? "rgb(200, 155, 60)" : "#2d9eca");
    }

    dataset.push({
      label: props.labels[i],
      backgroundColor,
      data,
    });
  }

  return {
    labels: labels,
    datasets: dataset,
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
  <CustomGraph :data="data" type="Bar" />
</template>
