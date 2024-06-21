<script setup lang="ts">
import { useAuthenticator } from "@aws-amplify/ui-vue";
import AccountHeaderLink from "./AccountHeaderLink.vue";

const auth = useAuthenticator();
</script>

<template>
  <div class="account-header">
    <div class="account-header-contents">
      <div class="account-header-left">
        <RouterLink to="/" class="title"
          ><div class="logo">
            <div class="peng"></div>
            <h2 style="margin: 0" class="gold">LOLGUESS</h2>
          </div>
        </RouterLink>
        <div class="account-header-links">
          <AccountHeaderLink route="" text="HOME" />
          <AccountHeaderLink route="play" text="FREEPLAY" />
          <AccountHeaderLink
            route="daily"
            text="DAILY"
            style="
              background-image: linear-gradient(
                var(--color-background),
                80%,
                var(--color-gold)
              );
            "
          />
          <AccountHeaderLink route="leaderboard" text="LEADERBOARD" />
          <AccountHeaderLink route="supporters" text="SUPPORTERS" />
          <AccountHeaderLink route="updates" text="UPDATES" />
        </div>
      </div>
      <AccountHeaderLink
        v-if="auth.authStatus !== 'authenticated'"
        route="login"
        text="LOGIN"
      />
      <AccountHeaderLink
        v-else
        :route="`profile/${auth.user.attributes.sub}`"
        :text="
          auth.user.signInUserSession.idToken.payload.preferred_username.substring(
            0,
            20
          )
        "
      />
    </div>
  </div>
</template>

<style scoped>
.account-header-left {
  display: flex;
  gap: 0.25rem;
}

.account-header {
  z-index: 1;
  border-top: 2px solid var(--color-border);
  border-bottom: 2px solid var(--color-border);
}

.account-header-contents {
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  margin: auto;
}

.account-header-links {
  display: flex;
}

@media only screen and (max-width: 1024px) {
  .account-header-contents {
    padding: 0 0.25rem;
  }
  .dropdown-button {
    display: flex;
    align-items: center;
  }
  .account-header-links {
    display: none;
  }
}

.account-header-contents > a:hover {
  color: var(--color-highlight-gold);
}

.peng {
  background-image: url("/peng.avif");
  background-repeat: no-repeat;
  background-size: cover;
  width: 36px;
  height: 36px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
