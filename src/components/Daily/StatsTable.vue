<script setup lang="ts">
import TraitIcons from "@/components/Game/TraitIcons.vue";
import AugmentIcons from "@/components/Game/AugmentIcons.vue";
import UnitIcons from "@/components/Game/UnitIcons.vue";
import GoldIcons from "@/components/Game/GoldIcons.vue";
import LevelIcons from "@/components/Game/LevelIcons.vue";
import type { Team } from "@/common/interfaces";
import Username from "./Username.vue";
import { store } from "@/common/store";
import { onMounted, ref } from "vue";
import http from "@/common/http-common";
import CustomSelect from "../Profile/CustomSelect.vue";
import CustomInfo from "../Profile/CustomInfo.vue";
import type { SelectProps } from "ant-design-vue";
import type { Daily } from "@/API";
import DistributionGraphScores from "../Profile/DistributionGraphScores.vue";
import DistributionGraph2D from "../Profile/DistributionGraph2D.vue";
import { ALL, HIGH, LOW, PLACEMENTS } from "@/common/constants";
import {
  OCCURRENCES_LABEL,
  PERFECT_INFO,
  PLACEMENT_INFO,
  RANK_INFO,
  SCORE_INFO,
} from "@/common/statConstants";
const props = defineProps<{
  rankedMatch: Team[];
  usernames: string[];
  verifiedGuess: string[];
  category: string;
  date: string;
}>();

const loading = ref<boolean>(true);
const stats = ref<Daily>();
const expanded = ref<number>(-1);

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
const RANKS =
  props.category === "all" ? ALL : props.category === "low" ? LOW : HIGH;
const value = ref("loggedRanks");
const graphInfo = ref("");
const distributionValues = ref<number[][] | number[]>([]);
const distributionLabels = ref<string[]>(RANKS);
const distributionLabel = ref<string>(OCCURRENCES_LABEL);

function changeGraph(newOption: string) {
  value.value = newOption;
  switch (newOption) {
    case "ranks":
      distributionValues.value = stats.value!.rankGuesses!.map(
        (r) => r as number
      );
      distributionLabels.value = RANKS;
      graphInfo.value = RANK_INFO;
      break;
    case "placementGuesses":
      distributionValues.value = stats.value!.placementGuesses!.map(
        (r) => (r && r!.map((s) => s as number)) as number[]
      );
      distributionLabels.value = PLACEMENTS;
      graphInfo.value = PLACEMENT_INFO;
      break;
    case "scores":
      distributionValues.value = stats.value!.scores!.map((s) => s as number);
      distributionLabels.value = stats.value!.scores!.map((s, ind) =>
        ind.toString()
      );
      graphInfo.value = SCORE_INFO;
      break;
    case "loggedRanks":
      distributionValues.value = stats.value!.loggedRankGuesses!.map(
        (r) => r as number
      );
      distributionLabels.value = RANKS;
      graphInfo.value = RANK_INFO;
      break;
    case "loggedPlacementGuesses":
      distributionValues.value = stats.value!.loggedPlacementGuesses!.map(
        (r) => (r && r!.map((s) => s as number)) as number[]
      );
      distributionLabels.value = PLACEMENTS;
      graphInfo.value = PLACEMENT_INFO;
      break;
    case "loggedScores":
      distributionValues.value = stats.value!.loggedScores!.map(
        (s) => s as number
      );
      distributionLabels.value = stats.value!.loggedScores!.map((s, ind) =>
        ind.toString()
      );
      graphInfo.value = SCORE_INFO;
      break;
    case "perfects":
      distributionValues.value = [
        stats.value!.loggedPerfects!,
        stats.value!.perfects!,
      ];
      distributionLabels.value = ["User Perfects", "Guest Perfects"];
      graphInfo.value = PERFECT_INFO;
      break;
  }
}
</script>
<template>
  <h5 style="margin: 0">STATS</h5>
  <p>Click a team for more info!</p>
  <div class="table-header" v-if="!store.loading">
    <table class="draggable">
      <tr style="display: none">
        <th v-for="_ in [...Array(6).keys()]"></th>
      </tr>
      <template v-for="(team, ind) in sortedMatch" :key="team.order">
        <tr
          class="draggable-row"
          @click="() => (expanded === ind ? (expanded = -1) : (expanded = ind))"
          :style="
            expanded === ind
              ? {
                  background: 'var(--color-background-gray)',
                }
              : {}
          "
        >
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
        <tr
          v-if="expanded === ind"
          :style="
            expanded === ind
              ? { borderBottom: '2px solid var(--color-background-gray)' }
              : {}
          "
        >
          <td colspan="6" v-if="stats">
            <div class="expanded">
              <div
                v-for="{title, guesses} in [{title:'USER GUESSES', guesses: stats.loggedPlacementGuesses!},
                 {title:'GUEST GUESSES',guesses: stats.placementGuesses!}]"
                style="flex-basis: 50%"
              >
                <h5>{{ title }}</h5>
                <div>
                  <DistributionGraphScores
                    :scores="guesses[ind]!.map((r) => (r as number))"
                    :labels="PLACEMENTS"
                    label="# of occurrences"
                  />
                </div>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </table>
  </div>
  <div style="padding: 0 1rem">
    <div
      style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem"
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
    <div style="min-height: 250px">
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
.draggable-row > td:nth-child(n + 1) {
  padding-right: 1rem;
}
.draggable-row > td:first-child {
  padding-left: 1rem;
}
.draggable-row:hover {
  background: var(--color-background-gray);
}
.draggable-row {
  transition: all 200ms;
}
.expanded {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
}
</style>
