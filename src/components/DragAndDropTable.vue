<template>
  <table class="table-header">
    <h2>Placement</h2>
    <h2>Level</h2>
    <h2>Traits</h2>
    <h2>Augments</h2>
    <h2>Units</h2>
    <h2>Left Gold</h2>
    <div>
      <h3>1</h3>
      <h3>2</h3>
      <h3>3</h3>
      <h3>4</h3>
      <h3>5</h3>
      <h3>6</h3>
      <h3>7</h3>
      <h3>8</h3>
    </div>
    <draggable v-model="list" tag="tbody" item-key="name" class="draggable">
      <template #item="{ element }">
        <tr class="draggable-row">
          <h3>{{ element.level }}</h3>
          <h3>placeholder traits</h3>
          <h3>placeholder augments</h3>
          <h3>placeholder units</h3>
          <h3>{{ element.gold_left }}</h3>
        </tr>
      </template>
    </draggable>
  </table>
</template>

<script lang="ts">
import draggable from "vuedraggable";
export default {
  name: "table-example",
  display: "Table",
  order: 8,
  components: {
    draggable,
  },
  props: {
    rankedMatch: Array,
  },
  data() {
    return {
      list: this.rankedMatch,
      dragging: false,
    };
  },
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.draggable {
  grid-column: span 5;
}

.draggable-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>
