<script setup lang="ts"></script>

<template>
  <div class="custom-card">
    <slot />
  </div>
</template>
<style scoped>
.custom-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border: solid 4px var(--color-gold);
  padding: 1rem;
  text-align: center;
  background: linear-gradient(#202021, #0c0d12);
}
</style>
