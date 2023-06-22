<script setup lang="ts">
import { ref, onUpdated, onMounted } from "vue";
import type { Guess } from "@/API";
import { calculateScore } from "@/common/helper";
import RankIcon from "../Game/RankIcon.vue";

const props = defineProps<{
  guess: Guess;
}>();

const score = ref<number>(0);
const maxScore = ref<number>(0);
onMounted(() => {
  updateScore();
});

onUpdated(() => {
  updateScore();
});

function updateScore() {
  [score.value, maxScore.value] = calculateScore(
    props.guess.placements,
    props.guess.guessedRank,
    props.guess.rank,
    props.guess.ranks
  );
}
</script>

<template>
  <div class="history-item">
    <h3>
      {{
        new Date(guess.createdAt).toLocaleString("default", {
          month: "short",
          day: "numeric",
        })
      }}
    </h3>
    <h3>
      Rank Pool:
      <RankIcon v-for="rank in guess.ranks" :rank="rank" />
    </h3>

    <h3>
      Rank:
      <RankIcon :rank="guess.rank" />
    </h3>
    <h3>{{ score }} / {{ maxScore }}</h3>
    <h3>Placements: {{ guess.placements.map((place) => parseInt(place)) }}</h3>
    <h3>Guessed Rank: <RankIcon :rank="guess.guessedRank" /></h3>
  </div>
</template>

<style scoped>
.history-item {
  display: grid;
  grid-template-columns: 0.45fr 0.75fr auto;
  border: solid 1px lightslategray;
  padding: 0.5rem 1rem;
  align-items: center;
}

.history-item > h3 {
  margin: 0;
}
</style>
