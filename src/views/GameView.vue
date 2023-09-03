<script setup lang="ts">
import GameSettings from "../components/Game/GameSettings.vue";

function adsenseAddLoad() {
  let inlineScript = document.createElement("script");
  inlineScript.type = "text/javascript";
  inlineScript.text = "(adsbygoogle = window.adsbygoogle || []).push({});";
  document.getElementsByTagName("body")[0].appendChild(inlineScript);
}
adsenseAddLoad();
</script>

<template>
  <div class="main">
    <GameSettings />
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

<style scoped>
.main {
  grid-column: span 2;
}
</style>
