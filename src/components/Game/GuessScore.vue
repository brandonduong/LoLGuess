<script setup lang="ts">
import { calculateScore } from "../../common/helper";
import CustomInfo from "../Profile/CustomInfo.vue";

const props = defineProps<{
  verifiedRank: string;
  selectedRank: string;
  selectedRanks: string[];
  verifiedGuess: string[];
}>();

const [scored, maxScore] = calculateScore(
  props.verifiedGuess,
  props.selectedRank,
  props.verifiedRank,
  props.selectedRanks
);
</script>
<template>
  <div class="score-div">
    <p class="score">
      Score: ({{ Math.round(scored / maxScore * 100) }} %)
      <h4 class="number" style="margin: 0; display: inline-block;">{{ `${scored} / ${maxScore}` }}</h4>
    </p>
    <CustomInfo>
      <h5 class="gold">Placements:</h5>
      <p style="color: var(--color-offwhite)">
        Guessing a player's placement gives points based on how far the guess
        is. 8, 6, or 3 points are awarded if the guess is off by 0, 1, or 2
        positions.
      </p>

      <h5 class="gold">Rank:</h5>
      <p style="color: var(--color-offwhite); margin: 0">
        Guessing the rank gives points based on how far the guess is and how
        many ranks were included in the pool. A maximum 36, 27, or 13.5 points
        are awarded if the guess is off by 0, 1, or 2 positions. For every 1
        rank that isn't included in the full pool of 10 ranks, those maximum
        points will decrease following the equation (maximum * # of ranks in
        pool / 10). If the pool size is smaller than 4, 0 points are awarded.
      </p>
    </CustomInfo>
  </div>
</template>
<style scoped>
.score-div {
  display: flex;
  justify-items: start;
  align-items: center;
  column-gap: 0.75rem;
}

.score {
  margin: 0;
  white-space: nowrap;
}

.info {
  font-size: 1.2rem;
}

.score-info {
  max-width: 20rem;
}
</style>
