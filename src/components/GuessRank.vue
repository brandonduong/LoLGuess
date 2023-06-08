<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ArrowRightOutlined } from "@ant-design/icons-vue";

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
    <h2 class="rank">Rank:</h2>
    <a-select
      @change="updateRank"
      placeholder="Guess Rank"
      :dropdownMatchSelectWidth="false"
      :hidden="props.verifiedRank.length !== 0"
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
    <div
      v-if="props.verifiedRank"
      :class="checkIfCorrect() ? `rank correct` : `rank incorrect`"
    >
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
          />
          {{ `${props.verifiedRank}` }}
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
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  justify-items: start;
}

.rank {
  padding: 0 0.75rem;
  border-radius: 1rem;
  margin: 0;
  display: flex;
}

div.rank-div > h2 {
  margin: 0;
}

.rank-div {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
  align-items: center;
  white-space: nowrap;
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

.rank-icon {
  width: 1.75rem;
  height: 1.75rem;
  margin-left: 0.5rem;
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
