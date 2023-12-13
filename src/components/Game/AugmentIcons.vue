<script lang="ts">
interface StaticAugment {
  nameId: string;
  loadoutsIcon: string;
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
  staticTFTAugmentData: StaticAugment[];
  augmentAmount: number;
}>();

// Get augment icon styles
const defaultStyles = { path: "", title: "" };
const augmentStyles = ref<AugmentStyle[]>([
  defaultStyles,
  defaultStyles,
  defaultStyles,
]);
props.augments.forEach((aug) => {
  const augmentInfo = props.staticTFTAugmentData.filter((a) => {
    // For set 8.5 return a.nameId === aug;
    // For set 9, new return as some ids are messy (Galio Carry Augment / Winds of War)
    return a.nameId === aug || a.name === aug;
  })[0];

  // Check if hero augment or normal augment, then get path to image
  const path = augmentInfo.loadoutsIcon.split("/");
  const fileName = path[path.length - 1].toLowerCase();
  const augmentPath = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/maps/tft/icons/augments/hexcore/${fileName}`;
  // console.log(aug, augmentInfo, path, fileName);

  const ind = props.augments.indexOf(augmentInfo.nameId);
  checkIfImageExists(augmentPath, (exists: boolean) => {
    if (exists) {
      augmentStyles.value.splice(ind, 1, {
        path: augmentPath,
        title: augmentInfo.name,
      });
    } else {
      augmentStyles.value.splice(ind, 1, {
        path: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${path[
          path.length - 3
        ].toLowerCase()}/${path[path.length - 2].toLowerCase()}/${path[
          path.length - 1
        ].toLowerCase()}`,
        title: augmentInfo.name,
      });
    }
  });
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
      <h5 class="augment-title">{{ augment.title }}</h5>
    </div>
    <!--<h3 class="augment-amount">({{ props.augmentAmount }})</h3>-->
  </div>
</template>
<style scoped>
.augment-div {
  display: flex;
  flex-direction: column;
  align-items: start;
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
}

@media only screen and (max-width: 720px) {
  .augment-div {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }

  .augment {
    flex-direction: column;
  }

  .augment-title {
    text-align: center;
  }
}
</style>
