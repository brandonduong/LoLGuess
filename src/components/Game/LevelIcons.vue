<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  level: number;
}>();

const level = ref<number>(props.level);
</script>
<template>
  <h3 class="level">
    {{ level }}
    <img class="level-icon" width="16" height="16" src="/lvl.png" />
  </h3>
</template>
<style scoped>
.level {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.25rem;
}

.level-icon {
  filter: contrast(1000%) invert(100%);
}
</style>
