<script lang="ts">
interface UnitStyle {
  path: string;
  title: string;
  itemPaths: ItemStyle[];
  rarity: number;
  tier: number;
}

interface ItemStyle {
  path: string;
  title: string;
}
</script>
<script setup lang="ts">
import type { APIUnit, StaticSetsData } from "@/common/interfaces";
import { store } from "@/common/store";
import { StarFilled } from "@ant-design/icons-vue";
import { ref } from "vue";

const props = defineProps<{
  units: APIUnit[];
}>();

const unitStyles = ref<UnitStyle[]>([]);

function sortByCostThenStar(a: APIUnit, b: APIUnit) {
  return a.rarity - b.rarity || a.tier - b.tier;
}

function getItemImage(item: string) {
  const itemInfo = store.staticTFTItemData.filter((i) => {
    return i.apiName === item;
  })[0];
  // console.log(item, itemInfo);

  let completedPath;
  if (itemInfo) {
    const path = itemInfo.icon.toLowerCase().split("/");
    const ind = path.indexOf("item_icons");
    completedPath =
      "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons";
    for (let i = ind + 1; i < path.length; i++) {
      completedPath += `/${path[i]}`;
    }
    completedPath = `${completedPath.slice(0, completedPath.length - 4)}.png`;
  } else {
    completedPath =
      "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/placeholders/tft_item_unknown.png";
  }
  return {
    path: completedPath,
    title: itemInfo ? itemInfo.name : item,
  };
}

props.units.sort(sortByCostThenStar).forEach((unit) => {
  // console.log(unit);
  const setNum = unit.character_id.split("_")[0].slice(3);
  const unitInfo = store.staticTFTSetsData[
    parseInt(setNum) as keyof StaticSetsData
  ].champions.filter((u) => {
    return u.apiName === unit.character_id;
  })[0];
  // console.log(unit, unitInfo);

  const itemPaths: ItemStyle[] = [];
  if (unitInfo) {
    // Recent set
    // Get item paths
    unit.itemNames.forEach((item) => {
      itemPaths.push(getItemImage(item));
    });

    // Get unit path sometimes in format tft11_yasuo_square.tft_set11.png or tft10_twitch_square.png
    const pathParts = unitInfo.tileIcon.split("/");
    const path = pathParts[pathParts.length - 1];
    unitStyles.value.push({
      path: `${pathParts[pathParts.length - 3]}/hud/${path.slice(
        0,
        path.length - 4
      )}`.toLowerCase(),
      title: unitInfo.name,
      itemPaths: itemPaths,
      rarity: unit.rarity,
      tier: unit.tier,
    });
  }
});
</script>
<template>
  <div class="units">
    <div v-for="unit in unitStyles" class="unit">
      <div class="star-div">
        <star-filled
          v-for="t in unit.tier"
          :class="`star rarity${unit.rarity}`"
        />
      </div>
      <img
        :class="`unit-icon rarity${unit.rarity}`"
        :src="`https://raw.communitydragon.org/latest/game/assets/characters/${unit.path}.png`"
        :alt="unit.title"
        width="36"
        height="36"
        :title="unit.title"
      />
      <div class="items">
        <img
          v-for="item in unit.itemPaths"
          class="item-icon"
          :src="item.path"
          :alt="item.title"
          width="12"
          height="12"
          :title="item.title"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.units {
  display: flex;
}

.unit {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.25rem;
}

.unit-icon {
  margin-bottom: 0.25rem;
  border: 2px solid black;
  border-radius: 6px;
}

.items {
  min-height: 12px;
  font-size: 0;
}

.rarity0 {
  border-color: gray;
  color: gray;
}

.rarity1 {
  border-color: #11b288;
  color: #11b288;
}

.rarity2 {
  border-color: #207ac7;
  color: #207ac7;
}

.rarity4 {
  border-color: #c440da;
  color: #c440da;
}

.rarity6 {
  border-color: #ffb93b;
  color: #ffb93b;
}

.star {
  font-size: 12px;
}

.star-div {
  display: flex;
  padding-bottom: 0.25rem;
}

@media only screen and (max-width: 720px) {
  .units {
    justify-content: center;
  }
}
</style>
