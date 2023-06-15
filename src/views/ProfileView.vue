<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { type GraphQLQuery } from "@aws-amplify/api";
import { type User, type GetUserQuery, type Guess } from "../API";
import ProfileGraph from "@/components/Profile/ProfileGraph.vue";
import ProfileStats from "../components/Profile/ProfileStats.vue";
import ProfileHistory from "../components/Profile/ProfileHistory.vue";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
const auth = useAuthenticator();

var staticProfileData = ref<User>();
const loading = ref<boolean>(true);
const props = defineProps<{ sub: string }>();

async function getStaticProfileData() {
  const getUser = await API.graphql<GraphQLQuery<GetUserQuery>>({
    query: queries.getUser,
    variables: { id: props.sub },
  });
  staticProfileData.value = getUser.data!.getUser!;
}

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "4rem",
    margin: "5rem 0 4.5rem 0",
  },
  spin: true,
});

onMounted(async () => {
  // If looking at own profile put in cache
  if (auth.user.attributes.sub === props.sub) {
    const staticData = window.localStorage.getItem("staticProfileData");

    // Must check staticData.id in case someone has 2 accounts
    if (staticData && JSON.parse(staticData).id === auth.user.attributes.sub) {
      staticProfileData.value = JSON.parse(staticData);
    } else {
      await getStaticProfileData().then(() => {
        localStorage.setItem(
          "staticProfileData",
          JSON.stringify(staticProfileData.value)
        );
      });
    }
  } else {
    await getStaticProfileData();
  }
  console.log(staticProfileData.value);

  loading.value = false;
});

async function forceUpdate() {
  loading.value = true;
  await getStaticProfileData().then(() => {
    localStorage.setItem(
      "staticProfileData",
      JSON.stringify(staticProfileData.value)
    );
  });
  loading.value = false;
}
</script>

<template>
  <div v-if="!loading" class="main profile">
    <ProfileStats
      :staticProfileData="staticProfileData!"
      @getStaticProfileData="forceUpdate()"
    />
    <ProfileGraph :guesses="(staticProfileData! as any).guesses.items" />
    <ProfileHistory :guesses="(staticProfileData! as any).guesses.items" />
  </div>
  <div v-else><a-spin :indicator="indicator"></a-spin></div>
</template>

<style scoped>
.main {
  grid-column: span 2;
}

.profile {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
}
</style>
