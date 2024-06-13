<script setup lang="ts">
import DailyGame from "./DailyGame.vue";
import DailyArchive from "./DailyArchive.vue";
import DailyButtons from "./DailyButtons.vue";
import { ref, onMounted } from "vue";
import CustomCard from "../CustomCard.vue";
import CustomTabs from "./CustomTabs.vue";
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
const loading = ref(true);

onMounted(() => {
  loading.value = true;
  const hist = window.localStorage.getItem("dailyHistory");
  if (hist) {
    dailyHistory.value = JSON.parse(hist);
  } else {
    window.localStorage.setItem("dailyHistory", JSON.stringify([]));
    dailyHistory.value = [];
  }
  loading.value = false;
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

function guessedBefore(date: string, category: string): DailyGuess | null {
  const hist = dailyHistory.value.find(
    (d) => d.date === date && d.category === category
  );
  return hist || null;
}
function updateHistory(guess: DailyGuess) {
  dailyHistory.value = [...dailyHistory.value, guess];
  window.localStorage.setItem(
    "dailyHistory",
    JSON.stringify(dailyHistory.value)
  );
}

const option = ref<string>("low");
</script>
<template>
  <div class="daily" v-if="!category && !loading">
    <h3 class="gold">DAILY</h3>
    <p>Updates every day at 12 am (UTC)</p>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      "
    >
      <div class="timer">
        <h5 style="margin: 0">UPDATES IN:</h5>
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
        <h5 style="margin: 0; text-align: end">SET 11</h5>
      </div>
    </div>

    <CustomCard style="align-items: normal; padding: 0">
      <CustomTabs
        :options="['low', 'high', 'all']"
        :optionTitles="['Low Ranks', 'High Ranks', 'All Ranks']"
        :option="option"
        @update-option="(newOption) => (option = newOption)"
      />
      <DailyArchive :guessed-before="guessedBefore" :option="option" />
    </CustomCard>
  </div>
  <div v-else-if="!loading">
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
  padding: 1rem 0;
  text-align: center;
}

.timer {
  display: flex;
  column-gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
