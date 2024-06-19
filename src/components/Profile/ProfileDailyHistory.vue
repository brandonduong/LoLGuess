<script setup lang="ts">
import { ref } from "vue";
import type { DailyGuess } from "@/API";
import HistoryItem from "./HistoryItem.vue";
defineProps<{
  guesses: DailyGuess[];
}>();

const current = ref<number>(1);
const pageSize = ref<number>(10);

const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const all = [...low, ...high];
</script>

<template>
  <HistoryItem
    v-for="guess in guesses.slice(pageSize * (current - 1), pageSize * current)"
    :placements="guess.placements"
    :guessedRank="guess.guessedRank"
    :rank="guess.rank"
    :ranks="
      guess.category === 'low' ? low : guess.category === 'high' ? high : all
    "
    :createdAt="guess.createdAt"
    :regions="[`${guess.date} ${guess.category}`]"
    :key="current"
  />
</template>

<style>
.pages {
  padding: 1rem 0;
}

.pages .ant-pagination-item,
.pages .ant-pagination-jump-next,
.pages .ant-pagination-jump-prev,
.pages .ant-pagination-item-link {
  background-color: var(--color-background-gray);
  border: none;
  font-family: "beaufort_for_lolmedium";
}

.pages .ant-pagination-item > a,
.pages button.ant-pagination-item-link {
  color: var(--color-offwhite);
}

.pages .ant-pagination-item-active > a {
  color: var(--color-gold);
}
</style>
