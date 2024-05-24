<script setup lang="ts">
defineProps<{ options: string[]; optionTitles: string[]; option: string }>();
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
      style="width: 100%"
      :class="option === o ? 'active-tab' : 'inactive-tab'"
      @click="() => updateOption(o)"
    >
      <h5 class="tab">{{ optionTitles[ind] }}</h5>
    </div>
  </div>
</template>
<style scoped>
.tabs {
  display: flex;
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
</style>
