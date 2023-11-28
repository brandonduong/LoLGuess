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
    <div>
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
      <span
        v-if="guess.regions"
        class="regions"
        :title="guess.regions.toString()"
      >
        {{ guess.regions.join(", ") }}
      </span>
      <h3 v-else>N/A</h3>
    </div>

    <div>
      <h3 class="ranks">
        Rank Pool:
        <RankIcon v-for="rank in guess.ranks" :rank="rank" />
      </h3>
      <h3>{{ guess.placements.map((place) => parseInt(place)).join(", ") }}</h3>
    </div>

    <div v-if="reveal">
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
  grid-template-columns: 0.2fr 0.7fr 1fr auto;
  border: solid 1px lightslategray;
  padding: 0.5rem 1rem;
  align-items: center;
}

.history-item > h3 {
  margin: 0;
}

h3.regions {
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 1rem;
}
</style>
