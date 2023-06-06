<script setup lang="ts">
import { InfoCircleOutlined } from "@ant-design/icons-vue";

const props = defineProps<{
  verifiedRank: string;
  selectedRank: string;
  selectedRanks: string[];
  verifiedGuess: string[];
}>();

function calculateScore() {
  var score = 0;
  const MAX_POINTS = 8; // For each correct placement (divide depending on how far guess was)
  for (let i = 0; i < props.verifiedGuess.length; i++) {
    if (parseInt(props.verifiedGuess[i]) - (i + 1) !== 0) {
      score +=
        MAX_POINTS / Math.abs(parseInt(props.verifiedGuess[i]) - (i + 1));
    } else {
      score += MAX_POINTS;
    }
    console.log(score);
  }

  var MAX_RANK_POOL = 9; // 9 ranks in total
  var MAX_RANK_POINTS = 36; // If rank pool had all 9 ranks

  const selectedRankInd = props.selectedRanks.indexOf(props.selectedRank);
  const verifiedRankInd = props.selectedRanks.indexOf(props.verifiedRank);
  const currentMax =
    MAX_RANK_POINTS * (props.selectedRanks.length / MAX_RANK_POOL); // Depends on # of ranks in pool

  if (Math.abs(selectedRankInd - verifiedRankInd) === 0) {
    score += currentMax;
  }

  return `${Math.round(score * 100) / 100} / ${MAX_POINTS * 8 + currentMax}`;
}
</script>
<template>
  <div class="score-div">
    <h2 class="score">Score: {{ calculateScore() }}</h2>
    <InfoCircleOutlined class="info" />
  </div>
</template>
<style scoped>
.score-div {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  justify-items: start;
  align-items: center;
}

.score {
  margin: 0;
  white-space: nowrap;
  padding: 0 0.75rem;
}

.info {
  font-size: 1.2rem;
}
</style>
