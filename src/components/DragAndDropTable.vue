<script setup lang="ts">
import draggable from "vuedraggable";
import TraitIcons from "./TraitIcons.vue";
import { onMounted, ref } from "vue";
import http from "../common/http-common";
const props = defineProps<{
  rankedMatch: Array<object>;
}>();

interface StaticTrait {
  trait_id: string;
  icon_path: string;
}

var list = ref(props.rankedMatch);
var loading = ref(true);
var staticTFTTraitData = ref<StaticTrait[]>([]);

onMounted(async () => {
  await getStaticTFTData().then(() => {
    console.log(loading);
    loading.value = false;
  });
});

async function getStaticTFTData() {
  await http.dragon
    .get("/plugins/rcp-be-lol-game-data/global/default/v1/tfttraits.json")
    .then((res) => {
      console.log(res);
      staticTFTTraitData = res.data;
    });
}
</script>
<template>
  <table class="table-header" v-if="!loading">
    <h2>Placement</h2>
    <h2>Level</h2>
    <h2>Traits</h2>
    <h2>Augments</h2>
    <h2>Units</h2>
    <h2>Left Gold</h2>
    <div class="placements">
      <h3>1</h3>
      <h3>2</h3>
      <h3>3</h3>
      <h3>4</h3>
      <h3>5</h3>
      <h3>6</h3>
      <h3>7</h3>
      <h3>8</h3>
    </div>
    <draggable v-model="list" tag="tbody" item-key="name" class="draggable">
      <template #item="{ element }">
        <tr class="draggable-row">
          <h3>{{ element.level }}</h3>
          <h3>
            <TraitIcons
              :staticTFTTraitData="staticTFTTraitData"
              :traits="element.traits"
            />
          </h3>
          <h3>placeholder augments</h3>
          <h3>placeholder units</h3>
          <h3>{{ element.gold_left }}</h3>
        </tr>
      </template>
    </draggable>
  </table>
</template>
<style scoped>
.buttons {
  margin-top: 35px;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.draggable {
  grid-column: span 5;
}

.draggable-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
}

.placements {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
