<script setup lang="ts">
import CustomCard from "@/components/CustomCard.vue";
const updates = [
  {
    items: [
      "Better leaderboard categories",
      "After guessing, reveal what round players died at",
      "After guessing, reveal usernames?",
      "More game modes",
    ],
    date: "Future Work",
  },
  {
    items: [
      "UI overhaul to not flashbang people's eyes and better user experience for PC and mobile",
      "Daily mode with stats",
      "More stats and graphs for logged in users",
      "Fixed old replays",
      "More accurrate champion icons used",
      "Small details and bugs",
    ],
    date: "05-28-2024",
  },
  {
    items: [
      "Updated for Set 11",
      "Less chance for error when fetching or displaying match",
      "Optimized freeplay for logged in users (less time waiting when submitting)",
      "Small details and bugs",
    ],
    date: "04-24-2023",
  },
  {
    items: [
      "Optimized fetching of static tft data",
      "Made arrow icons consistent in game table",
      "Removed max score from leaderboard",
      "Added kofi to home page",
      "Added peng to logo",
      "Fixed pagination in profile",
    ],
    date: "12-20-2023",
  },
  {
    items: ["Increased limit for emailing code when registering new account"],
    date: "12-20-2023",
  },
  {
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
    items: ["Added 'Continue as guest' option"],
    date: "12-01-2023",
  },
  {
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
    <div style="display: flex; justify-content: center">
      <div>
        <h3 class="gold">UPDATES</h3>
        <p>
          Support future work and updates on
          <a class="ko-fi" href="https://ko-fi.com/brandonduong" target="_blank"
            >Ko-fi</a
          >!
        </p>
        <div style="display: flex; flex-direction: column; gap: 1rem">
          <CustomCard class="update" v-for="update in updates">
            <h5>{{ update.date }}</h5>
            <p v-for="item in update.items">
              {{ item }}
            </p>
          </CustomCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.updates {
  text-align: center;
  padding: 1rem;
}

.update {
}

.ko-fi {
  font-weight: bold;
  text-decoration: underline;
  color: var(--color-gold);
}
</style>
