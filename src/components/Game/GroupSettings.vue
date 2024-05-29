<template>
  <h5 class="description">{{ description }}</h5>
  <div class="options">
    <a-checkbox
      class="option"
      v-model:value="checkedList"
      v-for="option in options"
      :checked="checkedList!.includes(option)"
      @click="checkBox(option)"
    >
      <div class="option-div">
        <p>{{ option }}</p>
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
  <div class="all">
    <a-checkbox
      v-model:checked="checkAll"
      :indeterminate="indeterminate"
      @change="onCheckAllChange"
      class="check-all"
    >
      <p class="check-all-text">Check all</p>
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
    description: String,
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
        const cpy = [...state.checkedList!];
        cpy.push(option);
        // Sort checked list
        cpy.sort((a, b) =>
          props.options!.indexOf(a) > props.options!.indexOf(b)
            ? 1
            : props.options!.indexOf(a) < props.options!.indexOf(b)
            ? -1
            : 0
        );
        const indet =
          props.selectedOptions!.length &&
          props.selectedOptions!.length < props.options!.length;
        Object.assign(state, {
          checkedList: cpy,
          indeterminate: indet,
        });
      } else {
        const ind = state.checkedList!.indexOf(option);
        const cpy = [...state.checkedList!];
        cpy.splice(ind, 1);
        const indet =
          props.selectedOptions!.length &&
          props.selectedOptions!.length < props.options!.length;
        Object.assign(state, {
          checkedList: cpy,
          indeterminate: indet,
        });
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  padding: 1rem;
  gap: 1rem;
}

.all {
  text-align: start;
  padding: 0 1rem;
}

.option {
  margin: 0;
  align-items: center;
}

.check-all {
  align-items: center;
  margin: 0;
  width: 100%;
}

.check-all-text {
  margin: 0;
}

.icon {
  height: 1.75rem;
  padding-left: 0.25rem;
}

.option-div {
  display: flex;
  align-items: center;
}

.option-div > p,
.description {
  margin: 0;
}
</style>
