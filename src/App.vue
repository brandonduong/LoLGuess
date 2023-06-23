<script setup lang="ts">
import { RouterView } from "vue-router";
import AccountHeader from "./components/AccountHeader.vue";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
const auth = useAuthenticator();

const formFields = {
  signUp: {
    preferred_username: {
      order: 1,
      label: "Display Name",
      placeholder: "Enter your preferred Display Name",
    },
    username: {
      order: 2,
      label: "Username",
      placeholder: "Enter your preferred login Username",
    },
    email: {
      order: 3,
      label: "Email",
      placeholder: "Enter your Email",
    },
  },
};
const signUpAttributes = ["preferred_username"];
</script>

<template>
  <h1 v-if="auth.authStatus !== 'authenticated'" class="logo">LoLGuess</h1>
  <Authenticator :formFields="formFields" :signUpAttributes="signUpAttributes">
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
