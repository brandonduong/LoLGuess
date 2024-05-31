<script setup lang="ts">
import {
  Chart,
  type ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
defineProps<{ data: ChartData<"line"> }>();

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
Chart.defaults.font.family = "spiegelregular";
Chart.defaults.color = "rgb(240, 230, 210)";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      border: {
        display: true,
        color: "#3c3c41",
      },
      grid: {
        display: true,
        color: "#3c3c41",
      },
    },
    y: {
      border: {
        display: true,
        color: "#3c3c41",
      },
      grid: {
        display: true,
        color: "#3c3c41",
      },
    },
  },
};
</script>
<template>
  <Line :data="data" :options="options" />
</template>
