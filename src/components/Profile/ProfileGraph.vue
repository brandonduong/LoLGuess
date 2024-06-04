<script setup lang="ts">
import { ref } from "vue";
import type { Guess, User } from "@/API";
import CustomCard from "../CustomCard.vue";
import CustomInfo from "./CustomInfo.vue";
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
    label: "FREEPLAY",
    options: [
      {
        value: "freeplay",
        label: "Freeplay History",
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
      {
        value: "incorrectRankGuesses",
        label: "Incorrect Rank Guesses",
      },
      {
        value: "correctRankGuesses",
        label: "Correct Rank Guesses",
      },
    ],
  },
  {
    label: "DAILY",
    options: [
      {
        value: "daily",
        label: "Daily History",
      },
    ],
  },
]);
const value = ref("freeplay");
const graphGuesses = ref(props.guesses);
const graphInfo = ref("Freeplay guess scores");

const distributionValues = ref<number[][] | number[]>([]);
const distributionLabels = ref<string[]>([]);
const distributionLabel = ref<string>();

function changeGraph(newOption: string) {
  value.value = newOption;
  switch (newOption) {
    case "freeplay":
      graphGuesses.value = props.guesses.filter((g) => g.mode === undefined);
      graphInfo.value = "Freeplay guess scores";
      break;
    case "daily":
      graphGuesses.value = props.guesses.filter((g) => g.mode === "daily");
      graphInfo.value = "Daily guess scores";
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
      graphInfo.value =
        "Number of times rank X was guessed, grouped by the match's actual rank";
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
      graphInfo.value =
        "Number of times placement X was guessed, grouped by the actual placement";
      break;
    case "scores":
      distributionValues.value = props.user.scores!.map((s) => s as number);
      distributionLabels.value = props.user.scores!.map((s, ind) =>
        ind.toString()
      );
      distributionLabel.value = "# of occurences";
      graphInfo.value =
        "Number of times score X was achieved, up to the maximum of score 100";
      break;
    case "incorrectRankGuesses":
      distributionValues.value = props.user
        .correctPlacementGuesses!.map((s) => s as number)
        .slice(0, 9);
      distributionLabels.value = distributionValues.value.map((s, ind) =>
        ind.toString()
      );
      distributionLabel.value = "# of occurences";
      graphInfo.value =
        "Number of guesses where the guessed rank was incorrect and X number of placements were correct";
      break;
    case "correctRankGuesses":
      distributionValues.value = props.user
        .correctPlacementGuesses!.map((s) => s as number)
        .slice(9);
      distributionLabels.value = distributionValues.value.map((s, ind) =>
        ind.toString()
      );
      distributionLabel.value = "# of occurences";
      graphInfo.value =
        "Number of guesses where the guessed rank was correct and X number of placements were correct";
      break;
    default:
      break;
  }
}
</script>

<template>
  <CustomCard
    style="align-items: normal; justify-content: start; min-height: 300px"
  >
    <div style="display: flex; align-items: center; gap: 1rem">
      <CustomSelect
        :options="selectOptions"
        :value="value"
        @update-option="(newOption: string) => changeGraph(newOption)"
        style="flex-grow: 1; padding: 0"
      />
      <CustomInfo
        ><p style="margin: 0; color: var(--color-offwhite)">
          {{ graphInfo }}
        </p></CustomInfo
      >
    </div>
    <div v-if="value === 'freeplay' || value === 'daily'" style="height: 100%">
      <HistoryGraph :guesses="graphGuesses" />
    </div>
    <div
      v-else-if="
        value === 'scores' ||
        value === 'incorrectRankGuesses' ||
        value === 'correctRankGuesses'
      "
      style="height: 100%"
    >
      <DistributionGraphScores
        :scores="distributionValues as number[]"
        :labels="distributionLabels"
        :label="distributionLabel!"
      />
    </div>
    <div
      v-else-if="value === 'ranks' || value === 'placements'"
      style="height: 100%"
    >
      <DistributionGraph2D
        :scores="distributionValues as number[][]"
        :labels="distributionLabels"
      />
    </div>
  </CustomCard>
</template>

<style scoped></style>
