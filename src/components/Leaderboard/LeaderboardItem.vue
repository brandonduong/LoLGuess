<script setup lang="ts">
import type { User } from "@/API";
import { roundToTwo } from "@/common/helper";
import { ref } from "vue";

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
  case 3:
    icon.value = "/chatting.webp";
    break;
  case 4:
    icon.value = "/giga.webp";
    break;
  default:
    break;
}
</script>

<template>
  <RouterLink :to="`/profile/${user.id}`">
    <div class="leaderboard-item">
      <h3 class="rank">
        {{ rank }} <img :src="icon" v-if="icon" class="emote" />
      </h3>
      <h3>{{ user.username }}</h3>
      <h3>{{ user.score }} / {{ user.maxScore }}</h3>
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
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr 1.25fr;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  column-gap: 1rem;
}

.leaderboard-item:hover {
  background-color: rgb(216, 222, 235);
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
