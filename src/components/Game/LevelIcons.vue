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
  </h3>
</template>
<style scoped></style>
