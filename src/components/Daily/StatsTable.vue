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
const props = defineProps<{
  rankedMatch: Team[];
  usernames: string[];
  verifiedGuess: string[];
  category: string;
  date: string;
}>();

const loading = ref<boolean>(true);

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
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  loading.value = false;
}
</script>
<template>
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
</template>
<style scoped>
.table-header {
  display: flex;
  column-gap: 1rem;
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
