<template>
  <a-checkbox-group
    class="options"
    v-model:value="checkedList"
    :options="options"
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

export default defineComponent({
  props: { options: Array<String>, selectedOptions: Array<String> },
  emits: ["updateSelectedOptions"],
  setup(props, { emit }) {
    const state = reactive({
      indeterminate:
        props.selectedOptions!.length &&
        props.selectedOptions!.length < props.options!.length,
      checkAll: props.selectedOptions!.length === props.options!.length,
      checkedList: props.selectedOptions,
    });

    const onCheckAllChange = (e: any) => {
      Object.assign(state, {
        checkedList: e.target.checked ? props.options : [],
        indeterminate: false,
      });
    };
    watch(
      () => state.checkedList,
      (val) => {
        state.indeterminate =
          !!val!.length && val!.length < props.options!.length;
        state.checkAll = val!.length === props.options!.length;
        emit("updateSelectedOptions", state.checkedList);
      }
    );

    return {
      ...toRefs(state),
      onCheckAllChange,
    };
  },
});
</script>
<style scoped>
.options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0fr;
  padding: 0 2rem;
  font-size: 2rem;
}

.all {
  text-align: start;
  padding: 0 2rem 1rem;
}
</style>
