<script setup lang="ts">
import TraitIcons from "./TraitIcons.vue";
import AugmentIcons from "./AugmentIcons.vue";
import UnitIcons from "./UnitIcons.vue";
import GoldIcons from "./GoldIcons.vue";
import LevelIcons from "./LevelIcons.vue";
import { onMounted, ref } from "vue";
import { Sortable } from "sortablejs-vue3";
import { useRouter } from "vue-router";
import type { Team } from "@/common/interfaces";
import { store } from "@/common/store";
const props = defineProps<{
  rankedMatch: Team[];
  verifiedGuess: string[];
  selectedRanks: string[];
  verifiedLastRounds?: number[];
}>();

const emit = defineEmits(["updateSelectedGuess"]);
interface SortableEvent {
  oldIndex: number;
  newIndex: number;
}

const router = useRouter();

onMounted(async () => {
  updateGuess();
});

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
    case 1:
      return "partial";

    default:
      return "incorrect";
  }
}

function convertToRounds(lastRound: number) {
  let stage = 1;
  let round = 1;
  while (lastRound > 1) {
    lastRound -= 1;
    round += 1;

    if ((stage === 1 && round === 5) || round === 8) {
      // 4 rounds in stage 1, 7 rounds in stage > 1
      stage += 1;
      round = 1;
    }
  }

  return `${stage} - ${round}`;
}

function getRound(lastRounds: number[], placement: number) {
  return lastRounds.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))[placement - 1];
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
  <table class="table-header" v-if="!store.loading">
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
          <div v-if="verifiedLastRounds">
            <p style="margin: 0; color: var(--color-offwhite)">
              {{
                convertToRounds(
                  getRound(
                    verifiedLastRounds,
                    parseInt(verifiedGuess[placement - 1])
                  )
                )
              }}
            </p>
          </div>
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
          <TraitIcons :traits="element.traits" />
          <AugmentIcons
            :augments="element.augments"
            :augmentAmount="element.augmentNum"
          />
          <UnitIcons :units="element.units" />

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

.partial {
  background-color: var(--color-light-blue);
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
