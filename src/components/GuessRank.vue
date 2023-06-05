<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  selectedRanks: string[];
  verifiedRank: string;
}>();

const emit = defineEmits(["updateSelectedRank"]);

function updateRank(event: string) {
  emit("updateSelectedRank", event);
}

onMounted(async () => {
  updateRank("");
});
</script>
<template>
  <div class="rank-guess">
    <h3 class="rank">Rank:</h3>
    <a-select @change="updateRank" placeholder="Guess Rank">
      <a-select-option
        v-for="rank in props.selectedRanks"
        :value="rank"
      ></a-select-option>
    </a-select>
  </div>
</template>
<style scoped>
.rank-guess {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  justify-items: start;
}
</style>
