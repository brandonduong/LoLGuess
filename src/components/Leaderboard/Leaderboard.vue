<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import { type GetLeaderboardQuery, type Leaderboard } from "../../API";
import LeaderboardItem from "./LeaderboardItem.vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import type { GraphQLQuery } from "@aws-amplify/api";
import * as queries from "../../graphql/queries";
import { API } from "aws-amplify";

const current = ref<number>(1);
const sorted = ref<string>("small");
const minRankPool = ref<number>(1);
const minGuesses = ref<number>(1);
const maxUnfinished = ref<number>(100);

const loading = ref<boolean>(true);
const leaderboard = ref<Leaderboard>();
async function getLeaderboard() {
  const getLeaderboard = await API.graphql<GraphQLQuery<GetLeaderboardQuery>>({
    query: queries.getLeaderboard,
    variables: {
      date: new Date().toISOString().split("T")[0],
    },
  });
  console.log(getLeaderboard);
  leaderboard.value = getLeaderboard.data!.getLeaderboard! as Leaderboard;
}

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "4rem",
    margin: "5rem 0 4.5rem 0",
  },
  spin: true,
});

onMounted(async () => {
  await getLeaderboard();
  console.log(leaderboard.value);

  loading.value = false;
});
</script>

<template>
  <div class="options">
    <a-radio-group v-model:value="sorted">
      <a-radio-button class="sorter" value="small">By Score</a-radio-button>
      <a-radio-button class="sorter" value="default"
        >By Correct Placements</a-radio-button
      >
      <a-radio-button class="sorter" value="large"
        >By Correct Ranks</a-radio-button
      >
    </a-radio-group>
    <div class="filters">
      <a-input-number
        v-model:value="minRankPool"
        addon-before="Min. Avg. Rank Pool"
      />
      <a-input-number v-model:value="minGuesses" addon-before="Min. Guesses" />
      <a-input-number
        v-model:value="maxUnfinished"
        addon-before="Max Unfinished"
      />
    </div>
  </div>
  <div class="leaderboard-header">
    <h2>Rank</h2>
    <h2>Username</h2>
    <h2>Score</h2>
    <h2>Correct Placements</h2>
    <h2>Correct Ranks</h2>
  </div>
  <div v-if="!loading" class="leaderboard-items">
    <LeaderboardItem
      v-for="(sub, index) in leaderboard!.byScore!.slice(100 * (current - 1), 100 * current)"
      :sub="sub!"
      :rank="100 * (current - 1) + index + 1"
    />
  </div>
  <div v-else><a-spin :indicator="indicator"></a-spin></div>
  <div class="pages">
    <a-pagination
      v-model:current="current"
      :total="leaderboard?.byScore!.length"
      :defaultPageSize="100"
      :showSizeChanger="false"
    />
  </div>
</template>

<style scoped>
.pages {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.leaderboard-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  padding: 1rem 0;
  align-items: center;
  justify-items: center;
  border: solid 1px lightslategray;
}

.leaderboard-header > h2 {
  margin: 0;
}

label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.sorter {
  border-color: lightslategray !important;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: none;
}
label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.sorter::before {
  background-color: lightslategray;
}

.sorter:hover {
  color: lightslategray;
}

.sorter {
  border-width: 1px 1px 0 1px;
}

.options {
  display: flex;
  justify-content: space-between;
}

.filters {
  display: flex;
}
</style>
