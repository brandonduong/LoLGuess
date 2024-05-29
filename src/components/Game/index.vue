<script setup lang="ts">
import { ref, h } from "vue";
import {
  LoadingOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons-vue";
import http from "../../common/http-common";
import GroupSettings from "./GroupSettings.vue";
import DragAndDropTable from "./DragAndDropTable.vue";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import GuessRank from "./GuessRank.vue";
import GuessScore from "./GuessScore.vue";
import GuessRegion from "./GuessRegion.vue";
import { useRouter } from "vue-router";
import CustomCard from "../CustomCard.vue";
import HomeButton from "../Home/HomeButton.vue";
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
  current.value--;
  if (current.value < 0) {
    router.push("/");
  }
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

const prevButtonText = ["HOME", "REGIONS", "FORFEIT", ""];
const buttonText = ["RANKS", "PLAY", "GUESS", "PLAY AGAIN"];

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "4rem",
    margin: "5rem 0 4.5rem 0",
    color: "lightslategray",
  },
  spin: true,
});
</script>

<template>
  <div class="steps-content">
    <h3 v-if="current <= 1 && !loading" class="gold">FREEPLAY</h3>
    <p>Guess on a random match from the selected ranks and regions</p>

    <CustomCard style="align-items: normal">
      <div v-if="!loading">
        <div v-if="current === 0">
          <GroupSettings
            :options="regions"
            :selected-options="selectedRegions"
            @update-selected-options="selectedRegions = $event"
            description="REGIONS"
          />
        </div>
        <div v-if="current === 1">
          <GroupSettings
            :options="ranks"
            :selected-options="selectedRanks"
            @update-selected-options="selectedRanks = $event"
            :icons="true"
            description="RANKS"
          />
        </div>
        <div v-if="current === 2 || current === 3" class="table-div">
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
              v-if="current === 2 || current === 3"
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
              v-if="current === 3"
            />
            <GuessRegion :region="verifiedRegion" v-if="current === 3" />
          </div>
        </div>
      </div>
      <div v-else><a-spin :indicator="indicator"></a-spin></div>
    </CustomCard>
  </div>
  <div class="steps-action">
    <HomeButton
      type="default"
      :title="prevButtonText[current]"
      :active="current < steps.length - 1 && !loading"
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

@media only screen and (max-width: 720px) {
  .table-div {
    overflow: auto;
  }
}
</style>
