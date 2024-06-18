<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  goldLeft: number;
}>();

const goldLeft = ref<number>(props.goldLeft);
</script>
<template>
  <div class="gold">
    <h5 style="margin: 0">{{ goldLeft }}</h5>
    <img class="gold-icon" width="20" height="16" src="/money.png" />
  </div>
</template>
<style scoped>
.gold {
  display: flex;
  align-items: center;
  justify-content: end;
  column-gap: 0.25rem;
}
</style>
