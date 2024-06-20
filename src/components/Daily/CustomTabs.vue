<script setup lang="ts">
withDefaults(
  defineProps<{
    options: string[];
    optionTitles: string[];
    option: string;
    disabled?: boolean;
    highlight?: string[];
  }>(),
  { disabled: false }
);
const emit = defineEmits<{
  (e: "updateOption", newOption: string): void;
}>();

function updateOption(o: string) {
  emit("updateOption", o);
}
</script>
<template>
  <div class="tabs">
    <div
      v-for="(o, ind) in options"
      :style="{ background: highlight?.includes(o) ? 'var(--color-gold)' : '' }"
      :class="option === o ? 'active-tab' : 'inactive-tab'"
      @click="() => !disabled && updateOption(o)"
    >
      <h5 class="tab">{{ optionTitles[ind] }}<slot :name="`icon-${ind}`" /></h5>
    </div>
  </div>
</template>
<style scoped>
.tabs {
  display: flex;
  cursor: url("/cursor-pointer.png"), pointer !important;
  width: 100%;
}

.active-tab,
.inactive-tab {
  width: 100%;
  display: flex;
  justify-content: center;
}

.inactive-tab {
  background: linear-gradient(var(--color-dark-blue), var(--color-light-blue));
}

.inactive-tab:hover {
  background: linear-gradient(
    var(--color-highlight-dark-blue),
    var(--color-highlight-light-blue)
  );
}

.active-tab {
  background: none;
}

.active-tab > h5 {
  color: var(--color-gold);
}

.tab {
  padding: 0.5rem;
  margin: 0;
}

.active-tab:nth-child(n + 2),
.inactive-tab:nth-child(n + 2) {
  border-left: 2px solid var(--color-gold);
}

.active-tab:nth-child(-n + 2),
.inactive-tab:nth-child(-n + 2) {
  border-right: 2px solid var(--color-gold);
}
</style>
