<script setup lang="ts">
import { useRouter } from "vue-router";
import CustomHR from "../components/Home/CustomHR.vue";
import HomeButton from "@/components/Home/HomeButton.vue";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import {
  HeartOutlined,
  MenuOutlined,
  UserOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
  HistoryOutlined,
  CoffeeOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import IconButton from "@/components/Home/IconButton.vue";
import { Auth } from "aws-amplify";

const router = useRouter();
const auth = useAuthenticator();
function signout() {
  Auth.signOut();
  router.push("/login");
}
</script>

<template>
  <section class="top-page">
    <div class="home">
      <div class="description">
        <h5 class="gold subtitle">LOLGUESS</h5>
        <h2>TEAMFIGHT TACTICS PRACTICE TOOL</h2>
        <p>
          Guess the placements and rank of a random match to test your knowledge
          on end-game team composition power.
        </p>
        <CustomHR />
      </div>
    </div>
    <div class="background-vid">
      <video
        src="/background-magic.mp4"
        autoplay
        loop
        muted
        playsinline
        style="
          object-fit: cover;
          object-position: center center;
          height: 100%;
          width: 100%;
          transform-origin: center center;
        "
      ></video>
    </div>
  </section>
  <section class="bot-page">
    <div class="home-buttons-grid">
      <HomeButton
        title="FREEPLAY"
        :onClick="() => router.push('/play')"
        description="Guess on a random lobby"
        ><template #icon
          ><question-circle-outlined
            style="color: rgb(240, 230, 210); font-size: 2.5rem" /></template
      ></HomeButton>
      <HomeButton
        title="DAILY"
        :onClick="() => router.push('/daily')"
        description="Guess on today's lobby"
        ><template #icon
          ><calendar-outlined
            style="color: rgb(240, 230, 210); font-size: 2.5rem" /></template
      ></HomeButton>
      <HomeButton
        title="LEADERBOARD"
        :onClick="() => router.push('/leaderboard')"
        description="Compete against others"
        ><template #icon
          ><menu-outlined
            style="color: rgb(240, 230, 210); font-size: 2.5rem" /></template
      ></HomeButton>

      <HomeButton
        v-if="auth.authStatus !== 'authenticated'"
        title="LOGIN"
        :onClick="() => router.push('/login')"
        description="Store stats and history"
        ><template #icon
          ><user-outlined
            style="color: rgb(240, 230, 210); font-size: 2.5rem" /></template
      ></HomeButton>
      <HomeButton
        v-else
        title="PROFILE"
        :onClick="() => router.push(`/profile/${auth.user.attributes.sub}`)"
        description="View stats and history"
        ><template #icon
          ><user-outlined
            style="color: rgb(240, 230, 210); font-size: 2.5rem" /></template
      ></HomeButton>
      <HomeButton
        title="SUPPORTERS"
        :onClick="() => router.push('/supporters')"
        description="Help keep everything running"
        ><template #icon
          ><heart-outlined
            style="color: rgb(240, 230, 210); font-size: 2.5rem" /></template
      ></HomeButton>
      <HomeButton
        title="UPDATES"
        :onClick="() => router.push('/updates')"
        description="New and future additions"
        ><template #icon
          ><history-outlined
            style="color: rgb(240, 230, 210); font-size: 2.5rem" /></template
      ></HomeButton>
    </div>
  </section>

  <section class="footer">
    <IconButton href="https://ko-fi.com/brandonduong"
      ><coffee-outlined style="color: var(--color-gold); font-size: 2.5rem"
    /></IconButton>
    <IconButton :onClick="signout" v-if="auth.authStatus === 'authenticated'"
      ><logout-outlined style="color: var(--color-gold); font-size: 2.5rem"
    /></IconButton>
  </section>
</template>

<style scoped>
.home {
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 5rem 0;
  background-image: radial-gradient(
    rgba(2, 11, 16, 0),
    rgba(2, 11, 16, 0) 50%,
    rgb(1, 10, 19),
    rgb(1, 10, 19) 75%
  );
}

.subtitle {
  display: inline-block;
}

.subtitle::before {
  right: 100%;
  background-image: url("/decorator-left.png");
}

.subtitle::after {
  left: 100%;
  background-image: url("/decorator-right.png");
}

.subtitle::before,
.subtitle::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.75em;
  height: 100%;
  margin: 0px 0.375em;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}

.description {
  padding: 0 2.25rem;
  flex: 0 0 50%;
}

.description > p {
  margin-bottom: 0.75rem;
}

.background-vid {
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0rem;
  left: 0rem;
}

.home-buttons-grid {
  display: grid;
  gap: 1rem;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}
</style>
