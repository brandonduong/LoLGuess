<script setup lang="ts">
import DailyGame from "./DailyGame.vue";
import DailyArchive from "./DailyArchive.vue";
import { ref, onMounted } from "vue";
import CustomCard from "../CustomCard.vue";
import CustomTabs from "./CustomTabs.vue";
import type { DailyGuess } from "@/common/interfaces";
import HomeButton from "../Home/HomeButton.vue";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons-vue";
import CustomInfo from "../Profile/CustomInfo.vue";
import Loading from "../Loading.vue";
import { downloadBlob } from "@/common/helper";
import { csv2json, json2csv } from "json-2-csv";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import type { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { dailyGuessesByDate } from "@/graphql/queries";
import type {
  DailyGuessesByDateQuery,
  DailyGuess as APIDailyGuess,
} from "@/API";
defineProps<{ date: string; category: string }>();
const auth = useAuthenticator();

const dailyHistory = ref<DailyGuess[]>([]);
const storedHistory = ref<APIDailyGuess[]>([]); // For signed in users only
const loading = ref(true);
const file = ref<InstanceType<typeof HTMLInputElement> | null>(null);

onMounted(async () => {
  loading.value = true;
  const hist = window.localStorage.getItem("dailyHistory");
  if (hist) {
    dailyHistory.value = JSON.parse(hist);
  } else {
    window.localStorage.setItem("dailyHistory", JSON.stringify([]));
    dailyHistory.value = [];
  }

  if (auth.user) {
    const dailyGuesses = API.graphql<GraphQLQuery<DailyGuessesByDateQuery>>({
      query: dailyGuessesByDate,
      variables: {
        userGuessesId: auth.user.attributes.sub,
        sortDirection: "DESC",
      },
      authMode: "API_KEY",
    });
    storedHistory.value = (await dailyGuesses).data.dailyGuessesByDate
      .items as APIDailyGuess[];
  }
  loading.value = false;
});

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
  0,
  0,
  0
);

const timer = ref<number>(updateUTC);

function guessedBefore(date: string, category: string): DailyGuess | null {
  const hist = dailyHistory.value.find(
    (d) => d.date === date && d.category === category
  );
  return hist || null;
}

function getArchiveItems(
  date: string,
  category: string
): {
  rank: string;
  verifiedRank: string;
  placements: string[];
} | null {
  const local = dailyHistory.value.find(
    (d) => d.date === date && d.category === category
  );
  const stored = storedHistory.value.find(
    (d) => d.date === date && d.category === category
  );
  if (local) {
    const { rank, verifiedRank, placements } = local;
    return { rank, verifiedRank, placements };
  } else if (stored) {
    const { guessedRank, rank, placements } = stored;
    return { rank: guessedRank, verifiedRank: rank, placements };
  }
  return null;
}

function updateHistory(guess: DailyGuess) {
  dailyHistory.value = [...dailyHistory.value, guess];
  window.localStorage.setItem(
    "dailyHistory",
    JSON.stringify(dailyHistory.value)
  );
}

const option = ref<string>("all");

function downloadGuesses() {
  downloadBlob(
    json2csv(dailyHistory.value),
    "dailyHistory",
    "text/csv;charset=utf-8;"
  );
}

function uploadGuesses(e: Event) {
  const file = (e.target as HTMLInputElement).files![0];
  let reader = new FileReader();
  reader.onload = function () {
    const hist = csv2json(reader.result as string) as DailyGuess[];
    dailyHistory.value = hist;
    window.localStorage.setItem(
      "dailyHistory",
      JSON.stringify(dailyHistory.value)
    );
  };
  reader.readAsText(file);
}
</script>
<template>
  <div class="daily" v-if="!category">
    <h3 class="gold">DAILY</h3>
    <p>Updates every day at 12 am (UTC)</p>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      "
    >
      <div class="timer">
        <h5 style="margin: 0">UPDATES IN:</h5>
        <a-statistic-countdown
          :value="timer"
          :valueStyle="{
            color: 'var(--color-offwhite)',
            'line-height': '18pt',
            'letter-spacing': '0.075em',
            'font-size': '14pt',
            'font-family': 'beaufort_for_lolbold',
            'font-weight': 700,
            'font-style': 'normal',
          }"
        />
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center">
        <CustomInfo
          ><p style="margin: 0; color: var(--color-offwhite)">
            Upload or download your guess history
          </p></CustomInfo
        >
        <input
          type="file"
          ref="file"
          style="display: none"
          @change="(e) => uploadGuesses(e)"
          accept=".csv"
        />
        <HomeButton
          type="secondary"
          title="UPLOAD"
          padding="0 0.75rem"
          @click="file!.click()"
        >
          <template #icon>
            <UploadOutlined style="font-size: 1rem; color: white" />
          </template>
        </HomeButton>
        <HomeButton
          type="secondary"
          @click="downloadGuesses"
          title="DOWNLOAD"
          padding="0 0.75rem"
        >
          <template #icon>
            <DownloadOutlined style="font-size: 1rem; color: white" />
          </template>
        </HomeButton>
      </div>
    </div>

    <CustomCard style="align-items: normal; padding: 0">
      <div v-if="!loading">
        <CustomTabs
          :options="['all', 'low', 'high']"
          :optionTitles="['All Ranks', 'Low Ranks', 'High Ranks']"
          :option="option"
          @update-option="(newOption) => (option = newOption)"
        />
        <DailyArchive :getArchiveItems="getArchiveItems" :option="option" />
      </div>
      <div v-else><Loading /></div>
    </CustomCard>
  </div>
  <div v-else-if="!loading">
    <DailyGame
      :date="date"
      :category="category"
      :prev="guessedBefore(date, category)"
      @update-history="(guess) => updateHistory(guess)"
    />
  </div>
</template>
<style>
.daily {
  padding: 1rem 0;
  text-align: center;
}

.timer {
  display: flex;
  column-gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
