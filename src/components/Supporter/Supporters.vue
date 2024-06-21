<script setup lang="ts">
import CustomCard from "@/components/CustomCard.vue";
const supporters = [
  {
    name: "Ninjakat2000",
    msg: "Hey there cutie ;)",
    value: "36",
    id: "321b054c-7caf-40d9-ae32-0f1b3816d4fa",
    date: "05-23-2024",
  },
  {
    name: "tikutikutikuwa",
    msg: "Thanks for your incredible job!",
    value: "3",
    id: "",
    date: "12-23-2023",
  },
  {
    name: "THTupy",
    msg: "Thanks for all the support!",
    value: "1",
    id: "3763a9f9-3f45-4346-b131-68ade2f98515",
    date: "06-22-2023",
  },
];
</script>

<template>
  <div class="supporters-grid">
    <CustomCard class="supporter" v-for="supporter in supporters">
      <RouterLink :to="supporter.id ? `/profile/${supporter.id}` : ''">
        <h5 class="supporter-name">
          {{ supporter.name }}
        </h5>
      </RouterLink>
      <p class="number">${{ supporter.value }}</p>
      <p v-if="supporter.msg">
        {{ supporter.msg }}
      </p>
      <h5>{{ supporter.date }}</h5>
    </CustomCard>
  </div>
</template>

<style scoped>
.supporters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 1rem;
  row-gap: 1rem;
}

.supporter-name,
.supporter > p,
.supporter > h5 {
  margin: 0;
}

.supporter-name {
  color: var(--color-gold);
}

.supporter-name:hover {
  color: var(--color-highlight-gold);
}
</style>
