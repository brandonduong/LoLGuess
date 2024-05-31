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
  BarElement,
} from "chart.js";
import { Bar, Line } from "vue-chartjs";

enum GraphType {
  Line,
  Bar,
}

const props = defineProps<{
  data: ChartData<"line"> | ChartData<"bar">;
  type: keyof typeof GraphType;
}>();

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
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
  plugins: {
    legend: {
      display: props.type !== "Bar",
    },
  },
};
</script>
<template>
  <Line
    v-if="type === 'Line'"
    :data="data as ChartData<'line'>"
    :options="options"
  />
  <Bar
    v-if="type === 'Bar'"
    :data="data as ChartData<'bar'>"
    :options="options"
  />
</template>
