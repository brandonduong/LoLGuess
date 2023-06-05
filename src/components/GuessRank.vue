<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  selectedRanks: string[];
  verifiedRank: string;
  selectedRank: string;
}>();

const emit = defineEmits(["updateSelectedRank"]);

function updateRank(event: string) {
  emit("updateSelectedRank", event);
}

function checkIfCorrect() {
  return props.verifiedRank && props.verifiedRank === props.selectedRank;
}

onMounted(async () => {
  updateRank("");
});
</script>
<template>
  <div class="rank-guess">
    <h3 class="rank">Rank:</h3>
    <a-select
      @change="updateRank"
      placeholder="Guess Rank"
      :dropdownMatchSelectWidth="false"
      :hidden="props.verifiedRank.length !== 0"
    >
      <a-select-option
        v-for="rank in props.selectedRanks"
        :value="rank"
      ></a-select-option>
    </a-select>
    <div
      v-if="props.verifiedRank"
      :class="checkIfCorrect() ? `rank correct` : `rank incorrect`"
    >
      <h3 :class="checkIfCorrect() ? `original` : `original strike`">
        {{ props.selectedRank }}
      </h3>
      <h3 class="correction" v-if="!checkIfCorrect()">
        {{ `-->${props.verifiedRank}` }}
      </h3>
    </div>
  </div>
</template>
<style scoped>
.rank-guess {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  justify-items: start;
}

.rank {
  padding: 0 0.75rem;
  border-radius: 1rem;
  margin: 0;
}

div.rank > h3 {
  margin: 0;
}

.original {
  display: inline-block;
}
.correction {
  display: inline-block;
}

.strike {
  text-decoration: line-through;
}

.incorrect {
  background-color: rgb(223, 88, 88);
}

.correct {
  background-color: rgb(115, 207, 115);
}
</style>
