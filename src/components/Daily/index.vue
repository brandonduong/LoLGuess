<script setup lang="ts">
import HomeButton from "../Home/HomeButton.vue";
import DragAndDropTable from "../Game/DragAndDropTable.vue";
import GuessRank from "../Game/GuessRank.vue";
import GuessScore from "../Game/GuessScore.vue";
import GuessRegion from "../Game/GuessRegion.vue";
import http from "../../common/http-common";
import { ref, watch, h, onMounted } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { calculateScore } from "@/common/helper";

interface DailyGuess {
  placements: string[];
  rankedMatch: object[];
  rank: string;
  date: string;
  category: string;
  verifiedRank: string;
  region: string;
}

const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const all = [...low, ...high];

const dailyHistory = ref<DailyGuess[]>([]);
onMounted(() => {
  const hist = window.localStorage.getItem("dailyHistory");
  if (hist) {
    dailyHistory.value = JSON.parse(hist);
  } else {
    window.localStorage.setItem("dailyHistory", JSON.stringify([]));
    dailyHistory.value = [];
  }
});

const loading = ref<boolean>(false);

const date = ref<string>("");
const category = ref<string>("");
const rankedMatch = ref<object[]>([]);
const selectedGuess = ref<string[]>([]);
const selectedRanks = ref<string[]>([]);
const selectedRank = ref<string>("");

const encryptedRank = ref<string>("");
const encryptedRegion = ref<string>("");
const encryptedMatchId = ref<string>("");

const verifiedGuess = ref<string[]>([]);
const verifiedRank = ref<string>("");
const verifiedRegion = ref<string>("");
const verifiedMatchId = ref<string>("");

// For update countdown
const nowToronto = new Date(
  new Date().toLocaleString("en-US", {
    timeZone: "America/Toronto",
  })
);
const updateUTC = Date.UTC(
  nowToronto.getUTCFullYear(),
  nowToronto.getUTCMonth(),
  nowToronto.getUTCDate() + 1,
  5,
  0,
  0
);

const timer = ref<number>(updateUTC);

const now = new Date();
const today = ref<string>(
  new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0]
);

function update() {
  const now = new Date();
  today.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0];
}

function getDailyDates() {
  const startOfDailies = new Date("12/21/2023");
  const dailies = [];
  var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  while (date >= startOfDailies) {
    console.log(date, startOfDailies);
    dailies.push(date.toISOString().split("T")[0]);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    console.log(date);
  }
  console.log(dailies);
  return dailies;
}

async function verifyGuess() {
  let url = "/verifyAnyGuess?";
  for (let i = 0; i < selectedGuess.value.length; i++) {
    url += `guess[]=${encodeURIComponent(selectedGuess.value[i])}&`;
  }
  url += `encryptedRank=${encodeURIComponent(encryptedRank.value)}`;
  url += `&encryptedRegion=${encodeURIComponent(encryptedRegion.value)}`;
  url += `&encryptedMatchId=${encodeURIComponent(encryptedMatchId.value)}`;

  const header = {
    headers: {
      "Content-type": "application/json",
    },
  };
  loading.value = true;
  await http.api.get(url, header).then((res) => {
    //console.log(res);
    //console.log(res.data.unencrypted);
    verifiedGuess.value = res.data.unencrypted;
    verifiedRank.value = res.data.rank;
    verifiedRegion.value = res.data.region;
    verifiedMatchId.value = res.data.matchId;

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
  verifiedGuess.value = [];
  verifiedRank.value = "";
  verifiedRegion.value = "";
  selectedRank.value = "";
  category.value = "";
  rankedMatch.value = [];
}

async function guess() {
  // console.log(selectedGuess.value, selectedRank.value);
  // TODO: call getDailyStats()
  await verifyGuess();
  // TODO: store in localStorage
  // Put into dailyHistory
  dailyHistory.value = [
    ...dailyHistory.value,
    {
      placements: verifiedGuess.value,
      rank: selectedRank.value,
      date: date.value,
      category: category.value,
      rankedMatch: rankedMatch.value,
      verifiedRank: verifiedRank.value,
      region: verifiedRegion.value,
    },
  ];
  window.localStorage.setItem(
    "dailyHistory",
    JSON.stringify(dailyHistory.value)
  );
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
      encryptedRank.value = res.data.rank;
      encryptedRegion.value = res.data.region;
      encryptedMatchId.value = res.data.matchId;
      selectedRanks.value = cat === "all" ? all : cat === "high" ? high : low;
    })
    .catch((error) => {
      alert("Error finding ranked match. Please try again.");
    });
}

watch(category, async (newVal, oldVal) => {
  //console.log(category.value);
  if (newVal) {
    loading.value = true;
    var prev;
    if ((prev = guessedBefore(date.value, newVal))) {
      // Load previous guess
      verifiedGuess.value = prev.placements;
      verifiedRank.value = prev.verifiedRank;
      verifiedRegion.value = prev.region;
      rankedMatch.value = prev.rankedMatch;
      selectedRank.value = prev.rank;
      selectedRanks.value =
        prev.category === "all" ? all : prev.category === "high" ? high : low;
    } else {
      await getDaily(date.value, newVal);
    }
    loading.value = false;
  }
});

function guessedBefore(date: string, category: string): DailyGuess | void {
  return dailyHistory.value.find(
    (d) => d.date === date && d.category === category
  );
}

const buttonDescriptions = {
  low: "Iron, Bronze, Silver, Gold, Platinum",
  high: "Emerald, Diamond, Master, Grandmaster, Challenger",
  all: "Both Low and High",
};
</script>
<template>
  <div class="daily" v-if="!category">
    <div>
      <div>
        <h2>Daily</h2>
        <h3 style="margin: 0">Updates every day at 12 am (EST)</h3>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          "
        >
          <div class="timer">
            <h3>Updates in:</h3>
            <a-statistic-countdown
              :value="timer"
              @finish="update()"
              valueStyle="font-size: 1.17em;"
            />
          </div>
          <div>
            <b>{{ today }}</b>
          </div>
        </div>
      </div>
      <div class="buttons">
        <HomeButton
          v-for="cat in ['low', 'high', 'all']"
          :title="
            cat.substring(0, 1).toUpperCase() + cat.substring(1) + ' Ranks'
          "
          :onClick="
            () => {
              date = today;
              category = cat;
            }
          "
          :description="buttonDescriptions[cat as keyof typeof buttonDescriptions]"
        >
          <div v-for="prev in [guessedBefore(today, cat)]">
            <h5 v-if="prev">
              {{
                calculateScore(
                  prev.placements,
                  prev.rank,
                  prev.verifiedRank,
                  cat === "all" ? all : cat === "high" ? high : low
                ).join(" / ")
              }}
            </h5>
            <h5 v-else>---</h5>
          </div>
        </HomeButton>
      </div>
    </div>
    <div>
      <h3>Archive</h3>
      <div v-for="d in getDailyDates()">
        <h4 style="text-align: end; margin: 0">
          <b>{{ d }}</b>
        </h4>
        <div class="buttons">
          <HomeButton
            v-for="cat in ['low', 'high', 'all']"
            :title="
              cat.substring(0, 1).toUpperCase() + cat.substring(1) + ' Ranks'
            "
            :onClick="
              () => {
                date = d;
                category = cat;
              }
            "
            :description="buttonDescriptions[cat as keyof typeof buttonDescriptions]"
          >
            <div v-for="prev in [guessedBefore(d, cat)]">
              <h5 v-if="prev">
                {{
                  calculateScore(
                    prev.placements,
                    prev.rank,
                    prev.verifiedRank,
                    cat === "all" ? all : cat === "high" ? high : low
                  ).join(" / ")
                }}
              </h5>
              <h5 v-else>---</h5>
            </div>
          </HomeButton>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
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
          <GuessRegion
            :region="verifiedRegion"
            v-if="verifiedGuess.length > 0"
          />
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
  </div>
</template>
<style scoped>
.daily {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  background: white;
  border: 1px solid lightslategray;
  border-radius: 0.25rem;
  overflow-x: auto;
  text-align: center;
  gap: 1rem;
}

.timer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

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

@media only screen and (max-width: 720px) {
  .buttons {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
