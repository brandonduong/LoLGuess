<script setup lang="ts">
withDefaults(
  defineProps<{
    rank: string;
    width: string;
    height: string;
  }>(),
  { width: "1.75rem", height: "1.75rem" }
);
</script>
<template>
  <div
    :style="`background-image: url(/${rank.toLowerCase()}.png);
    background-repeat: no-repeat;
    background-size: cover;
    width: ${width};
    height: ${height};`"
  />
</template>
<style scoped></style>
