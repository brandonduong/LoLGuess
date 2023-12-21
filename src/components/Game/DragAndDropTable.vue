<script setup lang="ts">
import TraitIcons from "./TraitIcons.vue";
import AugmentIcons from "./AugmentIcons.vue";
import UnitIcons from "./UnitIcons.vue";
import GoldIcons from "./GoldIcons.vue";
import LevelIcons from "./LevelIcons.vue";
import { onMounted, ref } from "vue";
import http from "../../common/http-common";
import { Sortable } from "sortablejs-vue3";
import { DragOutlined, ArrowRightOutlined } from "@ant-design/icons-vue";
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
  loadoutsIcon: string;
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
  loadoutsIcon: string;
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
    case 1:
      return "yellow";
    case 2:
      return "orange";
    default:
      return "incorrect";
  }
}
</script>
<template>
  <h4 class="table-description">
    <span v-if="props.verifiedGuess.length !== 0">
      Like guessing? Support on
      <a class="ko-fi" href="https://ko-fi.com/brandonduong" target="_blank"
        >Ko-fi</a
      >
      or visit the
      <a class="ko-fi" @click="() => router.push('/supporters')">Supporters</a>
      page!
    </span>
    <span v-else> Guess how the lobby ended! </span>
  </h4>
  <table class="table-header" v-if="!loading">
    <h2 class="header">#</h2>
    <h2 class="header"></h2>
    <h2 class="header">Level</h2>
    <h2 class="header">Traits</h2>
    <h2 class="header">Augments</h2>
    <h2 class="header">Units</h2>
    <h2 class="header">Gold</h2>
    <div class="placements">
      <div
        v-for="placement in 8"
        :class="
          props.verifiedGuess.length !== 0
            ? 'placement ' + correctionStyle(placement)
            : ``
        "
      >
        <h3
          :class="
            props.verifiedGuess.length !== 0 && !checkIfCorrect(placement)
              ? `strike`
              : ``
          "
        >
          {{ placement }}
        </h3>
        <h3
          class="arrow"
          v-if="props.verifiedGuess.length !== 0 && !checkIfCorrect(placement)"
        >
          <ArrowRightOutlined
            style="
              font-size: 1.25rem;
              display: inline-block;
              padding: 0 0.25rem 0 0.4rem;
            "
          />
        </h3>
        <h3 class="correction">
          {{
            props.verifiedGuess.length !== 0 && !checkIfCorrect(placement)
              ? `${verifiedGuess[placement - 1]}`
              : ""
          }}
        </h3>
      </div>
    </div>
    <Sortable
      :list="props.rankedMatch"
      tag="tbody"
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
          <DragOutlined
            style="color: black; font-size: 1rem"
            v-if="props.verifiedGuess.length === 0"
            class="drag-icon"
          />
          <div v-else class="drag-icon"></div>
          <h3><LevelIcons :level="element.level" /></h3>
          <div class="mobile-gold">
            <GoldIcons :goldLeft="element.gold_left" />
          </div>
          <TraitIcons
            :staticTFTTraitData="staticTFTTraitData"
            :traits="element.traits"
          />
          <AugmentIcons
            :staticTFTAugmentData="staticTFTAugmentData"
            :augments="element.augments"
            :augmentAmount="element.augmentNum"
          />
          <h3>
            <UnitIcons
              :units="element.units"
              :staticTFTUnitData="staticTFTUnitData"
              :staticTFTItemData="staticTFTItemData"
            />
          </h3>
          <div class="web-gold">
            <GoldIcons :goldLeft="element.gold_left" />
          </div>
        </tr>
      </template>
    </Sortable>
  </table>
</template>
<style scoped>
.buttons {
  margin-top: 35px;
}

.table-header {
  display: grid;
  grid-template-columns: 0.15fr 0.05fr 0.15fr 0.2fr 0.3fr 1fr 0.15fr;
  column-gap: 1rem;
}

.table-header > h2 {
  margin: 0;
}

.draggable {
  grid-column: span 6;
  display: grid;
  row-gap: 0.5rem;
}

.draggable-row > h3 {
  margin: 0;
}

.draggable-row > h3 > h3 {
  margin: 0;
}

.draggable-row {
  display: grid;
  grid-template-columns: 0.05fr 0.15fr 0.2fr 0.3fr 1fr 0.15fr;
  align-items: center;
  border: 1px solid lightslategray;
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
  margin: 0 0.75rem;
}

.incorrect {
  background-color: rgb(223, 88, 88);
}

.orange {
  background-color: rgb(223, 169, 88);
}

.yellow {
  background-color: rgb(238, 235, 69);
}

.correct {
  background-color: rgb(115, 207, 115);
}

.strike {
  text-decoration: line-through;
}

.correction {
  text-decoration: none;
}

.placement {
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  white-space: nowrap;
  padding: 0 0.5rem;
}

.placements > div > h3 {
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
}

.table-description {
  text-decoration: underline;
}

.ko-fi {
  font-weight: bold;
  text-decoration: underline;
  color: var(--theme-love);
}

.dragging {
  border-color: black;
}

.mobile-gold {
  display: none;
}

@media only screen and (max-width: 720px) {
  .dragging {
    border-width: 0.15rem;
  }

  .table-header {
    column-gap: 0;
  }

  .placements {
    margin: 0 0.5rem 0 0;
  }

  .placements > div > h3 {
    line-height: 2rem;
  }

  .draggable-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 0.25rem;
    gap: 0;
  }

  .header,
  .drag-icon,
  .arrow,
  .strike,
  .web-gold {
    display: none;
  }

  .mobile-gold {
    display: block;
  }
}
</style>
