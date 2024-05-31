<script setup lang="ts">
import type { SelectProps } from "ant-design-vue";
import { ref } from "vue";
const props = defineProps<{ options: SelectProps["options"]; value: string }>();
const emit = defineEmits<{ (e: "updateOption", newOption: string): void }>();
function updateOption(newOption: string) {
  emit("updateOption", newOption);
}
const copy = ref(props.value);
</script>
<template>
  <a-select
    ref="select"
    v-model:value="copy"
    :options="options"
    @change="(newOption : string) => updateOption(newOption)"
  ></a-select>
</template>
<style scoped></style>
