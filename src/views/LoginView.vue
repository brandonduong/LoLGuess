<script setup lang="ts">
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import { useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { Auth, I18n } from "aws-amplify";

const auth = useAuthenticator();
const router = useRouter();

function signout() {
  Auth.signOut();
  router.push("/login");
}

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
      placeholder: "Enter your email",
    },
    password: {
      label: "PASSWORD",
      placeholder: "Enter your password",
      order: 4,
    },
    confirm_password: {
      label: "CONFIRM PASSWORD",
      placeholder: "Please confirm your password",
      order: 5,
    },
  },
};
const signUpAttributes = ["preferred_username"];

I18n.putVocabulariesForLanguage("en", {
  "Sign In": "LOGIN", // Tab header
  "Create Account": "REGISTER",
  Username: "USERNAME",
  Password: "PASSWORD",
  "Display Name": "DISPLAY NAME",
  Email: "EMAIL",
  "Confirm Password": "CONFIRM PASSWORD",
  "Sign in": "LOGIN",
  "Confirmation Code": "CONFIRMATION CODE",
  "We Texted You": "EMAIL VERIFICATION CODE",
  "Signing in": "LOGGING IN",
});

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
    <div style="display: flex; justify-content: center">
      <div style="flex: 0 0 50%">
        <h3 class="gold">LOGIN</h3>

        <p class="subtitle">
          Login or register to track your guess history, overall stats, share
          your profile, and to show up on the leaderboard!
        </p>
      </div>
    </div>
    <div class="login-container" v-if="auth.authStatus !== 'authenticated'">
      <div class="login-border">
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
    <div v-else>
      <p>
        Currently logged in as
        <RouterLink :to="`/profile/${auth.user.attributes.sub}`">
          {{
            auth.user.signInUserSession.idToken.payload.preferred_username.substring(
              0,
              20
            )
          }}
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login {
  padding: 1rem;
  text-align: center;
}

.login-border {
  border: solid 4px var(--color-gold);
}

.login-container {
  display: flex;
  justify-content: center;
  text-align: start;
}
</style>
