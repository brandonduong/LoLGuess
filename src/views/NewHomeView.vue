<script setup lang="ts">
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { useRouter } from "vue-router";
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
</template>

<style scoped>
h1 {
  line-height: 42pt;
  letter-spacing: 0.05em;
  font-size: 40pt;
  color: rgb(240, 230, 210);
  font-family: "beaufort_for_lolbold";
  font-weight: 700;
  font-style: normal;
  margin-bottom: 1.25rem;
}

h2 {
  line-height: 32pt;
  letter-spacing: 0.05em;
  font-size: 28pt;
  color: rgb(240, 230, 210);
  font-family: "beaufort_for_lolbold";
  font-weight: 700;
  font-style: normal;
}

h3 {
  line-height: 28pt;
  letter-spacing: 0.05em;
  font-size: 23pt;
  color: rgb(240, 230, 210);
  font-family: "beaufort_for_lolbold";
  font-weight: 700;
  font-style: normal;
  margin-bottom: 0.75rem;
}

h4 {
  line-height: 22pt;
  letter-spacing: 0.05em;
  font-size: 18pt;
  color: rgb(240, 230, 210);
  font-family: "beaufort_for_lolbold";
  font-weight: 700;
  font-style: normal;
}

h5 {
  line-height: 18pt;
  letter-spacing: 0.075em;
  font-size: 14pt;
  color: rgb(240, 230, 210);
  font-family: "beaufort_for_lolbold";
  font-weight: 700;
  font-style: normal;
  margin-bottom: 0.75rem;
}

p {
  font-family: "spiegelregular";
  font-weight: 400;
  font-style: normal;
  font-size: 1rem;
  line-height: 1.24;
  letter-spacing: 0.01em;
  color: rgb(160, 155, 140);
}

.beau-reg {
  line-height: 62pt;
  letter-spacing: 0.025em;
  font-size: 57pt;
  color: rgb(240, 230, 210);
  font-family: "beaufort_for_lolmedium";
  font-weight: 500;
}

.gold {
  color: rgb(200, 155, 60);
}

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

.background-vid {
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0rem;
  left: 0rem;
}

.top-page {
  border-bottom: 1px solid var(--color-border);
}
</style>
