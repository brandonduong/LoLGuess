<script setup lang="ts">
import { ref, onUpdated, onMounted } from "vue";
import type { Guess } from "@/API";
import { calculateScore } from "@/common/helper";
import RankIcon from "../Game/RankIcon.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  guess: Guess;
}>();

const score = ref<number>(0);
const maxScore = ref<number>(0);
const router = useRouter();

onMounted(() => {
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

const reveal = ref<boolean>(false);
</script>

<template>
  <div class="history-item">
    <div class="date">
      <h3>
        {{
          new Date(guess.createdAt).toLocaleString("default", {
            month: "short",
            day: "numeric",
          })
        }}
      </h3>
      <h3>{{ score }} / {{ maxScore }}</h3>
    </div>

    <div>
      <h4
        v-if="guess.regions"
        class="regions"
        :title="guess.regions.toString()"
      >
        {{ guess.regions.join(", ") }}
      </h4>
      <h3 v-else>N/A</h3>
    </div>

    <div>
      <h3 class="ranks">
        <RankIcon v-for="rank in guess.ranks" :rank="rank" />
      </h3>
      <h3>{{ guess.placements.map((place) => parseInt(place)).join(", ") }}</h3>
    </div>

    <div class="reveal" v-if="reveal">
      <h3>Guessed Rank: <RankIcon :rank="guess.guessedRank" /></h3>

      <h3>
        Rank:
        <RankIcon :rank="guess.rank" />
      </h3>
    </div>
    <div v-else>
      <a-button type="default" @click="() => (reveal = !reveal)"
        >Reveal</a-button
      >
      <a-button
        v-if="props.guess.matchId"
        type="primary"
        @click="() => router.push(`/play/${props.guess.id}`)"
        >Replay</a-button
      >
    </div>
  </div>
</template>

<style scoped>
.history-item {
  display: grid;
  grid-template-columns: auto 0.7fr 0.5fr auto;
  border: solid 1px lightslategray;
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 1rem;
}

.history-item > h3 {
  margin: 0;
}

h4.regions {
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

@media only screen and (max-width: 720px) {
  .history-item {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .reveal,
  .date {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
