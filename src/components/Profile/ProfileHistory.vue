<script setup lang="ts">
import { ref, watch } from "vue";
import type { DailyGuess, Guess } from "@/API";
import HistoryItem from "./HistoryItem.vue";
const props = defineProps<{
  guesses: Guess[] | DailyGuess[];
  option: string;
}>();

const current = ref<number>(1);
const pageSize = ref<number>(10);

const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const all = [...low, ...high];

watch(
  () => props.option,
  () => {
    current.value = 1;
  }
);
</script>

<template>
  <HistoryItem
    v-if="option === 'freeplay'"
    v-for="guess in (guesses as Guess[]).slice(pageSize * (current - 1), pageSize * current)"
    :placements="guess.placements"
    :guessedRank="guess.guessedRank"
    :rank="guess.rank"
    :ranks="guess.ranks"
    :createdAt="guess.createdAt"
    :regions="(guess.regions as string[])"
    :replay="guess.matchId ? `/play/${guess.id}` : ''"
  />
  <HistoryItem
    v-else
    v-for="guess in (guesses as DailyGuess[]).slice(pageSize * (current - 1), pageSize * current)"
    :placements="guess.placements"
    :guessedRank="guess.guessedRank"
    :rank="guess.rank"
    :ranks="
      guess.category === 'low' ? low : guess.category === 'high' ? high : all
    "
    :createdAt="guess.createdAt"
    :replay="`/daily/${guess.date}/${guess.category}`"
    ><template #mode>
      {{ `${guess.date} ${guess.category.toUpperCase()}` }}
    </template>
  </HistoryItem>
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
