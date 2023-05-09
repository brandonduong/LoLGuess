<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import RegionSettings from "../components/RegionSettings.vue";

const current = ref<number>(0);
const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};
const steps = [
  {
    title: "Regions",
  },
  {
    title: "Ranks",
  },
  {
    title: "Guess",
  },
];
</script>

<template>
  <div>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <div v-if="current === 0"><RegionSettings /></div>
      <div v-if="current === 1">hey</div>
      <div v-if="current === 2">hey</div>
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next"
        >Next</a-button
      >
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev"
        >Previous</a-button
      >
    </div>
  </div>
</template>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 1.5rem;
}

.steps-action {
  margin-top: 24px;
}

[data-theme="dark"] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
