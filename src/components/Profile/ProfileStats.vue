<script setup lang="ts">
import { onMounted, ref, h } from "vue";
import { type User, type Guess } from "../../API";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import Stat from "./Stat.vue";
import { calculateScore, roundToTwo } from "../../common/helper";
import { RedoOutlined } from "@ant-design/icons-vue";

const emit = defineEmits(["getStaticProfileData"]);

const props = defineProps<{
  staticProfileData: User;
}>();

// Stats
const guesses = ref<number>(0);
const score = ref<number>(0);
const maxScore = ref<number>(0);
const correct = ref<number>(0);
const maxCorrect = ref<number>(0);
const correctRank = ref<number>(0);
const averageRankPool = ref<number>(0);

onMounted(async () => {
  // Initialize stats
  guesses.value = (props.staticProfileData as any).guesses.items.length;
  [score.value, maxScore.value] = getTotalScore();
  [correct.value, maxCorrect.value] = getTotalCorrectPlacements();
  correctRank.value = getTotalCorrectRanks();
  averageRankPool.value = getAverageRankPool();
});

function getTotalScore() {
  var score = 0;
  var maxScore = 0;
  (props.staticProfileData as any).guesses.items.forEach((guess: Guess) => {
    const calc = calculateScore(
      guess.placements,
      guess.guessedRank,
      guess.rank,
      guess.ranks
    );
    score += calc[0];
    maxScore += calc[1];
  });
  return [score, maxScore];
}

function getTotalCorrectPlacements() {
  var correct = 0;
  (props.staticProfileData as any).guesses.items.forEach((guess: Guess) => {
    for (let i = 0; i < guess.placements.length; i++) {
      if (parseInt(guess.placements[i]) === i + 1) {
        correct += 1;
      }
    }
  });

  const maxCorrect = (props.staticProfileData as any).guesses.items.length * 8;
  return [correct, maxCorrect];
}

function getTotalCorrectRanks() {
  var correct = 0;
  (props.staticProfileData as any).guesses.items.forEach((guess: Guess) => {
    if (guess.rank === guess.guessedRank) {
      correct += 1;
    }
  });
  return correct;
}

function getAverageRankPool() {
  var pool = 0;
  (props.staticProfileData as any).guesses.items.forEach((guess: Guess) => {
    pool += guess.ranks.length;
  });
  return pool / (props.staticProfileData as any).guesses.items.length;
}

function refresh() {
  emit("getStaticProfileData");
}
</script>
<template>
  <div class="stats">
    <h2 class="stats-title">
      {{
        staticProfileData.username.charAt(0).toUpperCase() +
        staticProfileData.username.slice(1)
      }}
    </h2>
    <div class="refresh">
      <a-button class="refresh-btn" type="primary" @click="refresh"
        ><RedoOutlined style="font-size: 1.5rem; color: white"
      /></a-button>
    </div>
    <hr class="stats-divider" />
    <Stat title="Guesses" :value="`${guesses}`" />
    <Stat
      title="Unfinished Guesses"
      :value="`${staticProfileData?.unfinished}`"
    />
    <Stat title="Score" :value="`${score} / ${maxScore}`" />
    <Stat title="Avg. Score" :value="`${roundToTwo(score / guesses)}`" />
    <Stat title="Correct Placements" :value="`${correct} / ${maxCorrect}`" />
    <Stat
      title="Avg. Cor. Placements"
      :value="`${roundToTwo(correct / guesses)}`"
    />
    <Stat title="Correct Ranks" :value="`${correctRank}`" />
    <Stat title="Average Rank Pool" :value="`${roundToTwo(averageRankPool)}`" />
  </div>
</template>
<style scoped>
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  border: solid 1px lightslategray;
  padding: 1rem 1.5rem;
  align-items: center;
}

.stats-title {
  margin: 0;
}

.stats-divider {
  grid-column: span 2;
}

.refresh {
  display: flex;
  justify-content: flex-end;
}

.refresh-btn {
  padding: 0.18rem 0.5rem 0;
}
</style>
