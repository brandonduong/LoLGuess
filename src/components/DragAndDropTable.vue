<script setup lang="ts">
import TraitIcons from "./TraitIcons.vue";
import AugmentIcons from "./AugmentIcons.vue";
import UnitIcons from "./UnitIcons.vue";
import GoldIcons from "./GoldIcons.vue";
import LevelIcons from "./LevelIcons.vue";
import { onMounted, ref } from "vue";
import http from "../common/http-common";
import { Sortable } from "sortablejs-vue3";
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
  character_id: string;
  squareIconPath: string;
  display_name: string;
  path: string;
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

onMounted(async () => {
  const staticData = window.localStorage.getItem("staticTFTData");
  if (staticData) {
    staticTFTTraitData = JSON.parse(staticData).traitData;
    staticTFTAugmentData = JSON.parse(staticData).augmentData;
    staticTFTUnitData = JSON.parse(staticData).unitData;
    staticTFTItemData = JSON.parse(staticData).itemData;
    loading.value = false;
  } else {
    await getStaticTFTData().then(() => {
      loading.value = false;
      localStorage.setItem(
        "staticTFTData",
        JSON.stringify({
          traitData: staticTFTTraitData,
          augmentData: staticTFTAugmentData,
          unitData: staticTFTUnitData,
          itemData: staticTFTItemData,
        })
      );
    });
  }
  updateGuess();
});

async function getStaticTFTData() {
  await http.dragon
    .get("/plugins/rcp-be-lol-game-data/global/default/v1/tfttraits.json")
    .then((res) => {
      staticTFTTraitData = res.data;
    });

  await http.dragon
    .get("/plugins/rcp-be-lol-game-data/global/default/v1/tftitems.json")
    .then((res) => {
      staticTFTAugmentData = res.data;
    });

  await http.dragon
    .get("/plugins/rcp-be-lol-game-data/global/default/v1/tftchampions.json")
    .then((res) => {
      staticTFTUnitData = res.data;
    });

  await http.dragon
    .get("/plugins/rcp-be-lol-game-data/global/default/v1/tftitems.json")
    .then((res) => {
      staticTFTItemData = res.data;
    });
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
  if (placement.toString() !== props.verifiedGuess[placement - 1]) {
    return false;
  } else {
    return true;
  }
}
</script>
<template>
  <table class="table-header" v-if="!loading">
    <h2></h2>
    <h2>Level</h2>
    <h2>Traits</h2>
    <h2>Augments</h2>
    <h2>Units</h2>
    <h2>Gold</h2>
    <div class="placements">
      <div
        v-for="placement in 8"
        :class="
          props.verifiedGuess.length !== 0
            ? checkIfCorrect(placement)
              ? `placement correct`
              : `placement incorrect`
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
        <h3 class="correction">
          {{
            props.verifiedGuess.length !== 0 && !checkIfCorrect(placement)
              ? `-->${verifiedGuess[placement - 1]}`
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
      :options="{ animation: 150, disabled: props.verifiedGuess.length !== 0 }"
      @end="onChange"
    >
      <template #item="{ element }">
        <tr class="draggable-row">
          <h3><LevelIcons :level="element.level" /></h3>
          <h3>
            <TraitIcons
              :staticTFTTraitData="staticTFTTraitData"
              :traits="element.traits"
            />
          </h3>
          <h3>
            <AugmentIcons
              :staticTFTAugmentData="staticTFTAugmentData"
              :augments="element.augments"
              :augmentAmount="element.augmentNum"
            />
          </h3>
          <h3>
            <UnitIcons
              :units="element.units"
              :staticTFTUnitData="staticTFTUnitData"
              :staticTFTItemData="staticTFTItemData"
            />
          </h3>
          <GoldIcons :goldLeft="element.gold_left" />
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
  grid-template-columns: 0.15fr 0.15fr 0.3fr 0.3fr 1fr 0.15fr;
}

.table-header > h2 {
  margin: 0;
}

.draggable {
  grid-column: span 5;
}

.draggable-row > h3 {
  margin: 0;
}

.draggable-row > h3 > h3 {
  margin: 0;
}

.draggable-row {
  display: grid;
  grid-template-columns: 0.15fr 0.3fr 0.3fr 1fr 0.15fr;
  align-items: center;
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
  font-size: 1.2rem;
}
</style>
