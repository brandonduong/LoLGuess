<script setup lang="ts">
import { type User } from "../../API";
import Stat from "./Stat.vue";
import { roundToTwo } from "../../common/helper";
import { RedoOutlined } from "@ant-design/icons-vue";
import CustomCard from "../CustomCard.vue";
import HomeButton from "../Home/HomeButton.vue";
import { ref, watch } from "vue";
import CustomTabs from "../Daily/CustomTabs.vue";
import CustomSelect from "./CustomSelect.vue";
import type { SelectProps } from "ant-design-vue";

const emit = defineEmits(["getStaticProfileData"]);

const props = defineProps<{
  staticProfileData: User;
}>();

const option = ref<string>("freeplay");
const [pref, username] = props.staticProfileData.username.split(" ");

const freeplayStats = {
  GUESSES: props.staticProfileData.totalGuesses,
  "FORFEIT GUESSES": props.staticProfileData.unfinished,
  SCORE: `${roundToTwo(props.staticProfileData.score)} / ${roundToTwo(
    props.staticProfileData.maxScore
  )}`,
  "AVG. SCORE": roundToTwo(
    props.staticProfileData.score / props.staticProfileData.totalGuesses
  ),
  "CORRECT PLACEMENTS": `${props.staticProfileData.correctPlacements} /
  ${props.staticProfileData.totalGuesses * 8}`,
  "AVG. CORRECT PLACEMENTS": roundToTwo(
    props.staticProfileData.correctPlacements /
      props.staticProfileData.totalGuesses
  ),
  "CORRECT RANKS": props.staticProfileData.correctRanks,
  "AVG. RANK POOL": roundToTwo(
    props.staticProfileData.totalRanks / props.staticProfileData.totalGuesses
  ),
};

const dailyStats = {
  GUESSES: props.staticProfileData.dailyTotalGuesses,
  SCORE: `${roundToTwo(props.staticProfileData.dailyScore!)} / ${roundToTwo(
    props.staticProfileData.dailyMaxScore!
  )}`,
  "AVG. SCORE": roundToTwo(
    props.staticProfileData.dailyScore! /
      props.staticProfileData.dailyTotalGuesses!
  ),
  "CORRECT PLACEMENTS": `${props.staticProfileData.dailyCorrectPlacements} /
  ${props.staticProfileData.dailyTotalGuesses! * 8}`,
  "AVG. CORRECT PLACEMENTS": roundToTwo(
    props.staticProfileData.dailyCorrectPlacements! /
      props.staticProfileData.dailyTotalGuesses!
  ),
  "CORRECT RANKS": props.staticProfileData.dailyCorrectRanks,
};

const stats = ref(option.value === "freeplay" ? freeplayStats : dailyStats);

function refresh() {
  emit("getStaticProfileData");
}

watch(option, () => {
  stats.value = option.value === "freeplay" ? freeplayStats : dailyStats;
});

const selectOptions = ref<SelectProps["options"]>([
  {
    label: "MODES",
    options: [
      {
        value: "freeplay",
        label: "Freeplay Stats",
      },
      {
        value: "daily",
        label: "Daily Stats",
      },
    ],
  },
]);
</script>
<template>
  <CustomCard style="align-items: normal; gap: 0.5rem; justify-content: start">
    <div class="refresh">
      <h4 class="stats-title gold">
        {{ pref.substring(0, 20) }}
        <p>({{ username.substring(0, 20) }})</p>
      </h4>
      <HomeButton
        class="refresh-btn"
        type="secondary"
        @click="refresh"
        title="REFRESH"
        padding="0.25rem 0.75rem"
      >
        <template #icon>
          <RedoOutlined style="font-size: 1rem; color: white" />
        </template>
      </HomeButton>
    </div>

    <CustomSelect
      :options="selectOptions"
      :value="option"
      @update-option="(newOption) => (option = newOption)"
    />

    <div class="stats">
      <Stat
        v-for="[title, value] in Object.entries(stats)"
        :title="title"
        :value="value!"
      />
    </div>
  </CustomCard>
</template>
<style scoped>
.stats-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.stats-title > p {
  margin: 0;
}
.refresh {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 2rem;
  row-gap: 0.5rem;
}
</style>
