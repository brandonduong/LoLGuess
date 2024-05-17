<script setup lang="ts">
import { RouterView } from "vue-router";
import AccountHeader from "./components/Home/AccountHeader.vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import { ref } from "vue";
</script>

<template>
  <AccountHeader />
  <div>
    <div class="app-body">
      <RouterView />
    </div>
  </div>
  <Authenticator style="display: none" />
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
  color: hsl(51, 100%, 50%);
  font-size: 5rem;
  text-shadow: 0 0 black;
}

nav {
  width: 100%;
  text-align: center;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.app-body {
  max-width: 1280px;
  padding: 0.5rem 2rem;
  margin: auto;
}

@media only screen and (max-width: 720px) {
  .app-body {
    max-width: 1280px;
    padding: 0.5rem 0;
    margin: auto;
  }
}
</style>
