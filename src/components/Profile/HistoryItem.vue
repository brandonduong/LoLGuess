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
    <h3 v-if="guess.regions" class="regions" :title="guess.regions.toString()">
      [ {{ guess.regions.join(", ") }} ]
    </h3>
    <h3 v-else>N/A</h3>

    <h3 class="ranks">
      Rank Pool:
      <RankIcon v-for="rank in guess.ranks" :rank="rank" />
    </h3>
    <h3>Guessed Rank: <RankIcon :rank="guess.guessedRank" /></h3>

    <h3>{{ score }} / {{ maxScore }}</h3>
    <h3>{{ guess.region || "N/A" }}</h3>
    <h3>{{ guess.placements.map((place) => parseInt(place)) }}</h3>

    <h3>
      Rank:
      <RankIcon :rank="guess.rank" />
    </h3>
  </div>
</template>

<style scoped>
.history-item {
  display: grid;
  grid-template-columns: 0.2fr 0.7fr 1fr auto;
  border: solid 1px lightslategray;
  padding: 0.5rem 1rem;
  align-items: center;
}

.history-item > h3 {
  margin: 0;
}

h3.regions {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 1rem;
}
</style>
