<script setup lang="ts">
import { useRouter } from "vue-router";
import { calculateScore } from "@/common/helper";
import { ArrowRightOutlined } from "@ant-design/icons-vue";
import HomeButton from "../Home/HomeButton.vue";
import RankIcon from "../Game/RankIcon.vue";
import type { DailyGuess } from "@/common/interfaces";
import { ALL, HIGH, LOW } from "@/common/constants";

defineProps<{
  guessedBefore: (date: string, category: string) => DailyGuess | null;
  option: string;
}>();

const nowToronto = new Date(
  new Date().toLocaleString("en-US", {
    timeZone: "America/Toronto",
  })
);
const today = new Date(
  nowToronto.getUTCFullYear(),
  nowToronto.getUTCMonth(),
  nowToronto.getUTCDate()
);

function getDailyDates(start: Date, end: Date) {
  const dailies = [];
  let date = new Date(
    end.getUTCFullYear(),
    end.getUTCMonth(),
    end.getUTCDate()
  );
  while (date >= start && date <= end) {
    dailies.push(date.toISOString().split("T")[0]);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  }
  return dailies;
}

const router = useRouter();
const sets = {
  SET11: { start: new Date("06/10/2024"), end: today },
  // SET10: { start: new Date("06/05/2024"), end: new Date("06/09/2024") },
};
</script>

<template>
  <div v-for="[key, value] in Object.entries(sets)">
    <h5 style="margin-bottom: 0; margin-top: 1rem">{{ key }}</h5>
    <div class="daily-grid">
      <HomeButton
        v-for="(d, ind) in getDailyDates(value.start, value.end)"
        :onClick="() => router.push(`/daily/${d}/${option}`)"
        :type="ind === 0 ? 'tertiary' : 'secondary'"
      >
        <div style="flex: 1; height: 100%">
          <h5>{{ d }}</h5>
          <div v-for="prev in [guessedBefore(d, option)]">
            <div v-if="prev">
              <p style="margin: 0">
                <span
                  v-for="(place, ind) in prev.placements.map((place) =>
                    parseInt(place)
                  )"
                >
                  <span>{{ place }}</span>
                  <span v-if="ind != 7">, </span>
                </span>
              </p>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <RankIcon :rank="prev.rank" width="2.5rem" height="2.5rem" />
                <p style="margin: 0"><arrow-right-outlined /></p>
                <RankIcon
                  :rank="prev.verifiedRank"
                  width="2.5rem"
                  height="2.5rem"
                />
              </div>

              <p style="margin: 0" class="number">
                {{
                  calculateScore(
                    prev.placements,
                    prev.rank,
                    prev.verifiedRank,
                    option === "all" ? ALL : option === "high" ? HIGH : LOW
                  )[2]
                }}
                %
              </p>
            </div>
            <div v-else>
              <p style="margin: 0">---</p>
            </div>
          </div>
        </div>
      </HomeButton>
    </div>
  </div>
</template>

<style scoped>
.daily-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(165px, 1fr));
  padding: 1rem;
  gap: 1rem;
}
</style>
