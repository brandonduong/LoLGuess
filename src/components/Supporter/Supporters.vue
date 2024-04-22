<script setup lang="ts">
import { RedditOutlined, TwitterOutlined } from "@ant-design/icons-vue";

const supporters = [
  {
    name: "THTupy",
    msg: "Wow this is the best TFT website ever and probably costs a lot of money to host! The owner probably has a lot of student debt as well haha :)",
    value: "From student debt, -13,333",
    id: "3763a9f9-3f45-4346-b131-68ade2f98515",
    date: "06-22-2023",
    lolchess: "https://lolchess.gg/profile/na/tupy",
    twitch: "https://www.twitch.tv/thtupy",
    reddit: "https://www.reddit.com/user/TreehouseTupy",
    twitter: "https://twitter.com/THTupy",
  },
  {
    name: "Ninjakat2000",
    msg: "Hey there cutie ;)",
    value: "6",
    id: "321b054c-7caf-40d9-ae32-0f1b3816d4fa",
    date: "06-23-2023",
  },
  {
    name: "tikutikutikuwa",
    msg: "",
    value: "1",
    id: "",
    date: "12-23-2023",
  },
];
</script>

<template>
  <div class="supporters-grid">
    <a-divider class="divider" />
    <div class="supporter" v-for="supporter in supporters">
      <RouterLink :to="`/profile/${supporter.id}`">
        <h3 class="supporter-name">
          {{ supporter.name }}
        </h3>
      </RouterLink>
      <h3>
        <b>{{ supporter.value }} Coffees!</b>
      </h3>
      <h4>
        {{ supporter.msg }}
      </h4>
      <div class="brands">
        <a v-if="supporter.lolchess" :href="supporter.lolchess" target="_blank">
          <img src="/lolchess.png" class="brand" />
        </a>
        <a v-if="supporter.twitch" :href="supporter.twitch" target="_blank">
          <img src="/twitch.svg" class="brand" />
        </a>
        <a v-if="supporter.reddit" :href="supporter.reddit" target="_blank">
          <RedditOutlined class="brand reddit" />
        </a>
        <a v-if="supporter.twitter" :href="supporter.twitter" target="_blank">
          <TwitterOutlined class="brand" />
        </a>
      </div>
      <h5>{{ supporter.date }}</h5>
    </div>
  </div>
</template>

<style scoped>
.supporters-grid {
  display: grid;

  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
}

.supporter {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border: solid 1px lightslategray;
  padding: 1rem;
  border-radius: 0.25rem;
}

.brands {
  display: flex;
  gap: 0.5rem;
}

.brand {
  width: 24px;
  height: 24px;
  font-size: 1.5rem;
}

.reddit {
  color: #ff4500;
}

.supporter-name {
  text-decoration: underline;
}

.supporter > h5 {
  margin: 0;
}

.divider {
  grid-column: span 2;
  margin: 1rem 0;
}
</style>
