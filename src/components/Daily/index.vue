<script setup lang="ts">
import DailyGame from "./DailyGame.vue";
import DailyArchive from "./DailyArchive.vue";
import DailyButtons from "./DailyButtons.vue";
import { ref, onMounted } from "vue";
interface DailyGuess {
  placements: string[];
  rankedMatch: object[];
  rank: string;
  date: string;
  category: string;
  verifiedRank: string;
  region: string;
}

defineProps<{ date: string; category: string }>();

const dailyHistory = ref<DailyGuess[]>([]);
onMounted(() => {
  const hist = window.localStorage.getItem("dailyHistory");
  if (hist) {
    dailyHistory.value = JSON.parse(hist);
  } else {
    window.localStorage.setItem("dailyHistory", JSON.stringify([]));
    dailyHistory.value = [];
  }
});

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

const now = new Date();
const today = ref<string>(
  new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0]
);

function update() {
  const now = new Date();
  today.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0];
}

function guessedBefore(date: string, category: string): DailyGuess | void {
  return dailyHistory.value.find(
    (d) => d.date === date && d.category === category
  );
}
function updateHistory(guess: DailyGuess) {
  dailyHistory.value = [...dailyHistory.value, guess];
  window.localStorage.setItem(
    "dailyHistory",
    JSON.stringify(dailyHistory.value)
  );
}
</script>
<template>
  <div class="daily" v-if="!category">
    <div>
      <div>
        <h2>Daily</h2>
        <h3 style="margin: 0">Updates every day at 5 am (UTC)</h3>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          "
        >
          <div class="timer">
            <h3>Updates in:</h3>
            <a-statistic-countdown
              :value="timer"
              @finish="update()"
              valueStyle="font-size: 1.17em;"
            />
          </div>
          <h3>Set 11, All Regions</h3>
        </div>
      </div>
    </div>
    <div>
      <div class="buttons">
        <div style="width: 100%">
          <h3>
            <b>Low Ranks</b>
          </h3>
          <h5>Iron, Bronze, Silver, Gold, Platinum</h5>
        </div>
        <div style="width: 100%">
          <h3>
            <b>High Ranks</b>
          </h3>
          <h5>Emerald, Diamond, Master, Grandmaster, Challenger</h5>
        </div>
        <div style="width: 100%">
          <h3>
            <b>All Ranks</b>
          </h3>
          <h5>Both Low and High</h5>
        </div>
      </div>
      <DailyArchive :guessedBefore="guessedBefore" />
    </div>
  </div>
  <div v-else>
    <DailyGame
      :date="date"
      :category="category"
      :prev="guessedBefore(date, category)"
      @update-history="(guess) => updateHistory(guess)"
    />
  </div>
</template>
<style>
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
</style>
