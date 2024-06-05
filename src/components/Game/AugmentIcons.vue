<script lang="ts">
interface StaticData {
  apiName: string;
  icon: string;
  name: string;
}
interface AugmentStyle {
  path: string;
  title: string;
}
</script>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  augments: string[];
  staticTFTItemData: StaticData[];
  augmentAmount: number;
}>();

// Get augment icon styles
const defaultStyles = { path: "", title: "" };
const augmentStyles = ref<AugmentStyle[]>([
  defaultStyles,
  defaultStyles,
  defaultStyles,
]);
props.augments.forEach((aug, ind) => {
  var augmentInfo = props.staticTFTItemData.filter((a) => {
    // For set 8.5 return a.nameId === aug;
    // For set 9, new return as some ids are messy (Galio Carry Augment / Winds of War)
    return a.apiName === aug;
  })[0];

  // Check if hero augment or normal augment, then get path to image
  // console.log(aug, augmentInfo);

  if (augmentInfo && augmentInfo.icon) {
    const path = augmentInfo.icon.split("/");
    const fileNameParts = path[path.length - 1].toLowerCase().split(".");
    const fileName = fileNameParts.slice(0, fileNameParts.length - 1).join(".");
    const augmentPath = `https://raw.communitydragon.org/latest/game/assets/maps/tft/icons/augments/hexcore/${fileName}.png`;
    // console.log(aug, augmentInfo, path, fileName);

    checkIfImageExists(augmentPath, (exists: boolean) => {
      if (exists) {
        augmentStyles.value.splice(ind, 1, {
          path: augmentPath,
          title: augmentInfo.name,
        });
      }
    });
  } else {
    augmentStyles.value.splice(ind, 1, {
      path: "",
      title: aug,
    });
  }
});

function checkIfImageExists(url: string, callback: Function) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
}
</script>
<template>
  <div class="augment-div">
    <div v-for="augment in augmentStyles" :class="`augment`">
      <img
        v-if="augment.path"
        class="augment-icon"
        :src="augment.path"
        :alt="augment.title"
        width="24"
        height="24"
        :title="augment.title"
      />
      <p class="augment-title">{{ augment.title }}</p>
    </div>
    <!--<h3 class="augment-amount">({{ props.augmentAmount }})</h3>-->
  </div>
</template>
<style scoped>
.augment-div {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 200px;
}

.augment-amount {
  margin: 0 0 0 0.5rem;
}

.augment {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
}

.augment-title {
  margin: 0;
  text-align: start;
  color: var(--color-offwhite);
  text-wrap: nowrap;
}

.augment-icon {
  border-radius: 1rem;
}
</style>
