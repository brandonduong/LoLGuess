<script setup lang="ts">
import TraitIcons from "./TraitIcons.vue";
import AugmentIcons from "./AugmentIcons.vue";
import UnitIcons from "./UnitIcons.vue";
import GoldIcons from "./GoldIcons.vue";
import LevelIcons from "./LevelIcons.vue";
import { onMounted, ref } from "vue";
import http from "../../common/http-common";
import { Sortable } from "sortablejs-vue3";
import { useRouter } from "vue-router";
const props = defineProps<{
  rankedMatch: Array<object>;
  verifiedGuess: string[];
  selectedRanks: string[];
}>();

const emit = defineEmits(["updateSelectedGuess"]);
interface SortableEvent {
  oldIndex: number;
  newIndex: number;
}
interface StaticData {
  apiName: string;
  icon: string;
  name: string;
  tileIcon: string;
}
interface StaticSetData {
  champions: StaticData[];
  traits: StaticData[];
}
interface StaticSetsData {
  9: StaticSetData;
  10: StaticSetData;
  11: StaticSetData;
}

var loading = ref(true);
var staticTFTItemData = ref<StaticData[]>([]);
var staticTFTSetsData = ref<StaticSetsData>();
const router = useRouter();

onMounted(async () => {
  await getStaticTFTData().then(() => {
    loading.value = false;
  });
  updateGuess();
});

async function getStaticTFTData() {
  const staticData = window.localStorage.getItem("staticTFTData");
  // Today in UTC with no time
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0];
  if (!staticData || JSON.parse(staticData).date !== today) {
    await http.dragon.get("/cdragon/tft/en_us.json").then((res) => {
      staticTFTItemData.value = res.data.items;
      staticTFTSetsData.value = res.data.sets;
    });
    //console.log(staticTFTAugmentData);
    localStorage.setItem(
      "staticTFTData",
      JSON.stringify({
        items: staticTFTItemData.value,
        sets: staticTFTSetsData.value,
        date: today,
      })
    );
  } else {
    const parsed = JSON.parse(staticData);
    //console.log(parsed);
    staticTFTItemData.value = parsed.items;
    staticTFTSetsData.value = parsed.sets;
  }
}

function onChange(event: SortableEvent) {
  const item = props.rankedMatch.splice(event.oldIndex, 1)[0];
  props.rankedMatch.splice(event.newIndex, 0, item);
  updateGuess();
}

function updateGuess() {
  emit(
    "updateSelectedGuess",
    props.rankedMatch.map((player: any) => player.placement)
  );
}

function correctionStyle(placement: number) {
  // console.log(placement, props.verifiedGuess[placement - 1]);
  switch (Math.abs(placement - parseInt(props.verifiedGuess[placement - 1]))) {
    case 0:
      return "correct";

    default:
      return "incorrect";
  }
}
</script>
<template>
  <h5>
    <span v-if="props.verifiedGuess.length !== 0">
      THANKS FOR PLAYING
      <p>
        Support on
        <a href="https://ko-fi.com/brandonduong" target="_blank">Ko-fi</a>
        or visit the
        <a @click="() => router.push('/supporters')">Supporters</a>
        page!
      </p>
    </span>
    <span v-else
      >GUESS THE PLACEMENTS AND RANK
      <p>Click and drag teams to sort</p></span
    >
  </h5>
  <table class="table-header" v-if="!loading">
    <div class="placements">
      <div
        v-for="placement in 8"
        :class="
          props.verifiedGuess.length !== 0
            ? 'placement ' + correctionStyle(placement)
            : ``
        "
        class="number"
      >
        <h4 v-if="props.verifiedGuess.length === 0" class="number">
          {{ placement }}
        </h4>
        <h4 v-else class="number">
          {{
            props.verifiedGuess.length !== 0
              ? `${verifiedGuess[placement - 1]}`
              : ""
          }}
        </h4>
      </div>
    </div>
    <Sortable
      :list="props.rankedMatch"
      tag="table"
      item-key="name"
      class="draggable"
      :options="{
        animation: 150,
        disabled: props.verifiedGuess.length !== 0,
        delay: 50,
        delayOnTouchOnly: true,
        chosenClass: 'dragging',
      }"
      @end="onChange"
    >
      <template #item="{ element }">
        <tr
          :class="
            props.verifiedGuess.length === 0
              ? `draggable-row grab`
              : `draggable-row`
          "
        >
          <LevelIcons :level="element.level" />
          <TraitIcons
            :staticTFTSetsData="staticTFTSetsData!"
            :traits="element.traits"
          />
          <AugmentIcons
            :staticTFTItemData="staticTFTItemData"
            :augments="element.augments"
            :augmentAmount="element.augmentNum"
          />
          <UnitIcons
            :units="element.units"
            :staticTFTSetsData="staticTFTSetsData"
            :staticTFTItemData="staticTFTItemData"
          />
          <GoldIcons :goldLeft="element.gold_left" style="margin-left: auto" />
        </tr>
      </template>
    </Sortable>
  </table>
</template>
<style scoped>
.table-header {
  display: flex;
  column-gap: 1rem;
  overflow: auto;
}
.draggable {
  width: 100%;
}

.draggable-row {
  display: flex;
  align-items: center;
  column-gap: 1rem;
  user-select: none;
}

.grab {
  cursor: grab;
}

.placements {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-width: 75px;
}

.incorrect {
  background-color: var(--color-dark-blue);
}

.correct {
  background-color: var(--color-gold);
}

.placements > div > h4 {
  margin: 0;
}

.placement {
  border-radius: 0.5rem;
}

@media only screen and (max-width: 1028px) {
  .grab {
    border: 1px solid transparent;
  }
  .dragging {
    border: 1px solid var(--color-gold);
  }
}
</style>
