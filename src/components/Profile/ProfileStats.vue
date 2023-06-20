<script setup lang="ts">
import { type User, type Guess } from "../../API";
import Stat from "./Stat.vue";
import { roundToTwo } from "../../common/helper";
import { RedoOutlined } from "@ant-design/icons-vue";

const emit = defineEmits(["getStaticProfileData"]);

const props = defineProps<{
  staticProfileData: User;
}>();

function refresh() {
  emit("getStaticProfileData");
}
</script>
<template>
  <div class="stats">
    <h2 class="stats-title">
      {{
        staticProfileData.username.charAt(0).toUpperCase() +
        staticProfileData.username.slice(1)
      }}
    </h2>
    <div class="refresh">
      <a-button class="refresh-btn" type="primary" @click="refresh"
        ><RedoOutlined style="font-size: 1.5rem; color: white"
      /></a-button>
    </div>
    <hr class="stats-divider" />
    <Stat title="Guesses" :value="`${staticProfileData.totalGuesses}`" />
    <Stat
      title="Unfinished Guesses"
      :value="`${staticProfileData.unfinished}`"
    />
    <Stat
      title="Score"
      :value="`${staticProfileData.score} / ${staticProfileData.maxScore}`"
    />
    <Stat
      title="Avg. Score"
      :value="`${roundToTwo(
        staticProfileData.score / staticProfileData.totalGuesses
      )}`"
    />
    <Stat
      title="Correct Placements"
      :value="`${staticProfileData.correctPlacements} / ${
        staticProfileData.totalGuesses * 8
      }`"
    />
    <Stat
      title="Avg. Cor. Placements"
      :value="`${roundToTwo(
        staticProfileData.correctPlacements / staticProfileData.totalGuesses
      )}`"
    />
    <Stat title="Correct Ranks" :value="`${staticProfileData.correctRanks}`" />
    <Stat
      title="Average Rank Pool"
      :value="`${roundToTwo(
        staticProfileData.totalRanks / staticProfileData.totalGuesses
      )}`"
    />
  </div>
</template>
<style scoped>
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  border: solid 1px lightslategray;
  padding: 1rem 1.5rem;
  align-items: center;
}

.stats-title {
  margin: 0;
}

.stats-divider {
  grid-column: span 2;
}

.refresh {
  display: flex;
  justify-content: flex-end;
}

.refresh-btn {
  padding: 0.18rem 0.5rem 0;
}
</style>
