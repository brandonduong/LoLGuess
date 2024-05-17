<script setup lang="ts">
import { useRoute } from "vue-router";
defineProps<{ route: string; text: string }>();
const r = useRoute();

function getActive(link: string) {
  return r.fullPath == link ? `link active` : `link`;
}
</script>
<template>
  <RouterLink :to="`/${route}`" :class="getActive(`/${route}`)"
    ><h5>{{ text }}</h5></RouterLink
  >
</template>
<style>
.link > h5 {
  margin: 0;
  font-size: 0.75rem;
}

.link {
  text-decoration: none;
  transition: 0.4s;
  display: flex;
  align-items: center;
  padding: 0.5rem;
}

.active {
  background-image: linear-gradient(
    var(--color-background),
    var(--color-border)
  );
}

.link:hover {
  background-image: linear-gradient(var(--color-background), rgb(91, 90, 86));
}
</style>
