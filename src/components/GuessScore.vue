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
  const MAX_POINTS = [8, 6, 3]; // For each correct placement (depending on how far guess was)
  for (let i = 0; i < props.verifiedGuess.length; i++) {
    const distance = Math.abs(parseInt(props.verifiedGuess[i]) - (i + 1));
    if (distance <= 2) {
      score += MAX_POINTS[distance];
    }
    console.log(score);
  }

  var MAX_RANK_POOL = 9; // 9 ranks in total
  var MAX_RANK_POINTS = [36, 27, 13.5]; // If rank pool had all 9 ranks

  const selectedRankInd = props.selectedRanks.indexOf(props.selectedRank);
  const verifiedRankInd = props.selectedRanks.indexOf(props.verifiedRank);
  const currentMax = MAX_RANK_POINTS.map((x) => {
    if (props.selectedRanks.length >= 4) {
      return (
        Math.round(x * (props.selectedRanks.length / MAX_RANK_POOL) * 100) / 100
      );
    } else {
      return 0;
    }
  }); // Depends on # of ranks in pool
  const distanceRank = Math.abs(selectedRankInd - verifiedRankInd);
  if (distanceRank <= 2 && props.selectedRanks.length >= 4) {
    score += currentMax[distanceRank];
  }
  console.log(score);

  return `${Math.round(score * 100) / 100} / ${
    MAX_POINTS[0] * 8 + currentMax[0]
  }`;
}
</script>
<template>
  <div class="score-div">
    <h2 class="score">Score: {{ calculateScore() }}</h2>
    <a-popover title="Scoring Information">
      <template #content>
        <div class="score-info">
          <h4>
            <b>Placements: </b>Guessing a player's placement gives points based
            on how far the guess is. 8, 6, or 3 points are awarded if the guess
            is off by 0, 1, or 2 positions.

            <br />

            <b>Rank: </b>Guessing the rank gives points based on how far the
            guess is and how many ranks were included in the pool. A maximum 36,
            27, or 13.5 points are awarded if the guess is off by 0, 1, or 2
            positions. For every 1 rank that isn't included in the full pool of
            9 ranks will decrease those maximum points following the equation
            (maximum * # of ranks in pool / 9). If the pool size is smaller than
            4, 0 points are awarded.
          </h4>
        </div>
      </template>
      <InfoCircleOutlined class="info" />
    </a-popover>
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

.score-info {
  max-width: 20rem;
}
</style>
