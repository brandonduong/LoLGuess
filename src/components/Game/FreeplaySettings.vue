<script setup lang="ts">
import HomeButton from "../Home/HomeButton.vue";
import RankIcon from "./RankIcon.vue";

const props = defineProps<{
  options: string[];
  selectedOptions: string[];
  icons?: boolean;
}>();
const emit = defineEmits<{
  (e: "updateOptions", newOptions: string[]): void;
}>();

function updateOptions(option: string) {
  if (props.selectedOptions.includes(option)) {
    emit(
      "updateOptions",
      props.selectedOptions.filter((o) => {
        return o !== option;
      })
    );
  } else {
    emit("updateOptions", [...props.selectedOptions, option]);
  }
}

function checkAll() {
  if (props.selectedOptions.length > 0) {
    emit("updateOptions", []);
  } else {
    emit("updateOptions", [...props.options]);
  }
}
</script>
<template>
  <HomeButton
    v-for="option in options"
    :type="selectedOptions.includes(option) ? 'tertiary' : 'secondary'"
    :title="option"
    :onClick="() => updateOptions(option)"
    justifyContent="center"
    flexDirection="column"
    iconGap="0"
    class="option-button"
    ><template #icon v-if="icons"
      ><RankIcon :rank="option" width="100px" height="100px" /></template
  ></HomeButton>
  <HomeButton
    :type="selectedOptions.length > 0 ? 'tertiary' : 'secondary'"
    title="CHECK ALL"
    justifyContent="center"
    style="grid-column: 1 / -1"
    :onClick="checkAll"
  />
</template>
<style scoped></style>
