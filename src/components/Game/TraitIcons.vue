<script lang="ts">
interface StaticData {
  apiName: string;
  icon: string;
  name: string;
}
interface StaticSetData {
  champions: StaticData[];
  traits: StaticData[];
}
interface StaticSetsData {
  9: StaticSetData;
  10: StaticSetData;
  11: StaticSetData;
}

interface APITrait {
  name: string;
  tier_current: number;
  style: number;
  num_units: number;
}

interface TraitStyle {
  path: string;
  style: number;
  title: string;
}
</script>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  traits: APITrait[];
  staticTFTSetsData: StaticSetsData;
}>();

// Get trait icon styles
const traitStyles = ref<TraitStyle[]>([]);
props.traits.forEach((trait) => {
  const setNum = trait.name.split("_")[0].slice(3);
  const traitInfo = props.staticTFTSetsData[
    parseInt(setNum) as keyof StaticSetsData
  ].traits.filter((t) => {
    return t.apiName === `TFT${trait.name.slice(3)}` && trait.tier_current > 0; // Always in format TFT11_...
  })[0];
  console.log(trait, traitInfo);

  // If trait is activated, get image
  if (traitInfo) {
    const pathParts = traitInfo.icon.split("/");
    const path = pathParts[pathParts.length - 1].toLowerCase();
    traitStyles.value.push({
      path: path.slice(0, path.length - 4),
      style: trait.style,
      title: `${trait.num_units} ${traitInfo.name}`,
    });
  }
});

// Sort trait icons by style
traitStyles.value.sort(function (a, b) {
  if (a.style === 0) {
    a.style = 3;
  } else if (b.style === 0) {
    b.style = 3;
  }
  return b.style - a.style;
});
</script>
<template>
  <div class="traits">
    <div v-for="trait in traitStyles" :class="`trait style${trait.style}`">
      <img
        class="trait-icon"
        :src="`https://raw.communitydragon.org/latest/game/assets/ux/traiticons/${trait.path}.png`"
        :alt="trait.path"
        width="16"
        height="16"
        :title="trait.title"
      />
    </div>
  </div>
</template>
<style scoped>
.traits {
  display: flex;
  flex-wrap: wrap;
  min-width: 144px;
  max-width: 144px;
  justify-content: center;
}

.trait {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trait-icon {
  filter: brightness(0%);
}

.style0,
.style5 {
  background-image: url("/goldtrait.svg");
}

.style1 {
  background-image: url("/bronzetrait.svg");
}

.style2 {
  background-image: url("/silvertrait.svg");
}

.style3 {
  background-image: url("/goldtrait.svg");
}

.style4 {
  background-image: url("/chromatictrait.svg");
}
</style>
