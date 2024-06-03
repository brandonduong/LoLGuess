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
}>();

const emit = defineEmits(["updateSelectedGuess"]);

interface StaticTrait {
  trait_id: string;
  icon_path: string;
  display_name: string;
}

interface StaticAugment {
  nameId: string;
  squareIconPath: string;
  name: string;
}

interface StaticUnit {
  name: string;
  character_record: {
    character_id: string;
    squareIconPath: string;
    display_name: string;
    path: string;
  };
}

interface StaticItem {
  name: string;
  nameId: string;
  squareIconPath: string;
}

interface SortableEvent {
  oldIndex: number;
  newIndex: number;
}

var loading = ref(true);
var staticTFTTraitData = ref<StaticTrait[]>([]);
var staticTFTAugmentData = ref<StaticAugment[]>([]);
var staticTFTUnitData = ref<StaticUnit[]>([]);
var staticTFTItemData = ref<StaticItem[]>([]);
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
    await http.dragon
      .get("/plugins/rcp-be-lol-game-data/global/default/v1/tfttraits.json")
      .then((res) => {
        staticTFTTraitData.value = res.data;
      });

    await http.dragon
      .get("/plugins/rcp-be-lol-game-data/global/default/v1/tftitems.json")
      .then((res) => {
        staticTFTAugmentData.value = res.data;
      });
    //console.log(staticTFTAugmentData);

    await http.dragon
      .get("/plugins/rcp-be-lol-game-data/global/default/v1/tftchampions.json")
      .then((res) => {
        staticTFTUnitData.value = res.data;
      });

    await http.dragon
      .get("/plugins/rcp-be-lol-game-data/global/default/v1/tftitems.json")
      .then((res) => {
        staticTFTItemData.value = res.data;
      });

    localStorage.setItem(
      "staticTFTData",
      JSON.stringify({
        trait: staticTFTTraitData.value,
        augment: staticTFTAugmentData.value,
        unit: staticTFTUnitData.value,
        item: staticTFTItemData.value,
        date: today,
      })
    );
  } else {
    const parsed = JSON.parse(staticData);
    //console.log(parsed);
    staticTFTTraitData.value = parsed.trait;
    staticTFTAugmentData.value = parsed.augment;
    staticTFTUnitData.value = parsed.unit;
    staticTFTItemData.value = parsed.item;
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

function checkIfCorrect(placement: number) {
  //console.log(props.verifiedGuess, placement);
  if (placement.toString() !== props.verifiedGuess[placement - 1]) {
    return false;
  } else {
    return true;
  }
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
      LIKE GUESSING?
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
      <template #item="{ element, index }">
        <tr
          :class="
            props.verifiedGuess.length === 0
              ? `draggable-row grab`
              : `draggable-row`
          "
        >
          <LevelIcons :level="element.level" />
          <TraitIcons
            :staticTFTTraitData="staticTFTTraitData"
            :traits="element.traits"
          />
          <AugmentIcons
            :staticTFTAugmentData="staticTFTAugmentData"
            :augments="element.augments"
            :augmentAmount="element.augmentNum"
          />
          <UnitIcons
            :units="element.units"
            :staticTFTUnitData="staticTFTUnitData"
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
tr:nth-child(even) {
  background-color: var(--color-background-gray);
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

.dragging {
  border-color: var(--color-gold);
}

@media only screen and (max-width: 720px) {
  .dragging {
    border-width: 0.15rem;
  }
}
</style>
