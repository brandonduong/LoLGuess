<script setup lang="ts">
const supporters = [
  {
    name: "TFTupy",
    msg: "Wow this is the best TFT website ever and probably costs a lot of money to host!",
    value: "-20,000 from student debt",
    id: "1b587836-a7be-4e31-a4f3-3c88daf21f1e",
  },
  {
    name: "Ninjakat2000",
    msg: "The message from the person on the left is probably speaking some true facts!",
    value: "1",
    id: "9d49e34f-1470-4b2d-ba2b-143e327d88ba",
  },
];
</script>

<template>
  <div class="supporters-grid">
    <a-divider class="divider" />
    <div class="supporter" v-for="supporter in supporters">
      <a-popover>
        <template #content>
          <div class="supporter-info">
            <h3>
              <b> {{ supporter.name }}: ${{ supporter.value }} </b>
            </h3>
            <h4>
              {{ supporter.msg }}
            </h4>
          </div>
        </template>
        <RouterLink :to="`/profile/${supporter.id}`">
          <h4>
            {{ supporter.name }}
          </h4>
        </RouterLink>
      </a-popover>
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

.supporter-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 50vw;
}
</style>
