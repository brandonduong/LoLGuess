<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ArrowRightOutlined } from "@ant-design/icons-vue";

const props = defineProps<{
  selectedRanks: string[];
  verifiedRank: string;
  selectedRank: string;
  loading: boolean;
}>();

const emit = defineEmits(["updateSelectedRank"]);

function updateRank(event: string) {
  emit("updateSelectedRank", event);
}

function checkIfCorrect() {
  return props.verifiedRank && props.verifiedRank === props.selectedRank;
}

function correctionStyle() {
  const selectedInd = props.selectedRanks.indexOf(props.selectedRank);
  const verifiedInd = props.selectedRanks.indexOf(props.verifiedRank);
  switch (Math.abs(selectedInd - verifiedInd)) {
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
  <div class="rank-guess">
    <h2 class="rank-title">Rank:</h2>
    <a-select
      @change="updateRank"
      placeholder="Guess Rank"
      :dropdownMatchSelectWidth="false"
      :hidden="props.verifiedRank.length !== 0"
      :disabled="props.loading"
      :loading="props.loading"
      class="rank-select"
    >
      <a-select-option v-for="rank in props.selectedRanks" :value="rank">
        <div class="option">
          <h3>{{ rank }}</h3>
          <img
            class="rank-icon"
            :src="`/${rank.toLowerCase()}.png`"
            :alt="rank"
            :title="rank"
          />
        </div>
      </a-select-option>
    </a-select>
    <div v-if="props.verifiedRank" :class="'rank ' + correctionStyle()">
      <div class="rank-div">
        <h2 :class="checkIfCorrect() ? `original` : `original strike`">
          {{ props.selectedRank }}
        </h2>
        <img
          :class="checkIfCorrect() ? `rank-icon` : `rank-icon strike`"
          :src="`/${props.selectedRank.toLowerCase()}.png`"
          :alt="props.selectedRank"
          :title="props.selectedRank"
        />
      </div>
      <div class="rank-div" v-if="!checkIfCorrect()">
        <h2 class="correction">
          <ArrowRightOutlined
            style="font-size: 1.25rem; display: inline-block"
          />{{ `${props.verifiedRank}` }}
        </h2>
        <img
          class="rank-icon"
          :src="`/${props.verifiedRank.toLowerCase()}.png`"
          :alt="props.verifiedRank"
          :title="props.verifiedRank"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.rank-guess {
  display: flex;
  column-gap: 1rem;
  justify-items: start;
  align-items: center;
  flex-wrap: wrap;
}

.rank-title {
  margin: 0;
}

.rank {
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.5rem;
}

.rank-select {
  border: 1px solid lightslategray;
}

div.rank-div > h2 {
  margin: 0;
}

.rank-div {
  display: flex;
  align-items: center;
  white-space: nowrap;
  column-gap: 0.5rem;
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

.orange {
  background-color: rgb(223, 169, 88);
}

.yellow {
  background-color: rgb(238, 235, 69);
}

.correct {
  background-color: rgb(115, 207, 115);
}

.rank-icon {
  width: 1.75rem;
  height: 1.75rem;
}

.option {
  display: grid;
  grid-template-columns: 1fr 0.25fr;
  align-items: center;
}
.option > h3 {
  margin: 0;
}
</style>
