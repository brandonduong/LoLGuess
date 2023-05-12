<script setup lang="ts">
import { ref } from "vue";
import http from "../common/http-common";
import GroupSettings from "./GroupSettings.vue";
import DragAndDropTable from "./DragAndDropTable.vue";

const current = ref<number>(0);
const next = async () => {
  if (current.value === 1) {
    console.log("request for match");
    await getMatch().then(() => {
      current.value++;
    });
  } else {
    current.value++;
  }
};
const prev = () => {
  current.value--;
};
async function getMatch() {
  let url = "/getMatch?";
  for (let i = 0; i < selectedRegions.value.length; i++) {
    url += `regions[]=${selectedRegions.value[i]}&`;
  }
  for (let i = 0; i < selectedRanks.value.length; i++) {
    url += `ranks[]=${selectedRanks.value[i]}&`;
  }
  console.log(url);
  await http.get(url).then((res) => {
    console.log(res);
    rankedMatch = res.data.rankedMatch;
  });
}
const steps = [
  {
    title: "Regions",
  },
  {
    title: "Ranks",
  },
  {
    title: "Guess",
  },
];

const regions: string[] = [
  "BR",
  "EUNE",
  "EUW",
  "JP",
  "KR",
  "LAN",
  "LAS",
  "NA",
  "OCE",
  "TR",
  "RU",
  "PH",
  "SG",
  "TH",
  "TW",
  "VN",
];

const ranks: string[] = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Master",
  "Grandmaster",
  "Challenger",
];
const selectedRegions = ref<string[]>([]);
const selectedRanks = ref<string[]>([]);
const selectedGuess = ref<string[]>([]);
var rankedMatch = ref<object[]>([]);
</script>

<template>
  <div>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <div v-if="current === 0">
        <h1>Pick Possible Regions</h1>
        <GroupSettings
          :options="regions"
          :selected-options="selectedRegions"
          @update-selected-options="selectedRegions = $event"
        />
      </div>
      <div v-if="current === 1">
        <h1>Pick Possible Ranks</h1>
        <GroupSettings
          :options="ranks"
          :selected-options="selectedRanks"
          @update-selected-options="selectedRanks = $event"
        />
      </div>
      <div v-if="current === 2">
        <h1>Guess</h1>
        <DragAndDropTable :rankedMatch="rankedMatch" />
      </div>
    </div>
    <div class="steps-action">
      <a-button
        v-if="current < steps.length"
        type="primary"
        @click="next"
        :disabled="
          (selectedRegions.length === 0 && current === 0) ||
          (selectedRanks.length === 0 && current === 1) ||
          (selectedGuess.length === 0 && current === 2)
        "
        >{{
          current === 0 ? "Next" : current === 1 ? "Play" : "Guess"
        }}</a-button
      >
      <a-button
        v-if="current > 0 && current < steps.length - 1"
        style="margin-left: 8px"
        @click="prev"
        >Previous</a-button
      >
    </div>
  </div>
</template>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 1.5rem;
}

.steps-action {
  margin-top: 24px;
}

[data-theme="dark"] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
