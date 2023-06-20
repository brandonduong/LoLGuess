<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import { type GraphQLQuery } from "@aws-amplify/api";
import { type ListUsersQuery, type User } from "../API";
import { LoadingOutlined } from "@ant-design/icons-vue";
import Leaderboard from "../components/Leaderboard/Leaderboard.vue";

const current = ref<number>(1);
</script>

<template>
  <div class="leaderboard">
    <Leaderboard />
  </div>
</template>

<style>
.leaderboard {
  grid-column: span 2;
  border: solid 1px lightslategray;
  padding: 1rem;
}
</style>
