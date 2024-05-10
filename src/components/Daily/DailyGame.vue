<script setup lang="ts">
import DragAndDropTable from "../Game/DragAndDropTable.vue";
import GuessRank from "../Game/GuessRank.vue";
import GuessScore from "../Game/GuessScore.vue";
import GuessRegion from "../Game/GuessRegion.vue";
import { ref, watch, h, onMounted } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import http from "../../common/http-common";
import { useRouter } from "vue-router";
interface DailyGuess {
  placements: string[];
  rankedMatch: object[];
  rank: string;
  date: string;
  category: string;
  verifiedRank: string;
  region: string;
}

const props = defineProps<{
  date: string;
  category: string;
  prev: DailyGuess | void;
}>();
const emit = defineEmits<{
  (e: "updateHistory", guess: DailyGuess): void;
}>();

const router = useRouter();

const rankedMatch = ref<object[]>([]);
const selectedGuess = ref<string[]>([]);
const selectedRanks = ref<string[]>([]);
const selectedRank = ref<string>("");

const sensitive = ref<string>("");
const loading = ref<boolean>(false);

const verifiedGuess = ref<string[]>([]);
const verifiedRank = ref<string>("");
const verifiedRegion = ref<string>("");

const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const all = [...low, ...high];

onMounted(async () => {
  loading.value = true;
  const prev = props.prev;
  console.log("test", prev);
  if (prev) {
    // Load previous guess
    verifiedGuess.value = prev.placements;
    verifiedRank.value = prev.verifiedRank;
    verifiedRegion.value = prev.region;
    rankedMatch.value = prev.rankedMatch;
    selectedRank.value = prev.rank;
    selectedRanks.value =
      prev.category === "all" ? all : prev.category === "high" ? high : low;
  } else {
    await getDaily(props.date, props.category);
  }
  loading.value = false;
});

async function getDaily(date: string, cat: string) {
  let url = "/getDaily?";
  url += `date=${date}&category=${cat}`;

  const header = {
    headers: {
      "Content-type": "application/json",
    },
  };

  await http.api
    .get(url, header)
    .then((res) => {
      //console.log(res);
      rankedMatch.value = res.data.dailyMatch;
      sensitive.value = res.data.sensitive;
      selectedRanks.value = cat === "all" ? all : cat === "high" ? high : low;
    })
    .catch((error) => {
      alert("Error finding ranked match. Please try again.");
    });
}

async function verifyGuess() {
  let url = "/verifyAnyGuess?";
  const header = {
    headers: {
      "Content-type": "application/json",
    },
  };
  loading.value = true;
  await http.api
    .post(
      url,
      {
        guess: selectedGuess.value,
        selectedRank: selectedRank.value,
        sensitive: sensitive.value,
      },
      header
    )
    .then((res) => {
      //console.log(res);
      //console.log(res.data.unencrypted);
      verifiedGuess.value = res.data.unencrypted;
      verifiedRank.value = res.data.rank;
      verifiedRegion.value = res.data.region;

      loading.value = false;
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

function reset() {
  router.push("/daily");
}

async function guess() {
  // console.log(selectedGuess.value, selectedRank.value);
  // TODO: call getDailyStats()
  await verifyGuess();
  // TODO: store in localStorage
  // Put into dailyHistory
  emit("updateHistory", {
    placements: verifiedGuess.value,
    rank: selectedRank.value,
    date: props.date,
    category: props.category,
    rankedMatch: rankedMatch.value,
    verifiedRank: verifiedRank.value,
    region: verifiedRegion.value,
  });
}
</script>

<template>
  <div class="steps-content">
    <div v-if="!loading">
      <DragAndDropTable
        :rankedMatch="rankedMatch"
        @update-selected-guess="selectedGuess = $event"
        :verifiedGuess="verifiedGuess"
        :selectedRanks="selectedRanks"
      />
      <div
        :style="{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginTop: '0.5rem',
          paddingLeft: '0.75rem',
        }"
      >
        <GuessRank
          :selectedRanks="selectedRanks"
          @update-selected-rank="selectedRank = $event"
          :selectedRank="selectedRank"
          :verifiedRank="verifiedRank"
          :loading="loading"
        />
        <GuessScore
          :selectedRank="selectedRank"
          :selectedRanks="selectedRanks"
          :verifiedRank="verifiedRank"
          :verifiedGuess="verifiedGuess"
          v-if="verifiedGuess.length > 0"
        />
        <GuessRegion :region="verifiedRegion" v-if="verifiedGuess.length > 0" />
      </div>
    </div>
    <div v-else><a-spin :indicator="indicator"></a-spin></div>
  </div>
  <div class="steps-action">
    <a-button @click="reset" class="action-btn">Previous</a-button>
    <a-button
      v-if="verifiedGuess.length === 0"
      type="primary"
      @click="guess"
      class="action-btn"
      :disabled="!selectedRank || loading"
      >Guess</a-button
    >
    <a-button
      v-else
      type="primary"
      @click="() => console.log('stats')"
      class="action-btn"
      :disabled="loading"
      >Stats</a-button
    >
  </div>
</template>
<style scoped>
.steps-content {
  border: 1px solid lightslategray;
  border-radius: 0.25rem;
  background-color: white;
  text-align: center;
  padding: 0.25rem 0.5rem 0.5rem;
}

.steps-action {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.action-btn {
  flex-basis: 50%;
}
</style>
