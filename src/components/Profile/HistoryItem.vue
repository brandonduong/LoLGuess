<script setup lang="ts">
import { ref, onMounted } from "vue";
import { calculateScore } from "@/common/helper";
import RankIcon from "../Game/RankIcon.vue";
import { useRouter } from "vue-router";
import HomeButton from "../Home/HomeButton.vue";
import { ArrowRightOutlined } from "@ant-design/icons-vue";

const props = defineProps<{
  placements: string[];
  guessedRank: string;
  rank: string;
  ranks: string[];
  createdAt: string;
  regions?: string[];
  replay?: string;
}>();

const score = ref<number>(0);
const maxScore = ref<number>(0);
const router = useRouter();

onMounted(() => {
  updateScore();
});

function updateScore() {
  [score.value, maxScore.value] = calculateScore(
    props.placements,
    props.guessedRank,
    props.rank,
    props.ranks
  );
}

const reveal = ref<boolean>(false);
</script>

<template>
  <div class="history-item">
    <div class="date">
      <h5 style="margin: 0">
        {{
          new Date(createdAt).toLocaleString("default", {
            month: "short",
            day: "numeric",
          })
        }}
      </h5>
      <p class="number" style="margin: 0">
        {{ score }} / {{ maxScore }}
        <p class="percentage" style="margin: 0;">
          ({{ Math.round((score / maxScore) * 100) }} %)
        </p>
      </p>
    </div>

    <div class="regions" v-if="regions">
      <p v-for="region in regions" style="margin: 0">
        {{ region }}
      </p>
    </div>
    <div class="mode" v-else>
      <h5 style="margin: 0">
        <slot name="mode"/>
      </h5>
    </div>
    <div class="ranks">
      <RankIcon v-for="rank in ranks" :rank="rank" />
    </div>

    <div class="history-buttons">
      <div class="reveal" v-if="reveal">
        <div style="display: flex; align-items: center;">
          <RankIcon :rank="guessedRank" />
          <p style="margin: 0"><arrow-right-outlined /></p>
          <RankIcon :rank="rank" />
        </div>
        <p style="margin: 0">
          {{ placements.map((place) => parseInt(place)).join(", ") }}
        </p>
      </div>
      <div v-else>
        <HomeButton
          type="secondary"
          @click="() => (reveal = !reveal)"
          title="REVEAL"
        ></HomeButton>
      </div>
      <div v-if="props.replay">
        <HomeButton
          type="tertiary"
          @click="() => router.push(props.replay!)"
          title="REPLAY"
        ></HomeButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-item {
  display: flex;
  align-items: center;
  width: 100%;
  column-gap: 1rem;
  justify-content: space-between;
  padding: 1rem;
}

.history-item:nth-child(n + 1) {
  border-bottom: 2px solid var(--color-border);
}

.regions,
.ranks {
  display: grid;
  column-gap: 0.5rem;
}

.regions, .mode {
  grid-template-columns: repeat(8, 1fr);
  width: 300px;
}

.ranks {
  grid-template-columns: repeat(5, 1fr);
  width: 175px;
}

.history-buttons {
  display: flex;
  justify-content: end;
  column-gap: 1rem;
  min-width: 255px;
}

.reveal {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 1rem;
  justify-content: center;
  text-wrap: nowrap;
}

.date {
  min-width: 140px;
  text-wrap: nowrap;
  text-align: start;
}

@media only screen and (max-width: 1028px) {
  .history-item {
    flex-direction: column;
  }

  .date > h5,
  .date {
    text-align: center;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;
  }

  .history-buttons {
    margin-left: 0;
    justify-content: space-between;
  }

  .ranks,
  .regions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .percentage {
    display: inline-block;
    padding-left: 1rem;
  }
}
</style>
