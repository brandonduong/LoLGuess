<script setup lang="ts">
import { ref } from "vue";
import type { DailyGuess, Guess, User } from "@/API";
import CustomCard from "../CustomCard.vue";
import CustomInfo from "./CustomInfo.vue";
import CustomSelect from "./CustomSelect.vue";
import HistoryGraph from "./HistoryGraph.vue";
import DistributionGraphScores from "./DistributionGraphScores.vue";
import DistributionGraph2D from "./DistributionGraph2D.vue";
import type { SelectProps } from "ant-design-vue";
import { ALL, PLACEMENTS } from "@/common/constants";
import {
  CORRECT_RANK_INFO,
  INCORRECT_RANK_INFO,
  OCCURRENCES_LABEL,
  PLACEMENT_INFO,
  RANK_INFO,
  SCORE_INFO,
} from "@/common/statConstants";

const props = defineProps<{
  guesses: Guess[];
  user: User;
  dailyGuesses: DailyGuess[];
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
      {
        value: "dailyScoresLow",
        label: "Score Distribution - Low",
      },
      {
        value: "dailyScoresHigh",
        label: "Score Distribution - High",
      },
      {
        value: "dailyScoresAll",
        label: "Score Distribution - All",
      },
      {
        value: "dailyRankGuessesLow",
        label: "Rank Distribution - Low",
      },
      {
        value: "dailyRankGuessesHigh",
        label: "Rank Distribution - High",
      },
      {
        value: "dailyRankGuessesAll",
        label: "Rank Distribution - All",
      },
      {
        value: "dailyPlacementGuessesLow",
        label: "Placement Distribution - Low",
      },
      {
        value: "dailyPlacementGuessesHigh",
        label: "Placement Distribution - High",
      },
      {
        value: "dailyPlacementGuessesAll",
        label: "Placement Distribution - All",
      },
    ],
  },
]);
const value = ref("freeplay");
const graphInfo = ref("Freeplay guess scores");

const distributionValues = ref<number[][] | number[]>([]);
const distributionLabels = ref<string[]>([]);
const distributionLabel = ref<string>(OCCURRENCES_LABEL);

function changeGraph(newOption: string) {
  value.value = newOption;
  switch (newOption) {
    case "freeplay":
      graphInfo.value = "Freeplay guess scores";
      break;
    case "daily":
      graphInfo.value = "Daily guess scores";
      break;
    case "ranks":
      distributionValues.value = props.user.rankGuesses!.map(
        (r) => (r && r!.map((s) => s as number)) as number[]
      );
      distributionLabels.value = ALL;
      graphInfo.value = RANK_INFO;
      break;
    case "placements":
      distributionValues.value = props.user.placementGuesses!.map(
        (r) => (r && r!.map((s) => s as number)) as number[]
      );
      distributionLabels.value = PLACEMENTS;
      graphInfo.value = PLACEMENT_INFO;
      break;
    case "scores":
      distributionValues.value = props.user.scores!.map((s) => s as number);
      distributionLabels.value = props.user.scores!.map((s, ind) =>
        ind.toString()
      );
      graphInfo.value = SCORE_INFO;
      break;
    case "incorrectRankGuesses":
      distributionValues.value = props.user
        .correctPlacementGuesses!.map((s) => s as number)
        .slice(0, 9);
      distributionLabels.value = distributionValues.value.map((s, ind) =>
        ind.toString()
      );
      graphInfo.value = INCORRECT_RANK_INFO;
      break;
    case "correctRankGuesses":
      distributionValues.value = props.user
        .correctPlacementGuesses!.map((s) => s as number)
        .slice(9);
      distributionLabels.value = distributionValues.value.map((s, ind) =>
        ind.toString()
      );
      graphInfo.value = CORRECT_RANK_INFO;
      break;
    default:
      break;
  }

  // Repetitive daily stats
  if (
    newOption === "dailyScoresLow" ||
    newOption === "dailyScoresHigh" ||
    newOption === "dailyScoresAll"
  ) {
    distributionValues.value = props.user[newOption]!.map((s) => s as number);
    distributionLabels.value = props.user[newOption]!.map((s, ind) =>
      ind.toString()
    );
    graphInfo.value = SCORE_INFO;
  } else if (
    newOption === "dailyRankGuessesLow" ||
    newOption === "dailyRankGuessesHigh" ||
    newOption === "dailyRankGuessesAll"
  ) {
    distributionValues.value = props.user[newOption]!.map(
      (r) => (r && r!.map((s) => s as number)) as number[]
    );
    distributionLabels.value = ALL;
    graphInfo.value = RANK_INFO;
  } else if (
    newOption === "dailyPlacementGuessesLow" ||
    newOption === "dailyPlacementGuessesHigh" ||
    newOption === "dailyPlacementGuessesAll"
  ) {
    distributionValues.value = props.user[newOption]!.map(
      (r) => (r && r!.map((s) => s as number)) as number[]
    );
    distributionLabels.value = PLACEMENTS;
    graphInfo.value = PLACEMENT_INFO;
  }
}
</script>

<template>
  <CustomCard
    style="align-items: normal; justify-content: start; min-height: 300px"
  >
    <div
      style="
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
      "
    >
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
      <HistoryGraph
        :guesses="value === 'freeplay' ? props.guesses : props.dailyGuesses"
      />
    </div>
    <div
      v-else-if="
        value === 'scores' ||
        value === 'incorrectRankGuesses' ||
        value === 'correctRankGuesses' ||
        value.includes('dailyScores')
      "
      style="height: 100%"
    >
      <DistributionGraphScores
        :scores="(distributionValues as number[])"
        :labels="distributionLabels"
        :label="distributionLabel!"
      />
    </div>
    <div
      v-else-if="
        value === 'ranks' ||
        value === 'placements' ||
        value.includes('dailyRankGuesses') ||
        value.includes('dailyPlacementGuesses')
      "
      style="height: 100%"
    >
      <DistributionGraph2D
        :scores="(distributionValues as number[][])"
        :labels="distributionLabels"
      />
    </div>
  </CustomCard>
</template>

<style scoped></style>
