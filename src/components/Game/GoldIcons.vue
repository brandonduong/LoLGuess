<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  goldLeft: number;
}>();

const goldLeft = ref<number>(props.goldLeft);
</script>
<template>
  <div class="gold">
    <h3>{{ goldLeft }}</h3>
    <img class="gold-icon" width="20" height="16" src="/money.png" />
  </div>
</template>
<style scoped>
.gold {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.25rem;
}

.gold > h3 {
  font-size: 1.25rem;
  margin: 0;
}
</style>
