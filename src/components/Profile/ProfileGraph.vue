<script setup lang="ts">
import { ref } from "vue";
import type { Guess, User } from "@/API";
import CustomCard from "../CustomCard.vue";
import CustomSelect from "./CustomSelect.vue";
import HistoryGraph from "./HistoryGraph.vue";
import DistributionGraphScores from "./DistributionGraphScores.vue";
import DistributionGraph2D from "./DistributionGraph2D.vue";
import type { SelectProps } from "ant-design-vue";

const props = defineProps<{
  guesses: Guess[];
  user: User;
}>();

//console.log(props.guesses);

const selectOptions = ref<SelectProps["options"]>([
  {
    value: "freeplay",
    label: "Freeplay History",
  },
  {
    value: "daily",
    label: "Daily History",
  },
  {
    value: "scores",
    label: "Score Distribution",
  },
  {
    value: "ranks",
    label: "Rank Distribution",
  },
  {
    value: "placements",
    label: "Placement Distribution",
  },
]);
const value = ref("freeplay");
const graphGuesses = ref(props.guesses);

const distributionValues = ref<number[][]>([]);
const distributionLabels = ref<string[]>([]);

function changeGraph(newOption: string) {
  value.value = newOption;
  switch (newOption) {
    case "freeplay":
      graphGuesses.value = props.guesses.filter((g) => g.mode === undefined);
      break;
    case "daily":
      graphGuesses.value = props.guesses.filter((g) => g.mode === "daily");
      break;
    case "ranks":
      distributionValues.value = props.user.rankGuesses!.map(
        (r) => (r && r!.map((s) => s as number)) as number[]
      );
      distributionLabels.value = [
        "Iron",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Emerald",
        "Diamond",
        "Master",
        "Grandmaster",
        "Challenger",
      ];
      break;
    case "placements":
      distributionValues.value = props.user.placementGuesses!.map(
        (r) => (r && r!.map((s) => s as number)) as number[]
      );
      distributionLabels.value = [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
      ];
      break;
    default:
      break;
  }
}
</script>

<template>
  <CustomCard style="align-items: normal">
    <CustomSelect
      :options="selectOptions"
      :value="value"
      @update-option="(newOption: string) => changeGraph(newOption)"
    />
    <div v-if="value === 'freeplay' || value === 'daily'">
      <HistoryGraph :guesses="graphGuesses" />
    </div>
    <div v-else-if="value === 'scores'">
      <DistributionGraphScores :scores="user.scores!.map(s => s as number)" />
    </div>
    <div v-else-if="value === 'ranks' || value === 'placements'">
      <DistributionGraph2D
        :scores="distributionValues"
        :labels="distributionLabels"
      />
    </div>
  </CustomCard>
</template>

<style scoped></style>
