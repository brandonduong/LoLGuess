<script setup lang="ts">
import Supporters from "../components/Supporter/Supporters.vue";
</script>

<template>
  <div class="supporters">
    <h2>Supporters</h2>
    <h3>
      If you mistakingly supported me on
      <a href="https://ko-fi.com/brandonduong" target="_blank">Ko-fi</a>, no
      matter the amount, I will put your name and message here!
    </h3>
    <Supporters />
  </div>
</template>

<style scoped>
.supporters {
  grid-column: span 2;
  border: solid 1px lightslategray;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: white;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
