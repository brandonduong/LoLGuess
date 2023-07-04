<script setup lang="ts">
import Supporters from "../components/Supporter/Supporters.vue";
</script>

<template>
  <div class="supporters">
    <h2>Supporters</h2>
    <div class="supporters-exp">
      <h3>
        If you mistakingly supported me on
        <a class="ko-fi" href="https://ko-fi.com/brandonduong" target="_blank"
          >Ko-fi</a
        >, no matter the amount, I will put your name/username, profile, and
        message here!
        <br />
        (Please include your unique login username)
        <br />
      </h3>
      <h4>
        Hosting this website is not cheap and I would genuinely love to continue
        working on this project further!

        <br />I have many more ideas that would make everything even more fun,
        therefore any amount is greatly appreciated.
        <br />
        Thanks!
      </h4>
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.ko-fi {
  font-weight: bold;
  text-decoration: underline;
  color: var(--theme-love);
}

.supporters-exp > h3 {
  margin-bottom: 0.5em;
}

.supporters-exp {
  display: grid;
}
</style>
