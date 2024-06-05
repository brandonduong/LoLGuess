<script setup lang="ts">
import { ref } from "vue";
import RankIcon from "./RankIcon.vue";
import CustomTabs from "../Daily/CustomTabs.vue";

const props = defineProps<{
  selectedRanks: string[];
  verifiedRank: string;
  selectedRank: string;
  loading: boolean;
}>();

const emit = defineEmits(["updateSelectedRank"]);

function updateRank(event: string) {
  emit("updateSelectedRank", event);
}

const value = ref(props.selectedRank);
</script>
<template>
  <div class="rank-guess" style="flex-grow: 1">
    <CustomTabs
      :options="props.selectedRanks"
      :optionTitles="new Array(props.selectedRanks.length)"
      :option="value"
      @update-option="
        (newOption) => {
          value = newOption;
          updateRank(newOption);
        }
      "
      :disabled="props.verifiedRank.length > 0"
      style="flex-grow: 1"
      class="rank-tabs"
      :highlight="[props.verifiedRank]"
    >
      <template v-for="(r, ind) in props.selectedRanks" #[`icon-${ind}`]
        ><div class="rank-div">
          <RankIcon :rank="r" width="3rem" height="3rem" /></div></template
    ></CustomTabs>
  </div>
</template>
<style scoped>
.rank-guess {
  display: flex;
  column-gap: 1rem;
  justify-items: start;
  align-items: center;
  flex-wrap: wrap;
}

.rank-div {
  display: flex;
  align-items: center;
  white-space: nowrap;
  column-gap: 0.5rem;
}

@media only screen and (max-width: 1024px) {
  .rank-tabs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
  }
}
</style>
