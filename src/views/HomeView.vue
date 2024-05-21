<script setup lang="ts">
import { useRouter } from "vue-router";
import CustomHR from "../components/Home/CustomHR.vue";
import HomeButton from "@/components/Home/HomeButton.vue";

const router = useRouter();
</script>

<template>
  <section class="top-page">
    <div class="home">
      <div class="description">
        <h5 class="gold subtitle">LOLGUESS</h5>
        <h2>TEAMFIGHT TACTICS PRACTICE TOOL</h2>
        <p>
          Test your TFT knowledge about end-game team compositions by guessing
          the placements and rank of a random match
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
    <div class="home-buttons">
      <div class="home-buttons-grid">
        <HomeButton
          title="Freeplay"
          :onClick="() => router.push('/play')"
          description="Guess rank and placements of a random lobby"
        />
        <HomeButton
          title="Daily"
          :onClick="() => router.push('/daily')"
          description="Guess rank and placements of a random lobby"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
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

.home-buttons {
  display: flex;
  justify-content: center;
}

.home-buttons-grid {
  display: flex;
  gap: 1rem;
  flex: 0 0 50%;
}

@media only screen and (max-width: 1024px) {
  .home-buttons-grid {
    flex-direction: column;
  }
}
</style>
