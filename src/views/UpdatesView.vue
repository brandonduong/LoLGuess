<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const updates = [
  {
    version: "1.1 and beyond",
    title: "Future Work",
    items: [
      "Dark mode for ui",
      "Daily mode",
      "More unique modes in my head but don't want people to rat",
    ],
    date: "---",
  },
  {
    version: "1.0.3",
    title: "Fixed register bug",
    items: ["Increased limit for emailing code when registering new account"],
    date: "12-20-2023",
  },
  {
    version: "1.0.2",
    title: "UI/UX improvements for both mobile and desktop",
    items: [
      "Clearer rows for leaderboard",
      "Home page with routes",
      "Separated authentication from home page",
      "Renamed 'play' to 'freeplay' in preparation for daily mode",
      "Responsive design for home page, freeplay, login, and profile",
      "Added patch notes to communicate new changes and future work",
    ],
    date: "12-15-2023",
  },
  {
    version: "1.0.1",
    title: "Quick fix to not require authentication/email",
    items: ["Added 'Continue as guest' option"],
    date: "12-01-2023",
  },
  {
    version: "1.0",
    title: "Released to the public",
    items: [
      "Authentication",
      "Guess stats",
      "Guess history",
      "Leaderboard",
      "Play mode",
      "Replay mode",
      "Supporter section",
    ],
    date: "12-01-2023",
  },
];
</script>

<template>
  <div class="updates">
    <h2 style="margin: 0">Updates</h2>
    <h4>
      Support future work and updates on
      <a class="ko-fi" href="https://ko-fi.com/brandonduong" target="_blank"
        >Ko-fi</a
      >!

      <h5>
        Or read our MANY great testimonials on the
        <a class="ko-fi" @click="() => router.push('/supporters')"
          >Supporters</a
        >
        page!
      </h5>
    </h4>
    <div class="update" v-for="update in updates">
      <h3 style="font-weight: bold">{{ update.title }}</h3>
      <h6>{{ update.version }}</h6>

      <h4 v-for="item in update.items">
        {{ item }}
      </h4>

      <h6>{{ update.date }}</h6>
    </div>
  </div>
</template>

<style scoped>
.updates {
  border: solid 1px lightslategray;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.update {
  border: solid 1px lightslategray;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  width: 100%;
}

.ko-fi {
  font-weight: bold;
  text-decoration: underline;
  color: var(--theme-love);
}
</style>
