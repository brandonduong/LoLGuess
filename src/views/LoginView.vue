<script setup lang="ts">
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import { RouterView, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";

const auth = useAuthenticator();
const router = useRouter();

const formFields = {
  signUp: {
    preferred_username: {
      order: 1,
      label: "Display Name",
      placeholder: "Enter your nonunique display name",
    },
    username: {
      order: 2,
      label: "Username",
      placeholder: "Enter your unique login username",
    },
    email: {
      order: 3,
      label: "Email",
      placeholder: "Enter your Email",
    },
  },
};
const signUpAttributes = ["preferred_username"];

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
  <div class="login">
    <div>
      <h1 class="logo">LoLGuess</h1>
      <h4 class="subtitle">
        Login or register to track your guess history, overall stats, and to
        show up on the leaderboard!
      </h4>
      <hr class="divider" />
    </div>
    <div
      :class="auth.authStatus === 'authenticated' ? 'peng' : 'authenticator'"
    >
      <Authenticator
        :formFields="formFields"
        :signUpAttributes="signUpAttributes"
      >
        <template v-if="auth.authStatus === 'configuring'">
          <button @click="auth.signOut">Loading...</button>
        </template>
      </Authenticator>
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  color: hsl(51, 100%, 50%);
  font-size: 6.5rem;
  line-height: 6.5rem;
  text-shadow: 0 0 black;
  margin: 0 0 1rem 0;
  text-align: center;
}
.authenticator {
  margin: auto;
}

.login {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  background: white;
  border: 1px solid lightslategray;
  border-radius: 0.25rem;
  overflow-x: auto;
  gap: 1rem;
  align-items: center;
}

.subtitle {
  text-align: center;
}

@media only screen and (max-width: 720px) {
  .logo {
    font-size: 4rem;
  }
}

.divider {
  margin-left: 1.25rem;
}
.peng {
  background-image: url("/peng.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.link {
  font-weight: bold;
  text-decoration: underline;
  color: var(--theme-love);
}
</style>
