<script setup lang="ts">
import { ref, onMounted } from "vue";
import { type User, type Guess } from "../../API";
import http from "../../common/http-common";
import ProfileGraph from "./ProfileGraph.vue";
import ProfileStats from "./ProfileStats.vue";
import ProfileHistory from "./ProfileHistory.vue";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import Loading from "../Loading.vue";
const auth = useAuthenticator();

const staticProfileGuesses = ref<(Guess | null)[]>([]);
const staticProfileData = ref<User>();
const loading = ref<boolean>(true);
const props = defineProps<{ sub: string }>();

async function getStaticProfileData() {
  const header = {
    headers: {
      "Content-type": "application/json",
    },
  };
  let url = `/getProfile?sub=${props.sub}`;

  await http.api
    .get(url, header)
    .then((res) => {
      console.log(res);
      staticProfileData.value = res.data.user;
      staticProfileGuesses.value = res.data.guesses.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

onMounted(async () => {
  update();
});

async function update() {
  loading.value = true;
  // If looking at own profile put in cache
  if (auth.user && auth.user.attributes.sub === props.sub) {
    const staticData = window.localStorage.getItem("staticProfileData");
    const staticGuesses = window.localStorage.getItem("staticProfileGuesses");

    // Must check staticData.id in case someone has 2 accounts
    if (
      staticData &&
      staticGuesses &&
      JSON.parse(staticData).id === auth.user.attributes.sub
    ) {
      staticProfileData.value = JSON.parse(staticData);
      staticProfileGuesses.value = JSON.parse(staticGuesses);
    } else {
      await getStaticProfileData().then(() => {
        localStorage.setItem(
          "staticProfileData",
          JSON.stringify(staticProfileData.value)
        );
        localStorage.setItem(
          "staticProfileGuesses",
          JSON.stringify(staticProfileGuesses.value)
        );
      });
    }
  } else {
    await getStaticProfileData();
  }
  console.log(staticProfileData.value);
  console.log(staticProfileGuesses.value);

  loading.value = false;
}

async function forceUpdate() {
  loading.value = true;
  await getStaticProfileData().then(() => {
    localStorage.setItem(
      "staticProfileData",
      JSON.stringify(staticProfileData.value)
    );
    localStorage.setItem(
      "staticProfileGuesses",
      JSON.stringify(staticProfileGuesses.value)
    );
  });
  loading.value = false;
}
</script>

<template>
  <div v-if="!loading" class="profile">
    <ProfileStats
      :staticProfileData="staticProfileData!"
      @getStaticProfileData="forceUpdate()"
    />
    <ProfileGraph :guesses="(staticProfileGuesses as [Guess])" />
    <ProfileHistory :guesses="(staticProfileGuesses as [Guess])" />
  </div>
  <Loading v-else />
</template>

<style>
.profile {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
}
</style>
