<script setup lang="ts">
import type { SelectProps } from "ant-design-vue";
import { CaretDownOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const props = defineProps<{
  options: SelectProps["options"];
  value: string;
}>();
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
    @change="(newOption : string) => updateOption(newOption)"
    class="custom-select"
    popupClassName="custom-select-popup"
    :bordered="false"
    :dropdownStyle="{
      backgroundColor: 'var(--color-background-gray)',
    }"
    :listHeight="512"
    ><template #suffixIcon
      ><caret-down-outlined class="select-suffix"
    /></template>
    <a-select-opt-group v-for="option in options">
      <template #label>
        <h5 style="margin: 0; color: var(--color-gold)">
          {{ option.label }}
        </h5>
      </template>
      <a-select-option
        v-for="(o, ind) in option.options"
        :value="o.value"
        :title="o.label"
        :class="{ 'custom-select-option': true }"
        :style="
          o.value === copy
            ? 'color: var(--color-gold); font-family: spiegelregular'
            : 'font-family: spiegelregular'
        "
        ><span>{{ o.label }}</span></a-select-option
      >
    </a-select-opt-group>
  </a-select>
</template>
<style>
.custom-select {
  background-color: var(--color-background-gray);
  color: var(--color-offwhite);
  line-height: 18pt;
  letter-spacing: 0.075em;
  font-size: 14pt;
  font-family: "beaufort_for_lolbold";
  font-weight: 700;
  font-style: normal;

  text-transform: uppercase;
}

.select-suffix {
  color: var(--color-offwhite);
}

.custom-select-option:not(.ant-select-item-option-disabled):hover {
  background: var(--color-background-highlight-gray);
}

.custom-select-option:not(.ant-select-item-option-disabled) {
  color: var(--color-offwhite);
  background-color: var(--color-background-gray);
}

.ant-select-single.ant-select-open .ant-select-selection-item {
  color: var(--color-offwhite);
}
</style>
