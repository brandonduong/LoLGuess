<script setup lang="ts">
import { ref } from "vue";
import type { Guess } from "@/API";
import HistoryItem from "./HistoryItem.vue";
import CustomCard from "../CustomCard.vue";

defineProps<{
  guesses: Guess[];
}>();

const current = ref<number>(1);
const pageSize = ref<number>(10);
</script>

<template>
  <CustomCard style="padding: 0">
    <HistoryItem
      v-for="guess in guesses.slice(
        pageSize * (current - 1),
        pageSize * current
      )"
      :guess="guess"
      :key="current"
    />
    <div class="pages">
      <a-pagination
        v-model:pageSize="pageSize"
        v-model:current="current"
        :total="guesses.length"
        :defaultPageSize="10"
        :showSizeChanger="false"
      ></a-pagination>
    </div>
  </CustomCard>
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
