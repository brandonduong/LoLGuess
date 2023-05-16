<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  goldLeft: number;
}>();

const goldLeft = ref<number>(props.goldLeft);
</script>
<template>
  <h3 class="gold">
    {{ goldLeft }}
  </h3>
</template>
<style scoped></style>
