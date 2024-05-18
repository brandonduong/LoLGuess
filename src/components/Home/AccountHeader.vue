<script setup lang="ts">
import { useAuthenticator } from "@aws-amplify/ui-vue";
import {
  CoffeeOutlined,
  HeartOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { watchEffect } from "vue";
import { Auth } from "aws-amplify";
import AccountHeaderLink from "./AccountHeaderLink.vue";

const auth = useAuthenticator();
const route = useRoute();
const router = useRouter();

watchEffect(() => {
  //console.log(route.fullPath);
});
function getActive(link: string) {
  return route.fullPath.includes(link)
    ? `dropdown-link active`
    : `dropdown-link`;
}
function signout() {
  Auth.signOut();
  router.push("/login");
}
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
          <AccountHeaderLink route="daily" text="DAILY" />
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

.dropdown-button {
  display: none;
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
  background-image: url("/peng.png");
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

.dropdown-button {
  transition: 0.4s;
}

.dropdown-button:hover,
.dropdown-button:focus {
  color: hsl(51, 100%, 50%) !important;
}

.active {
  color: lightslategray !important;
}

.signout,
.kofi {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.kofi {
  border: var(--theme-love);
  transition: 0.3s;
}
.kofi-div :hover {
  background-color: var(--theme-love-highlight);
}

.signout-div,
.kofi-div {
  padding: 0 0.25rem;
}

.username {
  margin: 0;
  padding: 0 0.25rem;
  font-weight: bold;
}

.dropdown-link {
  color: black;
  display: inline-block;
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
  transition: 0.4s;
  padding: 0 0.25rem;
}

.dropdown-link:hover {
  background-color: rgb(228, 228, 228);
}

.divider {
  margin: 0.2rem 0;
}

.dropdown-content {
  margin: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.kofi {
  background-color: #cc93ce;
}
</style>
