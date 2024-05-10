<script setup lang="ts">
import { useRouter } from "vue-router";
import HomeButton from "../Home/HomeButton.vue";
import { calculateScore } from "@/common/helper";
const router = useRouter();

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
  date: string;
}>();

const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const all = [...low, ...high];

function correctionStyle(placement: number, ind: number) {
  // console.log(placement, props.verifiedGuess[placement - 1]);
  switch (Math.abs(placement - ind - 1)) {
    case 0:
      return "correct";
    case 1:
      return "yellow";
    case 2:
      return "orange";
    default:
      return "incorrect";
  }
}
</script>

<template>
  <HomeButton
    v-for="cat in ['low', 'high', 'all']"
    :onClick="() => router.push(`/daily/${date}/${cat}`)"
  >
    <div v-for="prev in [guessedBefore(date, cat)]">
      <div v-if="prev">
        <h3>
          <span
            v-for="(place, ind) in prev.placements.map((place) =>
              parseInt(place)
            )"
          >
            <span :class="correctionStyle(place, ind)"
              ><b>{{ place }}</b></span
            >
            <span v-if="ind != 7">, </span>
          </span>
        </h3>
        <h5>
          {{
            calculateScore(
              prev.placements,
              prev.rank,
              prev.verifiedRank,
              cat === "all" ? all : cat === "high" ? high : low
            ).join(" / ")
          }}
        </h5>
      </div>
      <h5 v-else>---</h5>
    </div>
  </HomeButton>
</template>
<style scoped>
.home-btn {
  white-space: normal;
  height: auto;
}
.incorrect {
  color: rgb(223, 88, 88);
}

.orange {
  color: rgb(223, 169, 88);
}

.yellow {
  color: rgb(238, 235, 69);
}

.correct {
  color: rgb(23, 219, 23);
}
</style>
