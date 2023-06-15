<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { type GraphQLQuery } from "@aws-amplify/api";
import { type ListUsersQuery } from "../API";
import { LoadingOutlined } from "@ant-design/icons-vue";

const loading = ref<boolean>(true);
const users = ref<ListUsersQuery>();
async function listUsers() {
  const listUsers = await API.graphql<GraphQLQuery<ListUsersQuery>>({
    query: queries.listUsers,
  });
  users.value = listUsers.data;
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
  const staticLeaderboard = window.localStorage.getItem("staticLeaderboard");

  // Must check staticData.id in case someone has 2 accounts
  if (staticLeaderboard) {
    users.value = JSON.parse(staticLeaderboard);
  } else {
    await listUsers().then(() => {
      localStorage.setItem("staticLeaderboard", JSON.stringify(users.value));
    });
  }
  console.log(users.value);

  loading.value = false;
});

async function forceUpdate() {
  loading.value = true;
  await listUsers().then(() => {
    localStorage.setItem("staticLeaderboard", JSON.stringify(users.value));
  });
  loading.value = false;
}
</script>

<template>
  <div class="leaderboard">
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    {{ users }}
  </div>
</template>

<style>
.leaderboard {
  grid-column: span 2;
  display: grid;
  row-gap: 1rem;
}
</style>
