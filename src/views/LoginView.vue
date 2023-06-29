<script setup lang="ts">
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
  <div class="login">
    <div class="intro">
      <h1 class="logo">LoLGuess</h1>
      <hr class="divider" />
      <ul class="unordered">
        <li>
          LoLGuess is a TFT practice tool designed for low and high elo players
          to test their knowledge on end-game team composition power.
        </li>
        <br />

        <li>
          Users first choose a set of ranks (Iron, Bronze, Silver, etc.) and a
          set of regions (NA, EUW, etc.).
        </li>
        <br />
        <li>
          LoLGuess pulls a random ranked match from the selected ranks and
          regions.
        </li>
        <br />
        <li>
          Users then must guess every team comps final placement (first, second,
          third, etc.), and the rank.
        </li>
      </ul>
    </div>
    <div>
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
  text-shadow: 0 0 black;
  margin: 0 0 0 1rem;
}

.login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 1px solid lightslategray;
  border-radius: 0.25rem;
  overflow-x: auto;
}

.unordered {
  color: rgba(0, 0, 0, 0.85);
  padding-bottom: 3rem;
}

.divider {
  margin-left: 1.25rem;
}

.intro {
  padding: 0 5rem 0 2rem;
}
</style>
