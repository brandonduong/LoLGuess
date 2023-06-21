<script setup lang="ts">
import { h, onMounted, onUpdated, ref } from "vue";
import { type User } from "../../API";
import LeaderboardItem from "./LeaderboardItem.vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import http from "../../common/http-common";
const auth = useAuthenticator();

const current = ref<number>(1);
const sorted = ref<string>("byScore");
const oldSorted = ref<string>("byScore");
const now = new Date();
const updateUTC = Date.UTC(
  now.getUTCFullYear(),
  now.getUTCMonth(),
  now.getUTCDate() + 1,
  4,
  0,
  0
);
const timer = ref<number>(updateUTC);

const loading = ref<boolean>(true);
const leaderboard = ref<User[]>([]);

async function getLeaderboard() {
  const header = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${auth.user.signInUserSession.idToken.jwtToken}`,
    },
  };
  let url = `/getLeaderboard?sort=${sorted.value}`;

  await http.api.get(url, header).then((res) => {
    console.log(res);
    leaderboard.value = res.data.users;
  });
}

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "4rem",
    margin: "5rem 0 4.5rem 0",
  },
  spin: true,
});

onMounted(async () => {
  await update();
  console.log(leaderboard.value);
});

onUpdated(async () => {
  if (oldSorted.value !== sorted.value) {
    oldSorted.value = sorted.value;
    await update();
  }
});

async function update() {
  loading.value = true;
  var staticLeaderboard = window.localStorage.getItem("staticLeaderboard");
  if (!staticLeaderboard) {
    staticLeaderboard = "{}";
  }
  var parsed = JSON.parse(staticLeaderboard);

  if (parsed.date !== new Date().toISOString().split("T")[0]) {
    window.localStorage.removeItem("staticLeaderboard");
    parsed = {};
  }

  if (parsed[sorted.value]) {
    leaderboard.value = parsed[sorted.value];
  } else {
    await getLeaderboard().then(() => {
      const cpy = parsed;
      cpy[sorted.value] = leaderboard.value;
      cpy.date = new Date().toISOString().split("T")[0];

      localStorage.setItem("staticLeaderboard", JSON.stringify(cpy));
    });
  }
  loading.value = false;
}
</script>

<template>
  <div class="options">
    <a-radio-group v-model:value="sorted">
      <a-radio-button class="sorter" value="byScore">By Score</a-radio-button>
      <a-radio-button class="sorter" value="byCorrectPlacements"
        >By Correct Placements</a-radio-button
      >
      <a-radio-button class="sorter" value="byCorrectRanks"
        >By Correct Ranks</a-radio-button
      >
    </a-radio-group>
    <div class="filters">
      Updates in: {{ timer }}
      <a-statistic-countdown :value="timer" @finish="update()" />
      Last updated:
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
      v-for="(user, index) in leaderboard.slice(
        100 * (current - 1),
        100 * current
      )"
      :user="user"
      :rank="100 * (current - 1) + index + 1"
    />
  </div>
  <div v-else><a-spin :indicator="indicator"></a-spin></div>
  <div class="pages">
    <a-pagination
      v-model:current="current"
      :total="leaderboard.length"
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
