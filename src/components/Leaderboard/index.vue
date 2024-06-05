<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { type User } from "../../API";
import http from "../../common/http-common";
import { CaretDownOutlined } from "@ant-design/icons-vue";
import Loading from "../Loading.vue";
import { roundToTwo } from "@/common/helper";
import CustomCard from "../CustomCard.vue";
// Watch variable sorted
const sorted = ref<string>("byScore");

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
    },
  };
  let url = `/getLeaderboard?sort=${sorted.value}`;

  await http.api.get(url, header).then((res) => {
    leaderboard.value = res.data.users;
  });
}

onMounted(async () => {
  await update();
});

watch(sorted, async (sorted, oldSorted) => {
  if (oldSorted !== sorted) {
    oldSorted = sorted;
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
    title: "Correct Placements",
  },
  {
    filter: "byCorrectRanks",
    title: "Correct Ranks",
  },
  {
    filter: "byAverageScore",
    title: "Average Score",
  },
  {
    filter: "byAverageCorrectPlacements",
    title: "Average Correct Placements",
  },
];
</script>

<template>
  <h3 class="gold">LEADERBOARD</h3>
  <p>Updates every day at 12 am (UTC)</p>
  <div class="options">
    <div class="timer">
      <h5>UPDATES IN:</h5>
      <a-statistic-countdown
        :value="timer"
        :valueStyle="{
          color: 'var(--color-offwhite)',
          'line-height': '18pt',
          'letter-spacing': '0.075em',
          'font-size': '14pt',
          'font-family': 'beaufort_for_lolbold',
          'font-weight': 700,
          'font-style': 'normal',
        }"
      />
    </div>
    <div>
      <h5 style="text-align: end">MINIMUM 10 GUESSES</h5>
    </div>
  </div>
  <CustomCard
    style="overflow: hidden; overflow-x: auto; align-items: start; padding: 0"
  >
    <table class="table-leaderboard">
      <tr>
        <th><p>Rank</p></th>
        <th><p>Username</p></th>
        <th
          v-for="filter in filters"
          :style="loading ? `pointer-events:none;` : ``"
          @click="() => (sorted = filter.filter)"
        >
          <div class="t-header" @click="() => (sorted = filter.filter)">
            <a @click="() => (sorted = filter.filter)">
              <p :class="getLeaderboardHeaderClass(filter.filter)">
                {{ filter.title }}
              </p>
            </a>
            <CaretDownOutlined
              style="font-size: 1.5rem; color: var(--color-gold)"
              :style="
                filter.filter === sorted
                  ? 'color: var(--color-gold)'
                  : 'color: var(--color-offwhite)'
              "
            />
          </div>
        </th>
      </tr>
      <tr
        v-if="!loading && leaderboard && leaderboard.length > 0"
        v-for="(user, index) in leaderboard"
      >
        <td>
          <p>{{ index + 1 }}</p>
        </td>
        <td>
          <p>
            <RouterLink :to="`/profile/${user.id}`">{{
              user.username.split(" ")[0]
            }}</RouterLink>
          </p>
        </td>
        <td>
          <p>{{ Math.round(user.score) }}</p>
        </td>
        <td>
          <p>{{ user.correctPlacements }}</p>
        </td>
        <td>
          <p>{{ user.correctRanks }}</p>
        </td>
        <td>
          <p>{{ roundToTwo(user.averageScore) }}</p>
        </td>
        <td>
          <p>{{ roundToTwo(user.averageCorrectPlacements) }}</p>
        </td>
      </tr>
    </table>
    <div class="loading" v-if="loading">
      <Loading />
    </div>
  </CustomCard>
</template>

<style scoped>
.options {
  display: flex;
  justify-content: space-between;
}

.timer {
  display: flex;
  column-gap: 0.5rem;
  flex-wrap: wrap;
}

.t-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  text-decoration: underline;
}

.loading {
  width: 100%;
}

.filter,
th > p {
  margin: 0.5rem;
  color: rgb(240, 230, 210);
}

.empty {
  padding: 2rem 0;
}

.selected {
  color: var(--color-gold);
}

.table-leaderboard {
  width: 100%;
}

td {
  padding: 0.5rem;
}

td > p {
  margin: 0;
  color: rgb(240, 230, 210);
}

tr:nth-child(even) {
  background-color: var(--color-background-gray);
}

.options > div > h5 {
  margin: 0;
}
</style>
