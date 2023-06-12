<script setup lang="ts">
import { onMounted, ref, h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { type GraphQLQuery } from "@aws-amplify/api";
import { type User, type GetUserQuery, type Guess } from "../../API";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import Stat from "./Stat.vue";
import { calculateScore } from "../../common/helper";

const auth = useAuthenticator();

var staticProfileData = ref<User>();
const loading = ref<boolean>(true);
const score = ref<number>(0);
const maxScore = ref<number>(0);

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
  [score.value, maxScore.value] = getTotalScore();
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
</script>
<template>
  <div v-if="!loading" class="stats">
    <Stat
      title="Total Guesses"
      :value="(staticProfileData as any).guesses.items.length"
    />
    <Stat title="Total Score" :value="`${score}/${maxScore}`" />
  </div>
  <div v-else><a-spin :indicator="indicator"></a-spin></div>
</template>
<style scoped>
.stats {
}
</style>
