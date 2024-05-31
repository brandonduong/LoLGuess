<script setup lang="ts">
import { ref } from "vue";
import type { Guess } from "@/API";
import CustomCard from "../CustomCard.vue";
import CustomSelect from "./CustomSelect.vue";
import HistoryGraph from "./HistoryGraph.vue";
import type { SelectProps } from "ant-design-vue";

const props = defineProps<{
  guesses: Guess[];
}>();

//console.log(props.guesses);

const selectOptions = ref<SelectProps["options"]>([
  {
    value: "freeplay",
    label: "Freeplay History",
  },
  {
    value: "daily",
    label: "Daily History",
  },
  {
    value: "rank",
    label: "Rank Distribution",
  },
  {
    value: "placements",
    label: "Placement Distribution",
  },
]);
const value = ref("freeplay");
const graphGuesses = ref(props.guesses);

function changeGraph(newOption: string) {
  value.value = newOption;
  switch (newOption) {
    case "freeplay":
      graphGuesses.value = props.guesses.filter((g) => g.mode === undefined);
      break;
    case "daily":
      graphGuesses.value = props.guesses.filter((g) => g.mode === "daily");
      break;

    default:
      break;
  }
}
</script>

<template>
  <CustomCard style="align-items: normal">
    <CustomSelect
      :options="selectOptions"
      :value="value"
      @update-option="(newOption: string) => changeGraph(newOption)"
    />
    <div>
      <HistoryGraph :guesses="graphGuesses" />
    </div>
  </CustomCard>
</template>

<style scoped></style>
