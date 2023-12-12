<script setup lang="ts">
import TraitIcons from "./TraitIcons.vue";
import AugmentIcons from "./AugmentIcons.vue";
import UnitIcons from "./UnitIcons.vue";
import GoldIcons from "./GoldIcons.vue";
import LevelIcons from "./LevelIcons.vue";
import { onMounted, ref } from "vue";
import http from "../../common/http-common";
import { Sortable } from "sortablejs-vue3";
import { DragOutlined } from "@ant-design/icons-vue";
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
  //console.log(staticTFTAugmentData);

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
  //console.log(props.verifiedGuess, placement);
  if (placement.toString() !== props.verifiedGuess[placement - 1]) {
    return false;
  } else {
    return true;
  }
}
</script>
<template>
  <h4 class="table-description">
    <span v-if="props.verifiedGuess.length !== 0">
      Like guessing? Support on
      <a class="ko-fi" href="https://ko-fi.com/brandonduong" target="_blank"
        >Ko-fi</a
      >!

      <h5>
        Or read our MANY great testimonials on the
        <a class="ko-fi" @click="() => router.push('/supporters')"
          >Supporters</a
        >
        page!
      </h5>
    </span>
    <span v-else> Guess how the lobby ended! </span>
  </h4>
  <table class="table-header" v-if="!loading">
    <h2>#</h2>
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
          />
          <div v-else></div>
          <h3><LevelIcons :level="element.level" /></h3>
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
  border-width: 0.25rem;
}
</style>
