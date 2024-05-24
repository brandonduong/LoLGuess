<script setup lang="ts">
import { useRouter } from "vue-router";
import DailyButtons from "./DailyButtons.vue";
import { calculateScore } from "@/common/helper";
import HomeButton from "../Home/HomeButton.vue";

interface DailyGuess {
  placements: string[];
  rankedMatch: object[];
  rank: string;
  date: string;
  category: string;
  verifiedRank: string;
  region: string;
}

defineProps<{
  guessedBefore: (date: string, category: string) => void | DailyGuess;
  option: string;
}>();

function getDailyDates() {
  const startOfDailies = new Date("05/21/2024"); // Only support most recent set
  const dailies = [];
  const nowToronto = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Toronto",
    })
  );
  var date = new Date(
    nowToronto.getUTCFullYear(),
    nowToronto.getUTCMonth(),
    nowToronto.getUTCDate()
  );
  while (date >= startOfDailies) {
    console.log(date, startOfDailies);
    dailies.push(date.toISOString().split("T")[0]);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    console.log(date);
  }
  return dailies;
}

const router = useRouter();

const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const all = [...low, ...high];
</script>

<template>
  <div class="daily-grid">
    <div
      v-for="d in getDailyDates()"
      :onClick="() => router.push(`/daily/${d}/${option}`)"
      class="daily-button"
    >
      <div v-for="prev in [guessedBefore(d, option)]">
        <h5>{{ d }}</h5>
        <div v-if="prev">
          <p>
            <span
              v-for="(place, ind) in prev.placements.map((place) =>
                parseInt(place)
              )"
            >
              <span>{{ place }}</span>
              <span v-if="ind != 7">, </span>
            </span>
          </p>
          <p>
            {{
              calculateScore(
                prev.placements,
                prev.rank,
                prev.verifiedRank,
                option === "all" ? all : option === "high" ? high : low
              ).join(" / ")
            }}
          </p>
        </div>
        <div v-else>
          <p>---</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.daily-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 1rem;
  gap: 1rem;
}

.daily-button {
  background: var(--color-background-gray);
  padding-top: 1rem;
}

.daily-button:hover {
  background: var(--color-background-highlight-gray);
}
</style>
