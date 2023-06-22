<script setup lang="ts">
const supporters = [
  { name: "Tupy", msg: "Test" },
  { name: "Ninjakat2000", msg: "Test" },
];
</script>

<template>
  <div class="supporters-grid">
    <a-divider class="divider" />
    <div class="supporter" v-for="supporter in supporters">
      <h3>{{ supporter.name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.supporters-grid {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  justify-items: center;
}

.supporter {
  display: flex;
}

.supporter > h3 {
  margin: 0;
}

.divider {
  grid-column: span 2;
  margin: 1rem;
}
</style>
