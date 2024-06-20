<script setup lang="ts">
import { ref } from "vue";
import type { DailyGuess, Guess } from "@/API";
import HistoryItem from "./HistoryItem.vue";
import { ALL, HIGH, LOW } from "@/common/constants";
defineProps<{
  guesses: (Guess | DailyGuess)[];
}>();

const current = ref<number>(1);
const pageSize = ref<number>(10);

function getReplayUrl(guess: DailyGuess | Guess) {
  if ("id" in guess && "matchId" in guess) {
    return `/play/${guess.id}`;
  } else if ("date" in guess && "category" in guess) {
    return `/daily/${guess.date}/${guess.category}`;
  }
}
</script>

<template>
  <HistoryItem
    v-for="guess in guesses.slice(pageSize * (current - 1), pageSize * current)"
    :placements="guess.placements"
    :guessedRank="guess.guessedRank"
    :rank="guess.rank"
    :ranks="
      'ranks' in guess
        ? guess.ranks
        : guess.category === 'low'
        ? LOW
        : guess.category === 'high'
        ? HIGH
        : ALL
    "
    :key="guess.createdAt"
    :createdAt="guess.createdAt"
    :regions="'regions' in guess ? (guess.regions as string[]) : undefined"
    :replay="getReplayUrl(guess)"
    ><template #mode v-if="'date' in guess">
      {{ `${guess.date} ${guess.category.toUpperCase()}` }}
    </template></HistoryItem
  >
  <div class="pages">
    <a-pagination
      v-model:pageSize="pageSize"
      v-model:current="current"
      :total="guesses.length"
      :defaultPageSize="10"
      :showSizeChanger="false"
    ></a-pagination>
  </div>
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
