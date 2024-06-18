<script setup lang="ts">
import TraitIcons from "@/components/Game/TraitIcons.vue";
import AugmentIcons from "@/components/Game/AugmentIcons.vue";
import UnitIcons from "@/components/Game/UnitIcons.vue";
import GoldIcons from "@/components/Game/GoldIcons.vue";
import LevelIcons from "@/components/Game/LevelIcons.vue";
import { onMounted, ref } from "vue";
import http from "../../common/http-common";
import { useRouter } from "vue-router";
import type { StaticData, StaticSetsData, Team } from "@/common/interfaces";
import Username from "./Username.vue";
const props = defineProps<{
  rankedMatch: Team[];
  usernames: string[];
  verifiedGuess: string[];
}>();

var loading = ref(true);
var staticTFTItemData = ref<StaticData[]>([]);
var staticTFTSetsData = ref<StaticSetsData>();

onMounted(async () => {
  await getStaticTFTData().then(() => {
    loading.value = false;
  });
});

async function getStaticTFTData() {
  const staticData = window.localStorage.getItem("staticTFTData");
  // Today in UTC with no time
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0];
  if (!staticData || JSON.parse(staticData).date !== today) {
    await http.dragon.get("/cdragon/tft/en_us.json").then((res) => {
      staticTFTItemData.value = res.data.items;
      staticTFTSetsData.value = res.data.sets;
    });
    //console.log(staticTFTAugmentData);
    localStorage.setItem(
      "staticTFTData",
      JSON.stringify({
        items: staticTFTItemData.value,
        sets: staticTFTSetsData.value,
        date: today,
      })
    );
  } else {
    const parsed = JSON.parse(staticData);
    //console.log(parsed);
    staticTFTItemData.value = parsed.items;
    staticTFTSetsData.value = parsed.sets;
  }
}

const sortedMatch: Team[] = [];
for (let i = 1; i < props.rankedMatch.length + 1; i++) {
  sortedMatch.push(
    props.rankedMatch[
      props.verifiedGuess.findIndex((num) => parseInt(num) === i)
    ]
  );
}
</script>
<template>
  <div class="table-header" v-if="!loading">
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
          <TraitIcons
            :staticTFTSetsData="staticTFTSetsData!"
            :traits="team.traits"
          />
        </td>
        <td>
          <AugmentIcons
            :staticTFTItemData="staticTFTItemData"
            :augments="team.augments"
            :augmentAmount="team.augmentNum"
          />
        </td>
        <td>
          <UnitIcons
            :units="team.units"
            :staticTFTSetsData="staticTFTSetsData!"
            :staticTFTItemData="staticTFTItemData"
          />
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
}
.draggable-row > td:nth-child(n + 2) {
  padding-left: 1rem;
}
</style>
