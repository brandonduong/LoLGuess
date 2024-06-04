<script setup lang="ts">
import { ref } from "vue";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons-vue";
import http from "../../common/http-common";
import DragAndDropTable from "./DragAndDropTable.vue";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import GuessRank from "./GuessRank.vue";
import GuessScore from "./GuessScore.vue";
import GuessRegion from "./GuessRegion.vue";
import { useRouter } from "vue-router";
import CustomCard from "../CustomCard.vue";
import HomeButton from "../Home/HomeButton.vue";
import Loading from "../Loading.vue";
import FreeplaySettings from "./FreeplaySettings.vue";
const props = defineProps<{ guessId: string }>();

const auth = useAuthenticator();
const router = useRouter();

const loading = ref<boolean>(false);
const current = ref<number>(props.guessId ? 2 : 0);

// Replay
if (props.guessId) {
  getReplay();
}

const next = async () => {
  if (current.value === 1) {
    await getMatch().then(() => {
      current.value++;
    });
  } else if (current.value === 2) {
    //console.log(selectedGuess.value);
    loading.value = true;

    // If replay, else
    if (props.guessId || !auth.user) {
      verifyReplay();
    } else {
      await verifyGuess();
    }
    loading.value = false;
    current.value++;
  } else if (current.value === 3) {
    verifiedGuess.value = [];
    verifiedRank.value = "";
    verifiedRegion.value = "";
    selectedRank.value = "";
    router.push("/play");
    current.value = 0;
  } else {
    current.value++;
  }
};
const prev = () => {
  if (current.value === 0 || current.value === 3) {
    router.push("/");
  }
  current.value--;
};
async function getMatch() {
  if (auth.user) {
    let url = "/getMatch?";
    for (let i = 0; i < selectedRegions.value.length; i++) {
      url += `regions[]=${selectedRegions.value[i]}&`;
    }
    for (let i = 0; i < selectedRanks.value.length; i++) {
      url += `ranks[]=${selectedRanks.value[i]}&`;
    }
    //console.log(url);

    const header = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.user.signInUserSession.idToken.jwtToken}`,
      },
    };

    loading.value = true;
    await http.api
      .get(url, header)
      .then((res) => {
        //console.log(res);
        rankedMatch.value = res.data.rankedMatch;
        sensitive.value = res.data.sensitive;
      })
      .catch(() => {
        alert("Error finding ranked match. Please try again.");
        prev();
      });
    loading.value = false;
  } else {
    await getMatchNoAuth();
  }
}

async function getMatchNoAuth() {
  let url = "/getmatchid?";
  for (let i = 0; i < selectedRegions.value.length; i++) {
    url += `regions[]=${selectedRegions.value[i]}&`;
  }
  for (let i = 0; i < selectedRanks.value.length; i++) {
    url += `ranks[]=${selectedRanks.value[i]}&`;
  }
  //console.log(url);

  const header = {
    headers: {
      "Content-type": "application/json",
    },
  };

  loading.value = true;
  await http.api
    .get(url, header)
    .then((res) => {
      //console.log(res);
      rankedMatch.value = res.data.rankedMatch;
      encryptedRank.value = res.data.rank;
      // selectedRanks.value = res.data.ranks;
      verifiedRegion.value = res.data.region;
    })
    .catch(() => {
      alert("Error finding ranked match. Please try again.");
      prev();
    });
  loading.value = false;
}

async function getReplay() {
  let url = `/getReplay?guessId=${props.guessId}`;
  //console.log(url);

  const header = {
    headers: {
      "Content-type": "application/json",
    },
  };

  loading.value = true;
  await http.api
    .get(url, header)
    .then((res) => {
      //console.log(res);
      rankedMatch.value = res.data.rankedMatch;
      encryptedRank.value = res.data.rank;
      selectedRanks.value = res.data.ranks;
      verifiedRegion.value = res.data.region;
    })
    .catch(() => {
      alert("Error finding ranked match. Please try again.");
    });
  loading.value = false;
}

function verifyReplay() {
  verifiedGuess.value = rankedMatch.value.map((p: any) =>
    p.placement.toString()
  );
  //console.log(verifiedGuess);
  verifiedRank.value = encryptedRank.value;
}

async function verifyGuess() {
  let url = "/verifyGuess";
  const header = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${auth.user.signInUserSession.idToken.jwtToken}`,
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
  "Emerald",
  "Diamond",
  "Master",
  "Grandmaster",
  "Challenger",
];
const selectedRegions = ref<string[]>([]);
const selectedRanks = ref<string[]>([]);
const selectedGuess = ref<string[]>([]);
const selectedRank = ref<string>("");
const rankedMatch = ref<object[]>([]);
const encryptedRank = ref<string>("");
const sensitive = ref<string>("");
const verifiedGuess = ref<string[]>([]);
const verifiedRank = ref<string>("");
const verifiedRegion = ref<string>("");

const prevButtonText = ["HOME", "REGIONS", "FORFEIT", "HOME"];
const buttonText = ["RANKS", "PLAY", "GUESS", "PLAY"];
</script>

<template>
  <div class="steps-content">
    <div v-if="current <= 1 && !loading">
      <h3 class="gold">FREEPLAY</h3>
      <p>Guess on a random match from the selected ranks and regions</p>
    </div>

    <CustomCard style="align-items: normal">
      <div v-if="!loading">
        <div v-if="current === 0">
          <h5>REGIONS</h5>
          <div class="region-grid">
            <FreeplaySettings
              :options="regions"
              :selected-options="selectedRegions"
              @update-options="(newOptions) => (selectedRegions = newOptions)"
            />
          </div>
        </div>
        <div v-if="current === 1">
          <h5>RANKS</h5>
          <div class="rank-grid">
            <FreeplaySettings
              :options="ranks"
              :selected-options="selectedRanks"
              @update-options="(newOptions) => (selectedRanks = newOptions)"
              :icons="true"
            />
          </div>
        </div>
        <div v-if="current === 2 || current === 3" class="table-div">
          <DragAndDropTable
            :rankedMatch="rankedMatch"
            @update-selected-guess="selectedGuess = $event"
            :verifiedGuess="verifiedGuess"
            :selectedRanks="selectedRanks"
          />
          <div style="margin-top: 1rem">
            <GuessRank
              v-if="current === 2 || current === 3"
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
              v-if="current === 3"
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
      </div>
      <div v-else><Loading /></div>
    </CustomCard>
  </div>
  <div class="steps-action">
    <HomeButton
      type="default"
      :title="prevButtonText[current]"
      :active="!loading"
      :onClick="prev"
      ><template #icon
        ><double-left-outlined
          style="color: rgb(240, 230, 210); font-size: 1.75rem" /></template
    ></HomeButton>
    <HomeButton
      :title="buttonText[current]"
      :active="
        ((selectedRegions.length > 0 && current === 0) ||
          (selectedRanks.length > 0 && current === 1) ||
          (current === 2 && selectedRank.length > 0) ||
          current === 3) &&
        !loading
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
  padding-bottom: 1rem;
}

.action-btn {
  flex-basis: 50%;
}

.extra {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.region-grid,
.rank-grid {
  display: grid;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.region-grid {
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}

.rank-grid {
  grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
}

@media only screen and (max-width: 1024px) {
  .region-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }

  .rank-grid {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  }
}
</style>
