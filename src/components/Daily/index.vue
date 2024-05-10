<script setup lang="ts">
import HomeButton from "../Home/HomeButton.vue";
import DailyGame from "./DailyGame.vue";
import { ref, onMounted } from "vue";
import { calculateScore } from "@/common/helper";
import { useRouter } from "vue-router";

interface DailyGuess {
  placements: string[];
  rankedMatch: object[];
  rank: string;
  date: string;
  category: string;
  verifiedRank: string;
  region: string;
}
const router = useRouter();
defineProps<{ date: string; category: string }>();

const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const all = [...low, ...high];

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

function getDailyDates() {
  const startOfDailies = new Date("03/21/2024"); // Only support most recent set
  const dailies = [];
  var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  while (date >= startOfDailies) {
    console.log(date, startOfDailies);
    dailies.push(date.toISOString().split("T")[0]);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    console.log(date);
  }
  console.log(dailies);
  return dailies;
}

function guessedBefore(date: string, category: string): DailyGuess | void {
  return dailyHistory.value.find(
    (d) => d.date === date && d.category === category
  );
}

const buttonDescriptions = {
  low: "Iron, Bronze, Silver, Gold, Platinum",
  high: "Emerald, Diamond, Master, Grandmaster, Challenger",
  all: "Both Low and High",
};

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
          <div>
            <b>{{ today }}</b>
          </div>
        </div>
      </div>
      <div class="buttons">
        <HomeButton
          v-for="cat in ['low', 'high', 'all']"
          :title="
            cat.substring(0, 1).toUpperCase() + cat.substring(1) + ' Ranks'
          "
          :onClick="() => router.push(`/daily/${today}/${cat}`)"
          :description="buttonDescriptions[cat as keyof typeof buttonDescriptions]"
        >
          <div v-for="prev in [guessedBefore(today, cat)]">
            <h5 v-if="prev">
              {{
                calculateScore(
                  prev.placements,
                  prev.rank,
                  prev.verifiedRank,
                  cat === "all" ? all : cat === "high" ? high : low
                ).join(" / ")
              }}
            </h5>
            <h5 v-else>---</h5>
          </div>
        </HomeButton>
      </div>
    </div>
    <div>
      <h3>Archive</h3>
      <h5>Only supports the most recent set</h5>
      <div v-for="d in getDailyDates()">
        <h4 style="text-align: end; margin: 0">
          <b>{{ d }}</b>
        </h4>
        <div class="buttons">
          <HomeButton
            v-for="cat in ['low', 'high', 'all']"
            :title="
              cat.substring(0, 1).toUpperCase() + cat.substring(1) + ' Ranks'
            "
            :onClick="() => router.push(`/daily/${d}/${cat}`)"
            :description="buttonDescriptions[cat as keyof typeof buttonDescriptions]"
          >
            <div v-for="prev in [guessedBefore(d, cat)]">
              <h5 v-if="prev">
                {{
                  calculateScore(
                    prev.placements,
                    prev.rank,
                    prev.verifiedRank,
                    cat === "all" ? all : cat === "high" ? high : low
                  ).join(" / ")
                }}
              </h5>
              <h5 v-else>---</h5>
            </div>
          </HomeButton>
        </div>
      </div>
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

@media only screen and (max-width: 720px) {
  .buttons {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
