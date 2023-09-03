<script setup lang="ts">
import { ref, onMounted, h, watch, onUpdated } from "vue";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { type GraphQLQuery } from "@aws-amplify/api";
import http from "../common/http-common";
import {
  type User,
  type GetUserQuery,
  type Guess,
  type GuessesByDateQuery,
} from "../API";
import ProfileGraph from "@/components/Profile/ProfileGraph.vue";
import ProfileStats from "../components/Profile/ProfileStats.vue";
import ProfileHistory from "../components/Profile/ProfileHistory.vue";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
const auth = useAuthenticator();

const staticProfileGuesses = ref<(Guess | null)[]>([]);
const staticProfileData = ref<User>();
const loading = ref<boolean>(true);
const props = defineProps<{ sub: string }>();
const oldSub = ref<string>();

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

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "4rem",
    margin: "5rem 0 4.5rem 0",
    color: "lightslategray",
  },
  spin: true,
});

onMounted(async () => {
  update();
  oldSub.value = props.sub;
});

onUpdated(async () => {
  if (oldSub.value !== props.sub) {
    oldSub.value = props.sub;
    update();
  }
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

function adsenseAddLoad() {
  let inlineScript = document.createElement("script");
  inlineScript.type = "text/javascript";
  inlineScript.text = "(adsbygoogle = window.adsbygoogle || []).push({});";
  document.getElementsByTagName("body")[0].appendChild(inlineScript);
}
adsenseAddLoad();
</script>

<template>
  <div v-if="!loading" class="main profile">
    <ProfileStats
      :staticProfileData="staticProfileData!"
      @getStaticProfileData="forceUpdate()"
    />
    <ProfileGraph :guesses="(staticProfileGuesses as [Guess])" />
    <ProfileHistory :guesses="(staticProfileGuesses as [Guess])" />
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-9244113126678862"
      data-ad-slot="8987454992"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-9244113126678862"
      data-ad-slot="2307616136"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>

  <div class="loading" v-else><a-spin :indicator="indicator"></a-spin></div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}

.profile {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
}

.loading {
  grid-column: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px lightslategray;
  border-radius: 0.25rem;
  background-color: white;
}
</style>
