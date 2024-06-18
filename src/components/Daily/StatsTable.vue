<script setup lang="ts">
import TraitIcons from "@/components/Game/TraitIcons.vue";
import AugmentIcons from "@/components/Game/AugmentIcons.vue";
import UnitIcons from "@/components/Game/UnitIcons.vue";
import GoldIcons from "@/components/Game/GoldIcons.vue";
import LevelIcons from "@/components/Game/LevelIcons.vue";
import type { StaticData, StaticSetsData, Team } from "@/common/interfaces";
import Username from "./Username.vue";
import { store } from "@/common/store";
const props = defineProps<{
  rankedMatch: Team[];
  usernames: string[];
  verifiedGuess: string[];
}>();

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
}
.draggable-row > td:nth-child(n + 2) {
  padding-left: 1rem;
}
</style>
