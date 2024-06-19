<script setup lang="ts">
import DragAndDropTable from "../Game/DragAndDropTable.vue";
import GuessRank from "../Game/GuessRank.vue";
import GuessScore from "../Game/GuessScore.vue";
import GuessRegion from "../Game/GuessRegion.vue";
import { ref, onMounted, watch } from "vue";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons-vue";
import http from "../../common/http-common";
import { useRouter } from "vue-router";
import HomeButton from "../Home/HomeButton.vue";
import Loading from "../Loading.vue";
import CustomCard from "../CustomCard.vue";
import StatsTable from "./StatsTable.vue";
import type { DailyGuess, Team } from "@/common/interfaces";
import { useAuthenticator } from "@aws-amplify/ui-vue";
const auth = useAuthenticator();

const props = defineProps<{
  date: string;
  category: string;
  prev: DailyGuess | null;
}>();
const emit = defineEmits<{
  (e: "updateHistory", guess: DailyGuess): void;
}>();
watch(
  () => props.prev,
  () => {
    loadPrev();
  }
);

const router = useRouter();

const current = ref<number>(0);

const rankedMatch = ref<Team[]>([]);
const selectedGuess = ref<string[]>([]);
const selectedRanks = ref<string[]>([]);
const selectedRank = ref<string>(props.prev ? props.prev.rank : "");

const sensitive = ref<string>("");
const loading = ref<boolean>(false);

const verifiedGuess = ref<string[]>([]);
const verifiedRank = ref<string>("");
const verifiedRegion = ref<string>("");
const verifiedUsernames = ref<string[]>([]);

const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const all = [...low, ...high];

const errorExplanation =
  "Error finding ranked match. Please try again. This can happen rarely if 3 users did not play a ranked match within their past 10 games or if an entire rank is empty, such as Challenger at the start of a set.";

onMounted(async () => {
  loading.value = true;
  const prev = props.prev;
  if (prev) {
    loadPrev();
  } else {
    await getDaily(props.date, props.category);
  }
  loading.value = false;
});

function loadPrev() {
  // Load previous guess
  const prev = props.prev!;
  verifiedGuess.value = prev.placements;
  verifiedRank.value = prev.verifiedRank;
  verifiedRegion.value = prev.region;
  verifiedUsernames.value = prev.usernames;
  rankedMatch.value = prev.rankedMatch;
  selectedRank.value = prev.rank;
  selectedRanks.value =
    prev.category === "all" ? all : prev.category === "high" ? high : low;
  current.value = 1;
}

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
      alert(errorExplanation);
    });
}

async function verifyGuess() {
  let url, header;
  if (auth.user) {
    url = "/verifyGuess?";
    header = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.user.signInUserSession.idToken.jwtToken}`,
      },
    };
  } else {
    url = "/verifyAnyGuess?";
    header = {
      headers: {
        "Content-type": "application/json",
      },
    };
  }

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
      verifiedUsernames.value = res.data.usernames;

      loading.value = false;
    });
}

const prevText = ["ARCHIVE", "ARCHIVE", "ATTEMPT"];
const buttonText = ["GUESS", "STATS", "ARCHIVE"];

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
    usernames: verifiedUsernames.value,
  });
}

async function next() {
  loading.value = true;
  if (current.value === 0) {
    await guess();
  } else {
    if (current.value === 2) {
      router.push("/daily");
    }
    current.value++;
  }
  loading.value = false;
}

function prev() {
  if (current.value < 2) {
    router.push("/daily");
  } else {
    current.value -= 1;
  }
}
</script>

<template>
  <CustomCard style="align-items: normal; margin-top: 1rem">
    <div v-if="!loading">
      <div v-if="current === 0 || current === 1">
        <DragAndDropTable
          :rankedMatch="rankedMatch"
          @update-selected-guess="selectedGuess = $event"
          :verifiedGuess="verifiedGuess"
          :selectedRanks="selectedRanks"
        />
        <div style="margin-top: 1rem">
          <GuessRank
            :selectedRanks="selectedRanks"
            @update-selected-rank="selectedRank = $event"
            :selectedRank="selectedRank"
            :verifiedRank="verifiedRank"
            :loading="loading"
          />
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-top: 1rem;
            "
            v-if="current === 1"
          >
            <GuessRegion :region="verifiedRegion" />
            <GuessScore
              :selectedRank="selectedRank"
              :selectedRanks="selectedRanks"
              :verifiedRank="verifiedRank"
              :verifiedGuess="verifiedGuess"
            />
          </div>
        </div>
      </div>
      <div v-if="current === 2">
        <StatsTable
          :rankedMatch="rankedMatch"
          :usernames="verifiedUsernames"
          :verifiedGuess="verifiedGuess"
          :date="date"
          :category="category"
        />
      </div>
    </div>
    <div v-else><Loading /></div>
  </CustomCard>
  <div class="steps-action">
    <HomeButton
      type="default"
      :title="prevText[current]"
      :active="!loading"
      :onClick="prev"
      ><template #icon
        ><double-left-outlined
          style="color: rgb(240, 230, 210); font-size: 1.75rem" /></template
    ></HomeButton>
    <HomeButton
      :title="buttonText[current]"
      :active="
        ((selectedRank.length > 0 && current === 0) || current >= 1) && !loading
      "
      :onClick="next"
      ><template #iconRight
        ><double-right-outlined
          style="color: rgb(240, 230, 210); font-size: 1.75rem" /></template
    ></HomeButton>
  </div>
</template>
<style scoped>
.steps-content {
  text-align: center;
  padding: 1rem 0;
}

.steps-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 0;
}
</style>
