<script setup lang="ts">
import { h, onMounted, onUpdated, ref } from "vue";
import { type User } from "../../API";
import LeaderboardItem from "./LeaderboardItem.vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import http from "../../common/http-common";
import { CaretDownOutlined } from "@ant-design/icons-vue";
const auth = useAuthenticator();

const current = ref<number>(1);

// Watch variable sorted
const sorted = ref<string>("byScore");
const oldSorted = ref<string>("byScore");

// For update countdown
const nowToronto = new Date(
  new Date().toLocaleString("en-US", {
    timeZone: "America/Toronto",
  })
);
const updateUTC = Date.UTC(
  nowToronto.getUTCFullYear(),
  nowToronto.getUTCMonth(),
  nowToronto.getUTCDate() + 1,
  0,
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

function getLeaderboardHeaderClass(value: string) {
  return `filter ` + (sorted.value === value ? `selected` : ``);
}

const filters = [
  {
    filter: "byScore",
    title: "Score",
  },
  {
    filter: "byCorrectPlacements",
    title: "Cor. Placements",
  },
  {
    filter: "byCorrectRanks",
    title: "Cor. Ranks",
  },
  {
    filter: "byAverageScore",
    title: "Avg. Score",
  },
  {
    filter: "byAverageCorrectPlacements",
    title: "Avg. Cor. Placements",
  },
];
</script>

<template>
  <div class="options">
    <div class="timer">
      Updates in:
      <a-statistic-countdown
        :value="timer"
        @finish="update()"
        valueStyle="font-size: 1.25rem"
      />
    </div>
  </div>
  <div class="table">
    <div class="leaderboard-header">
      <h3>Rank</h3>
      <h3>Username</h3>
      <div
        v-for="filter in filters"
        class="leaderboard-header-item"
        @click="() => (sorted = filter.filter)"
      >
        <h3 :class="getLeaderboardHeaderClass(filter.filter)">
          {{ filter.title }}
        </h3>
        <CaretDownOutlined
          v-if="filter.filter === sorted"
          style="font-size: 1.5rem; color: rgba(0, 0, 0, 0.85)"
        />
      </div>
    </div>
    <div v-if="!loading" class="leaderboard-items">
      <LeaderboardItem
        v-for="(user, index) in leaderboard"
        :user="user"
        :rank="100 * (current - 1) + index + 1"
      />
    </div>
    <div class="loading" v-else><a-spin :indicator="indicator"></a-spin></div>
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
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr 1.25fr;
  justify-content: space-between;
  column-gap: 1rem;
  padding: 0.5rem;
  align-items: center;
  justify-items: center;
  border-bottom: solid 1px lightslategray;
}

.leaderboard-header > h3 {
  margin: 0;
  color: lightslategray;
}

.options {
  display: flex;
  justify-content: space-between;
}

.timer {
  display: grid;
  align-items: center;
  grid-template-columns: auto auto;
  column-gap: 0.5rem;
  font-size: 1.25rem;
  color: rgba(0, 0, 0, 0.85);
}

.table {
  display: flex;
  flex-direction: column;
  border: solid 1px lightslategray;
  min-width: -webkit-min-content;
}

.filter {
  cursor: pointer;
  margin: 0;
}

.selected {
  text-decoration: underline;
}

.leaderboard-header-item {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}
</style>
