<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  level: number;
}>();

const level = ref<number>(props.level);
</script>
<template>
  <h5 class="level">
    {{ level }}
    <img width="16" height="16" src="/lvl.png" />
  </h5>
</template>
<style scoped>
.level {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.25rem;
  margin: 0;
  width: 50px;
}
</style>
