<script lang="ts">
interface StaticTrait {
  trait_id: string;
  icon_path: string;
  display_name: string;
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
  staticTFTTraitData: StaticTrait[];
}>();

// Get trait icon styles
const traitStyles = ref<TraitStyle[]>([]);
props.traits.forEach((trait) => {
  const traitInfo = props.staticTFTTraitData.filter((t) => {
    return t.trait_id === trait.name && trait.tier_current > 0;
  })[0];

  // If trait is activated, get image
  if (traitInfo) {
    const path = traitInfo.icon_path.split("/");
    traitStyles.value.push({
      path: path[path.length - 1].toLowerCase(),
      style: trait.style,
      title: `${trait.num_units} ${traitInfo.display_name}`,
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
        :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ux/traiticons/${trait.path}`"
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

.style1 {
  background-image: url(https://cdn.lolchess.gg/images/tft/traits/background/bronze.svg);
}

.style2 {
  background-image: url(https://cdn.lolchess.gg/images/tft/traits/background/silver.svg);
}

.style3 {
  background-image: url(https://cdn.lolchess.gg/images/tft/traits/background/gold.svg);
}

.style4 {
  background-image: url(https://cdn.lolchess.gg/images/tft/traits/background/chromatic.svg);
}
</style>
