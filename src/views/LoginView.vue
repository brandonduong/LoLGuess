<script setup lang="ts">
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";

const auth = useAuthenticator();

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
</script>

<template>
  <div class="login">
    <div class="intro">
      <h1 class="logo">LoLGuess</h1>
      <hr class="divider" />
      <h4 class="description">
        LoLGuess is a TFT practice tool designed for low and high elo players to
        test their knowledge on end-game team composition power.
      </h4>
      <ul class="unordered">
        <li>
          <h3 class="unordered-section">Train Your Intuition</h3>
          <span>
            Study general unit, item, and team strength to faster assess the
            power of your opponents and the tempo of your lobbies
          </span>
        </li>
        <li>
          <h3 class="unordered-section">Better Your Flex Play</h3>
          <span>
            Understand what makes a comp strong, and apply this knowledge to
            more effectively play what you hit in creative, off-meta teams
          </span>
        </li>
        <li>
          <h3 class="unordered-section">Learn to Maximize your Highrolls</h3>
          <span>
            Study what comps win out over others to better your ability to play
            for first when highrolling
          </span>
        </li>
        <li>
          <h3 class="unordered-section">Experience Different Environments</h3>
          <span>
            Quickly scout how different regions and ranks play the game to stay
            on top of the meta
          </span>
        </li>
      </ul>
    </div>
    <div class="authenticator">
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

.description {
  margin-left: 1.5rem;
}

.authenticator {
  margin: auto;
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
  align-items: start;
}

.unordered {
  color: rgba(0, 0, 0, 0.85);
  padding-bottom: 3rem;
}

.unordered-section {
  text-decoration: underline;
}

.divider {
  margin-left: 1.25rem;
}

.intro {
  padding: 0 2rem;
}
</style>
