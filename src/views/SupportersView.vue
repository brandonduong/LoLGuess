<script setup lang="ts">
import Supporters from "../components/Supporter/Supporters.vue";
function adsenseAddLoad() {
  let inlineScript = document.createElement("script");
  inlineScript.type = "text/javascript";
  inlineScript.text = "(adsbygoogle = window.adsbygoogle || []).push({});";
  document.getElementsByTagName("body")[0].appendChild(inlineScript);
}
adsenseAddLoad();
</script>

<template>
  <div class="supporters">
    <h2>Supporters</h2>
    <div class="supporters-exp">
      <h3>
        If you mistakingly supported me on
        <a class="ko-fi" href="https://ko-fi.com/brandonduong" target="_blank"
          >Ko-fi</a
        >, no matter the amount, I will put your name/username, profile, links,
        and message here!
        <br />
        (Please include your unique login username)
        <br />
      </h3>
      <h4>
        Hosting this website is not cheap and I would genuinely love to continue
        working on this project further!

        <br />I have many more ideas that would make everything even more fun,
        therefore any amount is greatly appreciated.
        <br />
        Thanks!
      </h4>
    </div>
    <Supporters />
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
  </div>
</template>

<style scoped>
.supporters {
  grid-column: span 2;
  border: solid 1px lightslategray;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.ko-fi {
  font-weight: bold;
  text-decoration: underline;
  color: var(--theme-love);
}

.supporters-exp > h3 {
  margin-bottom: 0.5em;
}

.supporters-exp {
  display: grid;
}
</style>
