<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import AccountHeader from "./components/AccountHeader.vue";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import "ant-design-vue/dist/antd.css";
const auth = useAuthenticator();
</script>

<template>
  <img
    alt="Vue logo"
    class="logo"
    src="@/assets/logo.svg"
    width="125"
    height="125"
    v-if="auth.authStatus !== 'authenticated'"
  />
  <Authenticator>
    <template v-if="auth.authStatus === 'configuring'">
      <button @click="auth.signOut">Loading...</button>
    </template>

    <template v-if="auth.authStatus === 'authenticated'">
      <AccountHeader />
      <RouterView />
    </template>
  </Authenticator>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
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
