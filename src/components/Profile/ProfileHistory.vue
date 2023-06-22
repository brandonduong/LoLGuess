<script setup lang="ts">
import { ref } from "vue";
import type { Guess } from "@/API";
import HistoryItem from "./HistoryItem.vue";

const props = defineProps<{
  guesses: Guess[];
}>();

const current = ref<number>(1);
</script>

<template>
  <div class="history">
    <HistoryItem
      v-for="guess in guesses.slice(5 * (current - 1), 5 * current)"
      :guess="guess"
    />
    <div class="pages">
      <a-pagination
        v-model:current="current"
        :total="guesses.length"
        :defaultPageSize="5"
      />
    </div>
  </div>
</template>

<style scoped>
.history {
  grid-column: span 2;
  border: solid 1px lightslategray;
  padding: 1rem;
  display: grid;
  row-gap: 0.5rem;
  border-radius: 0.25rem;
  background-color: white;
}

.pages {
  display: flex;
  justify-content: center;
}
</style>
