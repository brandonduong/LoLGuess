<script setup lang="ts">
import { onMounted, ref, h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { type GraphQLQuery } from "@aws-amplify/api";
import { type User, type GetUserQuery, type Guess } from "../../API";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import Stat from "./Stat.vue";
import { calculateScore, roundToTwo } from "../../common/helper";

const auth = useAuthenticator();

var staticProfileData = ref<User>();
const loading = ref<boolean>(true);

// Stats
const guesses = ref<number>(0);
const score = ref<number>(0);
const maxScore = ref<number>(0);
const correct = ref<number>(0);
const maxCorrect = ref<number>(0);
const correctRank = ref<number>(0);
const averageRankPool = ref<number>(0);

async function getStaticProfileData() {
  const getUser = await API.graphql<GraphQLQuery<GetUserQuery>>({
    query: queries.getUser,
    variables: { id: auth.user.attributes.sub },
  });
  staticProfileData.value = getUser.data!.getUser!;
}

onMounted(async () => {
  const staticData = window.localStorage.getItem("staticProfileData");
  if (staticData) {
    staticProfileData.value = JSON.parse(staticData);
  } else {
    await getStaticProfileData().then(() => {
      localStorage.setItem(
        "staticProfileData",
        JSON.stringify(staticProfileData.value)
      );
    });
  }
  console.log(staticProfileData.value);

  // Initialize stats
  guesses.value = (staticProfileData.value as any).guesses.items.length;
  [score.value, maxScore.value] = getTotalScore();
  [correct.value, maxCorrect.value] = getTotalCorrectPlacements();
  correctRank.value = getTotalCorrectRanks();
  averageRankPool.value = getAverageRankPool();

  loading.value = false;
});

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "4rem",
    margin: "5rem 0 4.5rem 0",
  },
  spin: true,
});

function getTotalScore() {
  var score = 0;
  var maxScore = 0;
  (staticProfileData as any).value.guesses.items.forEach((guess: Guess) => {
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
  (staticProfileData as any).value.guesses.items.forEach((guess: Guess) => {
    for (let i = 0; i < guess.placements.length; i++) {
      if (parseInt(guess.placements[i]) === i + 1) {
        correct += 1;
      }
    }
  });

  const maxCorrect = (staticProfileData as any).value.guesses.items.length * 8;
  return [correct, maxCorrect];
}

function getTotalCorrectRanks() {
  var correct = 0;
  (staticProfileData as any).value.guesses.items.forEach((guess: Guess) => {
    if (guess.rank === guess.guessedRank) {
      correct += 1;
    }
  });
  return correct;
}

function getAverageRankPool() {
  var pool = 0;
  (staticProfileData as any).value.guesses.items.forEach((guess: Guess) => {
    pool += guess.ranks.length;
  });
  return pool / (staticProfileData as any).value.guesses.items.length;
}
</script>
<template>
  <div v-if="!loading" class="stats">
    <h2 class="stats-title">
      {{
        auth.user.username.charAt(0).toUpperCase() + auth.user.username.slice(1)
      }}
    </h2>
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
      title="Avg. Correct Placements"
      :value="`${roundToTwo(correct / guesses)}`"
    />
    <Stat title="Correct Ranks" :value="`${correctRank}`" />
    <Stat title="Average Rank Pool" :value="`${roundToTwo(averageRankPool)}`" />
  </div>
  <div v-else><a-spin :indicator="indicator"></a-spin></div>
</template>
<style scoped>
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  border: solid 1px lightslategray;
  padding: 1rem;
}

.stats-title {
  grid-column: span 2;
  margin: 0;
}

.stats-divider {
  grid-column: span 2;
  margin: 0.75rem 0;
}
</style>
