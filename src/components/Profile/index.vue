<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  type User,
  type Guess,
  type GetUserQuery,
  type GuessesByDateQuery,
  type DailyGuessesByDateQuery,
  type DailyGuess,
} from "../../API";
import ProfileGraph from "./ProfileGraph.vue";
import ProfileStats from "./ProfileStats.vue";
import ProfileHistory from "./ProfileHistory.vue";
import Loading from "../Loading.vue";
import CustomCard from "../CustomCard.vue";
import type { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { dailyGuessesByDate, getUser, guessesByDate } from "@/graphql/queries";
import CustomTabs from "../Daily/CustomTabs.vue";

const staticProfileGuesses = ref<Guess[]>([]);
const staticProfileDailyGuesses = ref<DailyGuess[]>([]);
const staticProfileData = ref<User>();
const loading = ref<boolean>(true);
const props = defineProps<{ sub: string }>();
const option = ref<string>("freeplay");

async function getStaticProfileData() {
  loading.value = true;
  const stats = API.graphql<GraphQLQuery<GetUserQuery>>({
    query: getUser,
    variables: { id: props.sub },
  });
  const guesses = API.graphql<GraphQLQuery<GuessesByDateQuery>>({
    query: guessesByDate,
    variables: { userGuessesId: props.sub, sortDirection: "DESC", limit: 50 },
  });
  const dailyGuesses = API.graphql<GraphQLQuery<DailyGuessesByDateQuery>>({
    query: dailyGuessesByDate,
    variables: { userGuessesId: props.sub, sortDirection: "DESC", limit: 50 },
  });

  staticProfileData.value = (await stats).data.getUser;
  staticProfileGuesses.value = (await guesses).data.guessesByDate.items;
  staticProfileDailyGuesses.value = (
    await dailyGuesses
  ).data.dailyGuessesByDate.items;
  loading.value = false;
}

onMounted(async () => {
  getStaticProfileData();
});

watch(
  () => props.sub,
  () => {
    getStaticProfileData();
  }
);
</script>

<template>
  <div v-if="!loading" class="profile">
    <ProfileStats
      :staticProfileData="staticProfileData!"
      @getStaticProfileData="getStaticProfileData()"
      :key="sub"
    />
    <ProfileGraph
      :guesses="staticProfileGuesses"
      :dailyGuesses="staticProfileDailyGuesses"
      :user="staticProfileData!"
      :key="sub"
    />
    <div class="history">
      <CustomCard style="padding: 0">
        <CustomTabs
          :options="['all', 'freeplay', 'daily']"
          :optionTitles="['All', 'Freeplay', 'Daily']"
          :option="option"
          @update-option="(newOption) => (option = newOption)"
        />
        <ProfileHistory
          :guesses="
            option === 'all'
              ? [...staticProfileGuesses, ...staticProfileDailyGuesses].sort(
                  (a, b) =>
                    a.createdAt >= b.createdAt
                      ? -1
                      : a.createdAt <= b.createdAt
                      ? 1
                      : 0
                )
              : option === 'freeplay'
              ? staticProfileGuesses
              : staticProfileDailyGuesses
          "
        />
      </CustomCard>
    </div>
  </div>
  <CustomCard v-else>
    <Loading />
  </CustomCard>
</template>

<style>
.profile {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
}

.history {
  grid-column: 1 / -1;
}
</style>
