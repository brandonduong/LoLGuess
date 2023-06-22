<script setup lang="ts">
import { useAuthenticator } from "@aws-amplify/ui-vue";
import {
  CoffeeOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
const auth = useAuthenticator();
</script>

<template>
  <div class="account-header">
    <div class="account-header-contents">
      <RouterLink to="/" class="title">LoLGuess</RouterLink>
      <a-popover placement="bottomRight" trigger="click">
        <template #content>
          <div class="dropdown-content">
            <h3 class="username">
              {{
                auth.user.username.charAt(0).toUpperCase() +
                auth.user.username.slice(1)
              }}
            </h3>
            <a-divider class="divider" />
            <RouterLink to="/" class="dropdown-link">Play</RouterLink>
            <RouterLink
              :to="`/profile/${auth.user.attributes.sub}`"
              class="dropdown-link"
              >Profile</RouterLink
            >
            <RouterLink to="/leaderboard" class="dropdown-link"
              >Leaderboard</RouterLink
            >
            <RouterLink to="/supporters" class="dropdown-link"
              >Supporters</RouterLink
            >
            <a-divider class="divider" />
            <div class="kofi-div">
              <a-button
                type="primary"
                class="kofi"
                href="https://ko-fi.com/brandonduong"
                target="_blank"
                ><HeartOutlined
                  style="font-size: 1.25rem; color: white" /><CoffeeOutlined
                  style="font-size: 1.25rem; color: white" /><HeartOutlined
                  style="font-size: 1.25rem; color: white" />
                <CoffeeOutlined
                  style="font-size: 1.25rem; color: white" /><HeartOutlined
                  style="font-size: 1.25rem; color: white"
              /></a-button>
            </div>
            <div class="signout-div">
              <a-button type="primary" class="signout" @click="auth.signOut"
                >Sign Out</a-button
              >
            </div>
          </div>
        </template>

        <UserOutlined class="user" style="font-size: 2rem; color: white" />
      </a-popover>
    </div>
  </div>
</template>

<style scoped>
.account {
  margin: 0;
}

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
  z-index: 1;
}

.account-header-contents {
  width: 1280px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  align-items: center;
}

.account-header-contents > a {
  display: block;
  font-size: 2em;
  text-decoration: none;
  color: white;
  transition: 0.4s;
}

.account-header-contents > a:hover {
  color: hsl(51, 100%, 50%);
}

.account-header-contents > a.router-link-exact-active {
  text-decoration: underline;
}

.user {
  transition: 0.4s;
}

.user:hover,
.user:focus {
  color: hsl(51, 100%, 50%) !important;
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
  border: #cc93ce;
  transition: 0.3s;
}
.kofi-div :hover {
  background-color: #d2b0d3;
}

.signout-div,
.kofi-div {
  padding: 0 0.25rem;
}

.username {
  margin: 0;
  padding: 0 0.25rem;
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
  margin: -0.25rem -0.75rem;
  display: flex;
  flex-direction: column;
}

.kofi {
  background-color: #cc93ce;
}
</style>
