<script setup lang="ts">
import type { User } from "@/API";
import { roundToTwo } from "@/common/helper";
import { ref, watch } from "vue";

const props = defineProps<{
  user: User;
  rank: number;
}>();

const icon = ref<string>("");
switch (props.rank) {
  case 1:
    icon.value = "/bedge.png";
    break;
  case 2:
    icon.value = "/wokege.png";
    break;
  default:
    break;
}

const pref = ref<string>(props.user.username.split(" ")[0]);
watch(
  () => props.user,
  (newVal, oldVal) => {
    pref.value = props.user.username.split(" ")[0];
  }
);
</script>

<template>
  <RouterLink :to="`/profile/${user.id}`">
    <div
      :style="{
        backgroundColor: rank % 2 == 0 ? 'rgb(240, 240, 240)' : 'white',
      }"
      class="leaderboard-item"
    >
      <h3 class="rank">
        {{ rank }} <img :src="icon" v-if="icon" class="emote" />
      </h3>
      <h3>{{ pref }}</h3>
      <h3>{{ roundToTwo(user.score) }}</h3>
      <h3>{{ user.correctPlacements }}</h3>
      <h3>{{ user.correctRanks }}</h3>
      <h3>{{ roundToTwo(user.averageScore) }}</h3>
      <h3>{{ roundToTwo(user.averageCorrectPlacements) }}</h3>
    </div>
  </RouterLink>
</template>

<style scoped>
.leaderboard-item {
  display: grid;
  padding: 1rem 0.5rem;
  grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr 1.25fr;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  column-gap: 1rem;
}

.leaderboard-item:hover {
  background-color: rgb(216, 222, 235) !important;
  transition: 0.2s;
}

.leaderboard-item > h3 {
  margin: 0;
}

.rank {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 0;
  column-gap: 0.5rem;
}

.emote {
  width: 24px;
  height: 24px;
}
</style>
