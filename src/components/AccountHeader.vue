<script setup lang="ts">
import { useAuthenticator } from "@aws-amplify/ui-vue";
const auth = useAuthenticator();
</script>

<template>
  <div class="account-header">
    <div class="account-header-contents">
      <RouterLink to="/" class="title">LoLGuess</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <h1>
        {{
          auth.user.username.charAt(0).toUpperCase() +
          auth.user.username.slice(1)
        }}<button @click="auth.signOut">Sign Out</button>
      </h1>
    </div>
  </div>
</template>

<style scoped>
#app
  > div.account-header
  > div
  > a.router-link-active.router-link-exact-active.title {
  text-decoration: none;
}

.account-header-contents > .title {
  color: hsl(51, 100%, 50%);
}
.account-header {
  display: flex;
  position: fixed;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  background-color: lightslategray;
}

.account-header-contents {
  width: 1280px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
}

.account-header-contents > a {
  display: block;
  font-size: 2em;
  text-decoration: none;
  color: var(--color-text);
  transition: 0.4s;
}

.account-header-contents > a:hover {
  color: hsl(51, 100%, 50%);
}

.account-header-contents > a.router-link-exact-active {
  text-decoration: underline;
}
</style>
