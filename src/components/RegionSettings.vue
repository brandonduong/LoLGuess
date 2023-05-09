<template>
  <a-checkbox-group
    class="regions"
    v-model:value="checkedList"
    :options="regions"
  />
  <a-divider />
  <div class="all">
    <a-checkbox
      v-model:checked="checkAll"
      :indeterminate="indeterminate"
      @change="onCheckAllChange"
    >
      Check all
    </a-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
const regions = [
  "BR",
  "EUNE",
  "EUW",
  "JP",
  "KR",
  "LAN",
  "LAS",
  "NA",
  "OCE",
  "TR",
  "RU",
  "PH",
  "SG",
  "TH",
  "TW",
  "VN",
];
export default defineComponent({
  setup() {
    const state = reactive({
      indeterminate: true,
      checkAll: false,
      checkedList: ["NA"],
    });

    const onCheckAllChange = (e: any) => {
      Object.assign(state, {
        checkedList: e.target.checked ? regions : [],
        indeterminate: false,
      });
    };
    watch(
      () => state.checkedList,
      (val) => {
        state.indeterminate = !!val.length && val.length < regions.length;
        state.checkAll = val.length === regions.length;
      }
    );

    return {
      ...toRefs(state),
      regions,
      onCheckAllChange,
    };
  },
});
</script>
<style scoped>
.regions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0fr;
  padding: 0 2rem;
  font-size: 2rem;
}

.all {
  text-align: start;
  padding-left: 2rem;
}
</style>
