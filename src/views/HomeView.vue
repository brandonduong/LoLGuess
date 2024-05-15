<script setup lang="ts">
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { useRouter } from "vue-router";
import HomeButton from "../components/Home/HomeButton.vue";

const auth = useAuthenticator();
const router = useRouter();
</script>

<template>
  <div class="login">
    <div class="description">
      <h1 class="logo">LoLGuess</h1>
      <h4>
        LoLGuess is a TFT practice tool designed for low and high elo players to
        test their knowledge on end-game team composition power.
      </h4>
      <h6>
        Play now to highroll in real life and awaken your Teamfight Tactics
        skills forever.
      </h6>
      <hr class="divider" />
    </div>

    <div class="intro">
      <div class="benefits">
        <ul class="unordered">
          <li>
            <h3 class="unordered-section">Train Your Intuition</h3>
            <span>
              Study general unit, item, and team strength to faster assess the
              power of your opponents and the tempo of your lobbies
            </span>
          </li>
          <li>
            <h3 class="unordered-section">Better Your Flex Play</h3>
            <span>
              Understand what makes a comp strong, and apply this knowledge to
              more effectively play what you hit in creative, off-meta teams
            </span>
          </li>
          <li>
            <h3 class="unordered-section">Learn to Maximize your Highrolls</h3>
            <span>
              Study what comps win out over others to better your ability to
              play for first when highrolling
            </span>
          </li>
          <li>
            <h3 class="unordered-section">Experience Different Environments</h3>
            <span>
              Quickly scout how different regions and ranks play the game to
              stay on top of the meta
            </span>
          </li>
        </ul>
      </div>
      <div class="buttons">
        <a-badge-ribbon text="Fixed Set 11!" style="background-color: gray">
          <HomeButton
            title="Freeplay"
            :onClick="() => router.push('/play')"
            description="Guess rank and placements of a random lobby"
          />
        </a-badge-ribbon>

        <HomeButton
          title="Daily"
          :onClick="() => router.push('/daily')"
          description="Guess rank and placements of today's lobby"
          disabled
        />

        <HomeButton
          title="Profile"
          :onClick="() => router.push(`/profile/${auth.user.attributes.sub}`)"
          description="Share freeplay guess stats and guess history"
          v-if="auth.authStatus === 'authenticated'"
        />
        <HomeButton
          title="Login / Register"
          :onClick="() => router.push(`/login`)"
          description="Store freeplay guess stats, guess history, and compete on the leaderboard"
          v-else
        />

        <HomeButton
          title="Leaderboard"
          :onClick="() => router.push(`/leaderboard`)"
          description="Compete against other freeplay guessers"
        />
        <HomeButton
          title="Supporters"
          :onClick="() => router.push(`/supporters`)"
          description="View our MANY great testimonials"
        />
        <HomeButton
          title="Updates"
          :onClick="() => router.push(`/updates`)"
          description="New and future additions"
        />
        <HomeButton
          title="Ko-fi"
          href="https://ko-fi.com/brandonduong"
          description="Help a guy with a lot of student debt"
          class="kofi"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  color: hsl(51, 100%, 50%);
  font-size: 6.5rem;
  line-height: 6.5rem;
  text-shadow: 0 0 black;
  margin: 0 0 1rem 0;
  text-align: center;
}

.description {
  text-align: center;
}

.authenticator {
  margin: auto;
}

.login {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  background: white;
  border: 1px solid lightslategray;
  border-radius: 0.25rem;
  overflow-x: auto;
  gap: 1rem;
}

.unordered {
  color: rgba(0, 0, 0, 0.85);
}

.intro {
  display: flex;
  gap: 1rem;
}

.link {
  font-weight: bold;
  text-decoration: underline;
  color: var(--theme-love);
}

.unordered > li {
  margin: 0.75rem 0;
}

.guest {
  width: 100%;
  background: hsl(51, 100%, 50%);
  margin-top: 1rem;
  color: black;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  flex-basis: 50%;
}

.benefits {
  flex-basis: 50%;
  margin: auto;
}

.kofi {
  grid-column: span 2;
  background-color: #e0ade2;
  border-color: #e0ade2;
}

.kofi:hover {
  grid-column: span 2;
  background-color: #edc7ee;
  border-color: #edc7ee;
}

@media only screen and (max-width: 720px) {
  .login {
    flex-direction: column;
    gap: 1rem;
  }

  .logo {
    font-size: 4rem;
  }

  .unordered {
    padding: 0 0 0 1.5rem;
  }
  .intro {
    flex-direction: column-reverse;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
