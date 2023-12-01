<script setup lang="ts">
import { ref } from "vue";
import { type User } from "../../API";
import Stat from "./Stat.vue";
import { roundToTwo } from "../../common/helper";
import { RedoOutlined } from "@ant-design/icons-vue";

const emit = defineEmits(["getStaticProfileData"]);

const props = defineProps<{
  staticProfileData: User;
}>();

const [pref, username] = props.staticProfileData.username.split(" ");
const stats = {
  Guesses: props.staticProfileData.totalGuesses,
  "Unfinished Guesses": props.staticProfileData.unfinished,
  Score: `${roundToTwo(props.staticProfileData.score)} / ${roundToTwo(
    props.staticProfileData.maxScore
  )}`,
  "Avg. Score": roundToTwo(
    props.staticProfileData.score / props.staticProfileData.totalGuesses
  ),
  "Correct Placements": `${props.staticProfileData.correctPlacements} /
  ${props.staticProfileData.totalGuesses * 8}`,
  "Avg. Cor. Placements": roundToTwo(
    props.staticProfileData.correctPlacements /
      props.staticProfileData.totalGuesses
  ),
  "Correct Ranks": props.staticProfileData.correctRanks,
  "Average Rank Pool": roundToTwo(
    props.staticProfileData.totalRanks / props.staticProfileData.totalGuesses
  ),
};

function refresh() {
  emit("getStaticProfileData");
}
</script>
<template>
  <div class="stats">
    <h2 class="stats-title">
      {{ pref.substring(0, 20) }} ({{ username.substring(0, 20) }})
    </h2>
    <div class="refresh">
      <a-button class="refresh-btn" type="primary" @click="refresh">
        <RedoOutlined style="font-size: 1.5rem; color: white" />
      </a-button>
    </div>
    <hr class="stats-divider" />

    <Stat
      v-for="[title, value] in Object.entries(stats)"
      :title="title"
      :value="value"
    />
  </div>
</template>
<style scoped>
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  border: solid 1px lightslategray;
  border-radius: 0.25rem;
  background-color: white;
  padding: 0.5rem 1.5rem;
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
