<script setup lang="ts">
import Leaderboard from "../components/Leaderboard/Leaderboard.vue";

function adsenseAddLoad() {
  let inlineScript = document.createElement("script");
  inlineScript.type = "text/javascript";
  inlineScript.text = "(adsbygoogle = window.adsbygoogle || []).push({});";
  document.getElementsByTagName("body")[0].appendChild(inlineScript);
}
adsenseAddLoad();
</script>

<template>
  <div class="leaderboard">
    <Leaderboard />
  </div>
  <ins
    class="adsbygoogle"
    style="display: block"
    data-ad-client="ca-pub-9244113126678862"
    data-ad-slot="8987454992"
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>

  <ins
    class="adsbygoogle"
    style="display: block"
    data-ad-client="ca-pub-9244113126678862"
    data-ad-slot="2307616136"
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>
</template>

<style>
.leaderboard {
  grid-column: span 2;
  border: solid 1px lightslategray;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: white;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
}
</style>
