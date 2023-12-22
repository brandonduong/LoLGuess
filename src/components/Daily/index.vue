<script setup lang="ts">
import HomeButton from "../Home/HomeButton.vue";
import DragAndDropTable from "../Game/DragAndDropTable.vue";
import GuessRank from "../Game/GuessRank.vue";
import GuessScore from "../Game/GuessScore.vue";
import GuessRegion from "../Game/GuessRegion.vue";
import http from "../../common/http-common";
import { ref, watch, h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

const all = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Emerald",
  "Diamond",
  "Master",
  "Grandmaster",
  "Challenger",
];
const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];

const loading = ref<boolean>(false);
const category = ref<string>("");
const rankedMatch = ref<object[]>([]);
const selectedGuess = ref<string[]>([]);
const selectedRanks = ref<string[]>([]);
const selectedRank = ref<string>("");
const verifiedGuess = ref<string[]>([]);
const verifiedRank = ref<string>("");
const verifiedRegion = ref<string>("");

// For update countdown
const nowToronto = new Date(
  new Date().toLocaleString("en-US", {
    timeZone: "America/Toronto",
  })
);
const updateUTC = Date.UTC(
  nowToronto.getUTCFullYear(),
  nowToronto.getUTCMonth(),
  nowToronto.getUTCDate(),
  5,
  0,
  0
);
const timer = ref<number>(updateUTC);

const now = new Date();
const today = ref<string>(
  new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0]
);

function update() {
  const now = new Date();
  const today = ref<string>(
    new Date(now.getFullYear(), now.getMonth(), now.getDate())
      .toISOString()
      .split("T")[0]
  );
}

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "4rem",
    margin: "5rem 0 4.5rem 0",
    color: "lightslategray",
  },
  spin: true,
});

function reset() {
  verifiedGuess.value = [];
  verifiedRank.value = "";
  verifiedRegion.value = "";
  selectedRank.value = "";
  category.value = "";
  rankedMatch.value = [];
}

function guess() {
  console.log(selectedGuess.value, selectedRank.value);
}

async function getDaily(cat) {
  let url = "/getDaily?";
  url += `date=${today.value}&category=${cat}`;

  const header = {
    headers: {
      "Content-type": "application/json",
    },
  };

  await http.api
    .get(url, header)
    .then((res) => {
      //console.log(res);
      rankedMatch.value = res.data.dailyMatch;
      selectedRanks.value = cat === "all" ? all : cat === "high" ? high : low;
    })
    .catch((error) => {
      alert("Error finding ranked match. Please try again.");
    });
}

watch(category, async (newVal, oldVal) => {
  //console.log(category.value);
  if (newVal) {
    loading.value = true;
    await getDaily(newVal);
    loading.value = false;
  }
});
</script>
<template>
  <div class="daily" v-if="!category">
    <div>
      <div>
        <h2>Daily</h2>
        <h3 style="margin: 0">Updates every day at 12 am (EST)</h3>
        <div style="display: flex; justify-content: space-between">
          <div class="timer">
            <h3>Updates in:</h3>
            <a-statistic-countdown
              :value="timer"
              @finish="update()"
              valueStyle="font-size: 1.17em;"
            />
          </div>
          <div>
            <b>{{ today }}</b>
          </div>
        </div>
      </div>
      <div class="buttons">
        <HomeButton
          title="Low Ranks"
          :onClick="() => (category = 'low')"
          description="Iron, Bronze, Silver, Gold, Platinum"
        />
        <HomeButton
          title="High Ranks"
          :onClick="() => (category = 'high')"
          description="Emerald, Diamond, Master, Grandmaster, Challenger"
        />
        <HomeButton
          title="All Ranks"
          :onClick="() => (category = 'all')"
          description="Both Low and High"
        />
      </div>
    </div>
    <div>
      <h3>Archive</h3>
    </div>
  </div>
  <div v-else>
    <div class="steps-content">
      <div v-if="!loading">
        <DragAndDropTable
          :rankedMatch="rankedMatch"
          @update-selected-guess="selectedGuess = $event"
          :verifiedGuess="verifiedGuess"
          :selectedRanks="selectedRanks"
        />
        <div
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: '0.5rem',
            paddingLeft: '0.75rem',
          }"
        >
          <GuessRank
            :selectedRanks="selectedRanks"
            @update-selected-rank="selectedRank = $event"
            :selectedRank="selectedRank"
            :verifiedRank="verifiedRank"
            :loading="loading"
          />
          <GuessScore
            :selectedRank="selectedRank"
            :selectedRanks="selectedRanks"
            :verifiedRank="verifiedRank"
            :verifiedGuess="verifiedGuess"
            v-if="verifiedGuess.length > 0"
          />
          <GuessRegion
            :region="verifiedRegion"
            v-if="verifiedGuess.length > 0"
          />
        </div>
      </div>
      <div v-else><a-spin :indicator="indicator"></a-spin></div>
    </div>
    <div class="steps-action">
      <a-button @click="reset" class="action-btn">Previous</a-button>
      <a-button
        type="primary"
        @click="guess"
        class="action-btn"
        :disabled="!selectedRank || loading"
        >Guess</a-button
      >
    </div>
  </div>
</template>
<style scoped>
.daily {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  background: white;
  border: 1px solid lightslategray;
  border-radius: 0.25rem;
  overflow-x: auto;
  text-align: center;
  gap: 1rem;
}

.timer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.steps-content {
  border: 1px solid lightslategray;
  border-radius: 0.25rem;
  background-color: white;
  text-align: center;
  padding: 0.25rem 0.5rem 0.5rem;
}

.steps-action {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.action-btn {
  flex-basis: 50%;
}

@media only screen and (max-width: 720px) {
  .buttons {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
