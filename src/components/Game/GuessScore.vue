<script setup lang="ts">
import { ref } from "vue";
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import { calculateScore } from "../../common/helper";

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
    <h2 class="score">Score: {{ `${scored}/ ${maxScore}` }}</h2>
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
