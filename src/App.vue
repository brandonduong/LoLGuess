<script setup lang="ts">
import { RouterView } from "vue-router";
import AccountHeader from "./components/AccountHeader.vue";
import { ref, watchEffect } from "vue";
import router from "@/router";
import { useAuthenticator } from "@aws-amplify/ui-vue";

const auth = useAuthenticator();

const oldAuthStatus = ref<string>(auth.authStatus);

watchEffect(() => {
  // Reroute to play if just logged in
  if (
    oldAuthStatus.value === "unauthenticated" &&
    auth.authStatus === "authenticated"
  ) {
    router.push("/play");
  }
  oldAuthStatus.value = auth.authStatus;
});
</script>

<template>
  <AccountHeader />
  <RouterView />
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
</style>
