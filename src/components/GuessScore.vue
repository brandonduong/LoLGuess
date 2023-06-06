<script setup lang="ts">
const props = defineProps<{
  verifiedRank: string;
  selectedRank: string;
  selectedRanks: string[];
  verifiedGuess: string[];
}>();

function calculateScore() {
  var score = 0;
  const MAX_POINTS = 8; // For each correct placement (subtract depending on how far guess was)
  for (let i = 0; i < props.verifiedGuess.length; i++) {
    score += MAX_POINTS - Math.abs(parseInt(props.verifiedGuess[i]) - (i + 1));
  }

  var MAX_RANK_POOL = 9; // 9 ranks in total
  var MAX_RANK_POINTS = 36; // If rank pool had all 9 ranks

  const selectedRankInd = props.selectedRanks.indexOf(props.selectedRank);
  const verifiedRankInd = props.selectedRanks.indexOf(props.verifiedRank);
  const currentMax =
    MAX_RANK_POINTS * (props.selectedRanks.length / MAX_RANK_POOL); // Depends on # of ranks in pool
  score +=
    currentMax -
    (currentMax / props.selectedRanks.length) *
      Math.abs(selectedRankInd - verifiedRankInd);

  return Math.round(score * 100) / 100;
}
</script>
<template>
  <h2 class="score">Score: {{ calculateScore() }}</h2>
</template>
<style scoped>
.score {
  margin: 0;
}
</style>
