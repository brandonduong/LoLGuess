<script setup lang="ts">
import HomeButton from "../Home/HomeButton.vue";

const props = defineProps<{ options: string[]; selectedOptions: string[] }>();
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
  <div class="option-grid">
    <HomeButton
      v-for="option in options"
      :type="selectedOptions.includes(option) ? 'tertiary' : 'secondary'"
      :title="option"
      :onClick="() => updateOptions(option)"
      justifyContent="center"
      class="option-button"
    />
  </div>
  <HomeButton
    :type="selectedOptions.length > 0 ? 'tertiary' : 'secondary'"
    title="CHECK ALL"
    justifyContent="center"
    style="width: 100%"
    :onClick="checkAll"
  />
</template>
<style scoped>
.option-grid {
  display: grid;
  gap: 1rem;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  margin-bottom: 1rem;
}

.option-button {
  aspect-ratio: 1;
}
</style>
