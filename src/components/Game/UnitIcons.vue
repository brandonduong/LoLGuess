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

interface StaticUnit {
  name: string;
  character_record: {
    character_id: string;
    squareIconPath: string;
    display_name: string;
    path: string;
  };
}

interface APIUnit {
  character_id: string;
  tier: number;
  itemNames: string[];
  rarity: number;
}

interface StaticItem {
  name: string;
  nameId: string;
  squareIconPath: string;
}
</script>
<script setup lang="ts">
import { StarFilled } from "@ant-design/icons-vue";
import { ref } from "vue";

const props = defineProps<{
  units: APIUnit[];
  staticTFTUnitData: StaticUnit[];
  staticTFTItemData: StaticItem[];
}>();

const unitStyles = ref<UnitStyle[]>([]);

function sortByCostThenStar(a: APIUnit, b: APIUnit) {
  return a.rarity - b.rarity || a.tier - b.tier;
}

function getItemImage(item: string) {
  const itemInfo = props.staticTFTItemData.filter((i) => {
    return i.nameId === item;
  })[0];

  let completedPath;
  if (itemInfo) {
    const path = itemInfo.squareIconPath.toLowerCase().split("/");
    const ind = path.indexOf("item_icons");
    completedPath =
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/maps/particles/tft/item_icons";
    for (let i = ind + 1; i < path.length; i++) {
      completedPath += `/${path[i]}`;
    }
  } else {
    completedPath =
      "https://raw.communitydragon.org/latest/game/assets/maps/particles/tft/item_icons/placeholders/tft_item_unknown.png";
  }
  return {
    path: completedPath,
    title: itemInfo ? itemInfo.name : item,
  };
}

props.units.sort(sortByCostThenStar).forEach((unit, ind) => {
  const unitInfo = props.staticTFTUnitData.filter((u) => {
    // For set 8.5 return u.character_id === unit.character_id;
    // For set 9, new return as some ids are messy (Ryze, Reksai)

    return u.character_record.path
      .toLowerCase()
      .includes(unit.character_id.toLowerCase());
  })[0];
  // console.log(unit, unitInfo);

  const itemPaths: ItemStyle[] = [];
  if (unitInfo && unitInfo.character_record) {
    // Recent set
    // Get item paths
    unit.itemNames.forEach((item) => {
      itemPaths.push(getItemImage(item));
    });

    // Get unit path
    const path = unitInfo.character_record.squareIconPath
      .toLowerCase()
      .split("/");
    unitStyles.value.push({
      path: `${path[path.length - 3]}/${path[path.length - 2]}/${
        path[path.length - 1]
      }`,
      title: unitInfo.character_record.display_name,
      itemPaths: itemPaths,
      rarity: unit.rarity,
      tier: unit.tier,
    });
  } else {
    // Past sets
    unit.itemNames.forEach((item) => {
      itemPaths.push(getItemImage(item));
    });

    const character_id = unit.character_id.toLowerCase();
    const path = `${character_id}/hud/${character_id}_square.png`;
    unitStyles.value.push({
      path,
      title: unitInfo ? unitInfo.character_record.display_name : character_id,
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
        :src="`https://raw.communitydragon.org/latest/game/assets/characters/${unit.path}`"
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
