<template>
  <div class="options">
    <a-checkbox
      class="option"
      v-model:value="checkedList"
      v-for="option in options"
      :checked="checkedList!.includes(option)"
      @click="checkBox(option)"
    >
      <div class="option-div">
        {{ option }}
        <img
          v-if="icons"
          :src="`/${option.toLowerCase()}.png`"
          :alt="option.toString()"
          :title="option.toString()"
          class="icon"
        />
      </div>
    </a-checkbox>
  </div>
  <a-divider class="divider" />
  <div class="all">
    <a-checkbox
      v-model:checked="checkAll"
      :indeterminate="indeterminate"
      @change="onCheckAllChange"
      class="check-all"
    >
      Check all
    </a-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";

export default defineComponent({
  props: {
    options: Array<String>,
    selectedOptions: Array<String>,
    icons: Boolean,
  },
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

    const checkBox = (option: String) => {
      if (!state.checkedList!.includes(option)) {
        state.checkedList!.push(option);
      } else {
        const ind = state.checkedList!.indexOf(option);
        state.checkedList!.splice(ind, 1);
      }
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
      checkBox,
    };
  },
});
</script>
<style scoped>
.options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  padding: 0.25rem 2rem 0;
}

.all {
  text-align: start;
  padding: 0 2rem;
}

.divider {
  margin: 0.5rem 0;
}

.option {
  margin: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.check-all {
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.icon {
  height: 1.75rem;
  padding-left: 0.25rem;
}

.option-div {
  display: flex;
  align-items: center;
}
</style>
