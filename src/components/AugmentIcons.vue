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
}>();

// Get augment icon styles
const augmentStyles = ref<AugmentStyle[]>([]);
props.augments.forEach((aug) => {
  const augmentInfo = props.staticTFTAugmentData.filter((a) => {
    return a.nameId === aug;
  })[0];

  // Check if hero augment or normal augment, then get path to image
  const path = augmentInfo.loadoutsIcon.split("/");
  const fileName = path[path.length - 1].toLowerCase();
  const augmentPath = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/maps/tft/icons/augments/hexcore/${fileName}`;
  checkIfImageExists(augmentPath, (exists: boolean) => {
    const ind = props.augments.indexOf(augmentInfo.nameId);
    if (exists) {
      augmentStyles.value.splice(ind, 0, {
        path: augmentPath,
        title: augmentInfo.name,
      });
    } else {
      augmentStyles.value.splice(ind, 0, {
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
  <div class="augments">
    <div v-for="augment in augmentStyles" :class="`augment`">
      <img
        class="augment-icon"
        :src="augment.path"
        :alt="augment.title"
        width="16"
        height="16"
        :title="augment.title"
      />
    </div>
  </div>
</template>
<style scoped></style>
