<script setup lang="ts">
import TraitIcons from "@/components/Game/TraitIcons.vue";
import AugmentIcons from "@/components/Game/AugmentIcons.vue";
import UnitIcons from "@/components/Game/UnitIcons.vue";
import GoldIcons from "@/components/Game/GoldIcons.vue";
import LevelIcons from "@/components/Game/LevelIcons.vue";
import type { StaticData, StaticSetsData, Team } from "@/common/interfaces";
import Username from "./Username.vue";
import { store } from "@/common/store";
import { onMounted, ref } from "vue";
import http from "@/common/http-common";
import CustomSelect from "../Profile/CustomSelect.vue";
import CustomInfo from "../Profile/CustomInfo.vue";
import type { SelectProps } from "ant-design-vue";
import { Daily } from "@/API";
import DistributionGraphScores from "../Profile/DistributionGraphScores.vue";
import DistributionGraph2D from "../Profile/DistributionGraph2D.vue";
import Stat from "../Profile/Stat.vue";
import { stat } from "fs";
const props = defineProps<{
  rankedMatch: Team[];
  usernames: string[];
  verifiedGuess: string[];
  category: string;
  date: string;
}>();

const loading = ref<boolean>(true);
const stats = ref<Daily>();

onMounted(async () => {
  await getStats();
});

const sortedMatch: Team[] = [];
for (let i = 1; i < props.rankedMatch.length + 1; i++) {
  sortedMatch.push(
    props.rankedMatch[
      props.verifiedGuess.findIndex((num) => parseInt(num) === i)
    ]
  );
}

async function getStats() {
  let url = `/getDailyStats?date=${props.date}&category=${props.category}`;
  //console.log(url);

  const header = {
    headers: {
      "Content-type": "application/json",
    },
  };

  loading.value = true;
  await http.api
    .get(url, header)
    .then((res) => {
      stats.value = res.data;
      changeGraph("loggedRanks");
    })
    .catch((err) => {
      console.log(err);
    });
  loading.value = false;
}

const selectOptions = ref<SelectProps["options"]>([
  {
    label: `USERS`,
    options: [
      {
        value: "loggedRanks",
        label: "Rank Distribution",
      },
      {
        value: "loggedScores",
        label: "Score Distribution",
      },
      {
        value: "loggedPlacementGuesses",
        label: "Placement Distribution",
      },
      {
        value: "perfects",
        label: "Perfects",
      },
    ],
  },
  {
    label: `GUESTS`,
    options: [
      {
        value: "ranks",
        label: "Rank Distribution",
      },
      {
        value: "scores",
        label: "Score Distribution",
      },
      {
        value: "placementGuesses",
        label: "Placement Distribution",
      },
    ],
  },
]);
const LOW = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
const HIGH = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const ALL = [...LOW, ...HIGH];
const PLACEMENTS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const value = ref("loggedRanks");
const graphInfo = ref("");
const distributionValues = ref<number[][] | number[]>([]);
const distributionLabels = ref<string[]>(ALL);
const distributionLabel = ref<string>("# of occurrences");

function changeGraph(newOption: string) {
  value.value = newOption;
  switch (newOption) {
    case "ranks":
      distributionValues.value = stats.value!.rankGuesses!.map(
        (r) => r as number
      );
      distributionLabels.value = ALL;
      distributionLabel.value = "# of occurrences";
      graphInfo.value =
        "Number of times rank X was guessed, grouped by the match's actual rank";
      break;
    case "placementGuesses":
      distributionValues.value = stats.value!.placementGuesses!.map(
        (r) => (r && r!.map((s) => s as number)) as number[]
      );
      distributionLabels.value = PLACEMENTS;
      graphInfo.value =
        "Number of times placement X was guessed, grouped by the actual placement";
      break;
    case "scores":
      distributionValues.value = stats.value!.scores!.map((s) => s as number);
      distributionLabels.value = stats.value!.scores!.map((s, ind) =>
        ind.toString()
      );
      distributionLabel.value = "# of occurrences";
      graphInfo.value =
        "Number of times score X was achieved, up to the maximum of score 100";
      break;
    case "loggedRanks":
      distributionValues.value = stats.value!.loggedRankGuesses!.map(
        (r) => r as number
      );
      distributionLabels.value = ALL;
      distributionLabel.value = "# of occurrences";
      graphInfo.value =
        "Number of times rank X was guessed, grouped by the match's actual rank";
      break;
    case "loggedPlacementGuesses":
      distributionValues.value = stats.value!.loggedPlacementGuesses!.map(
        (r) => (r && r!.map((s) => s as number)) as number[]
      );
      distributionLabels.value = PLACEMENTS;
      graphInfo.value =
        "Number of times placement X was guessed, grouped by the actual placement";
      break;
    case "loggedScores":
      distributionValues.value = stats.value!.loggedScores!.map(
        (s) => s as number
      );
      distributionLabels.value = stats.value!.loggedScores!.map((s, ind) =>
        ind.toString()
      );
      distributionLabel.value = "# of occurrences";
      graphInfo.value =
        "Number of times score X was achieved, up to the maximum of score 100";
      break;
    case "perfects":
      distributionValues.value = [
        stats.value!.loggedPerfects!,
        stats.value!.perfects!,
      ];
      distributionLabels.value = ["User Perfects", "Guest Perfects"];
      distributionLabel.value = "# of occurrences";
      graphInfo.value = "Number of times a perfect score was achieved";
      break;
  }
}
</script>
<template>
  <h5 style="margin: 0">STATS</h5>
  <p>Teams are displayed in correct order below!</p>
  <div class="table-header" v-if="!store.loading">
    <table class="draggable">
      <tr style="display: none">
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="team in sortedMatch" :key="team.order" class="draggable-row">
        <td>
          <Username :username="usernames[team.order]" />
        </td>
        <td>
          <LevelIcons :level="team.level" />
        </td>
        <td>
          <TraitIcons :traits="team.traits" />
        </td>
        <td>
          <AugmentIcons
            :augments="team.augments"
            :augmentAmount="team.augmentNum"
          />
        </td>
        <td>
          <UnitIcons :units="team.units" />
        </td>
        <td>
          <GoldIcons :goldLeft="team.gold_left" style="margin-left: auto" />
        </td>
      </tr>
    </table>
  </div>
  <div style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem">
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
  <div style="min-height: 300px">
    <DistributionGraph2D
      v-if="value.includes('lacementGuesses')"
      :scores="(distributionValues as number[][])"
      :labels="distributionLabels"
    />
    <DistributionGraphScores
      v-else
      :scores="(distributionValues as number[])"
      :labels="distributionLabels"
      :label="distributionLabel!"
    />
  </div>
</template>
<style scoped>
.table-header {
  overflow: auto;
}
.draggable {
  width: 100%;
}
.draggable-row > td {
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
}
.draggable-row > td:nth-child(n + 2) {
  padding-left: 1rem;
}
</style>
