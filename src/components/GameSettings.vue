<script setup lang="ts">
import { ref, h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import http from "../common/http-common";
import GroupSettings from "./GroupSettings.vue";
import DragAndDropTable from "./DragAndDropTable.vue";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import GuessRank from "./GuessRank.vue";
import GuessScore from "./GuessScore.vue";

const auth = useAuthenticator();

const loading = ref<boolean>(false);
const current = ref<number>(0);
const next = async () => {
  if (current.value === 1) {
    await getMatch().then(() => {
      current.value++;
    });
  } else if (current.value === 2) {
    console.log(selectedGuess.value);
    await verifyGuess().then(() => {
      current.value++;
    });
  } else if (current.value === 3) {
    verifiedGuess = ref<string[]>([]);
    verifiedRank = ref<string>("");
    current.value = 0;
  } else {
    current.value++;
  }
};
const prev = () => {
  current.value--;
};
const header = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${auth.user.signInUserSession.idToken.jwtToken}`,
  },
};
async function getMatch() {
  let url = "/getMatch?";
  for (let i = 0; i < selectedRegions.value.length; i++) {
    url += `regions[]=${selectedRegions.value[i]}&`;
  }
  for (let i = 0; i < selectedRanks.value.length; i++) {
    url += `ranks[]=${selectedRanks.value[i]}&`;
  }
  console.log(url);

  loading.value = true;
  await http.api.get(url, header).then((res) => {
    console.log(res);
    rankedMatch = res.data.rankedMatch;
    encryptedRank = res.data.rank;
    encryptedRanks = res.data.ranks;
    encryptedUnfinished = res.data.unfinished;
    loading.value = false;
  });
}
async function verifyGuess() {
  let url = "/verifyGuess";
  loading.value = true;
  await http.api
    .post(
      url,
      {
        guess: selectedGuess.value,
        encryptedRank,
        encryptedRanks,
        selectedRank: selectedRank.value,
        encryptedUnfinished,
      },
      header
    )
    .then((res) => {
      console.log(res);
      console.log(res.data.unencrypted);
      verifiedGuess = res.data.unencrypted;
      verifiedRank = res.data.rank;
      loading.value = false;
    });
}

const steps = [
  {
    title: "Regions",
  },
  {
    title: "Ranks",
  },
  {
    title: "Guess",
  },
  { title: "Results" },
];

const regions: string[] = [
  "BR",
  "EUNE",
  "EUW",
  "JP",
  "KR",
  "LAN",
  "LAS",
  "NA",
  "OCE",
  "TR",
  "RU",
  "PH",
  "SG",
  "TH",
  "TW",
  "VN",
];

const ranks: string[] = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Master",
  "Grandmaster",
  "Challenger",
];
const selectedRegions = ref<string[]>([]);
const selectedRanks = ref<string[]>([]);
const selectedGuess = ref<string[]>([]);
const selectedRank = ref<string>("");
var rankedMatch = ref<object[]>([]);
var encryptedRank = ref<string>("");
var encryptedRanks = ref<string>("");
var encryptedUnfinished = ref<string>("");
var verifiedGuess = ref<string[]>([]);
var verifiedRank = ref<string>("");

const buttonText = ["Next", "Play", "Guess", "Play Again"];

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "4rem",
    margin: "5rem 0 4.5rem 0",
  },
  spin: true,
});
</script>

<template>
  <div>
    <a-steps :current="current">
      <a-step
        v-for="item in steps"
        :key="item.title"
        :title="item.title"
        disabled
        class="step"
      />
    </a-steps>
    <div class="steps-content">
      <div v-if="!loading">
        <div v-if="current === 0">
          <GroupSettings
            :options="regions"
            :selected-options="selectedRegions"
            @update-selected-options="selectedRegions = $event"
          />
        </div>
        <div v-if="current === 1">
          <GroupSettings
            :options="ranks"
            :selected-options="selectedRanks"
            @update-selected-options="selectedRanks = $event"
          />
        </div>
        <div v-if="current === 2 || current === 3">
          <DragAndDropTable
            :rankedMatch="rankedMatch"
            @update-selected-guess="selectedGuess = $event"
            :verifiedGuess="verifiedGuess"
            :selectedRanks="selectedRanks"
          />
        </div>
      </div>
      <div v-else><a-spin :indicator="indicator"></a-spin></div>
    </div>
    <div class="steps-action">
      <div class="extra" v-if="current === 2 || current === 3">
        <GuessRank
          v-if="current === 2 || current === 3"
          :selectedRanks="selectedRanks"
          @update-selected-rank="selectedRank = $event"
          :selectedRank="selectedRank"
          :verifiedRank="verifiedRank"
        />
        <GuessScore
          :selectedRank="selectedRank"
          :selectedRanks="selectedRanks"
          :verifiedRank="verifiedRank"
          :verifiedGuess="verifiedGuess"
          v-if="current === 3"
        />
      </div>
      <div v-else></div>
      <a-button
        :disabled="!(current > 0 && current < steps.length - 1)"
        @click="prev"
        >Previous</a-button
      >
      <a-button
        v-if="current < steps.length"
        type="primary"
        @click="next"
        :disabled="
          (selectedRegions.length === 0 && current === 0) ||
          (selectedRanks.length === 0 && current === 1) ||
          (current === 2 && !selectedRank)
        "
        >{{ buttonText[current] }}</a-button
      >
    </div>
  </div>
</template>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  text-align: center;
  padding: 0.5rem 1rem 1rem;
}

.steps-action {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  align-items: center;
}

[data-theme="dark"] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}

.extra {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.step {
  cursor: context-menu;
}
</style>
