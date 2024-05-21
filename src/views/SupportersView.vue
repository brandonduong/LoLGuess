<script setup lang="ts">
import CustomHR from "@/components/Home/CustomHR.vue";
import Supporters from "../components/Supporter/Supporters.vue";
import IconButton from "@/components/Home/IconButton.vue";
import { CoffeeOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <div class="supporters">
    <div style="display: flex; justify-content: center">
      <div class="supporters-container">
        <h3 class="gold">SUPPORTERS</h3>
        <p>
          If you enjoy LoLGuess in general or have even supported on
          <a class="ko-fi" href="https://ko-fi.com/brandonduong" target="_blank"
            >Ko-fi</a
          >, thank you very much! Any support to keep the site up is
          appreciated!
        </p>
        <p>
          If included on ko-fi donations, I will put your name/username,
          profile, links, and message here!
        </p>
        <CustomHR style="margin-bottom: 1rem; rotate: 180deg" />
        <Supporters />
        <CustomHR style="margin: 1rem 0" />
      </div>
    </div>
    <IconButton href="https://ko-fi.com/brandonduong"
      ><coffee-outlined style="color: var(--color-gold); font-size: 2.5rem"
    /></IconButton>
  </div>
</template>

<style scoped>
.supporters {
  text-align: center;
}

.supporters-container {
  flex: 0 0 75%;
}

.ko-fi {
  font-weight: bold;
  text-decoration: underline;
  color: var(--theme-love);
}
</style>
