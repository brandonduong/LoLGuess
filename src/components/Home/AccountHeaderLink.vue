<script setup lang="ts">
import { useRoute } from "vue-router";
defineProps<{ route: string; text: string }>();
const r = useRoute();

function getActive(link: string) {
  return r.fullPath == link ? `link active` : `link`;
}
</script>
<template>
  <RouterLink :to="`/${route}`" :class="getActive(`/${route}`)">
    <h5>{{ text }}</h5>
    <div class="arrow"></div>
  </RouterLink>
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
  padding: 0 0.5rem;
}

.active {
  background-image: linear-gradient(
    var(--color-background),
    var(--color-border)
  );
}

.link:hover {
  background-image: linear-gradient(var(--color-background), rgb(91, 90, 86));
  color: var(--color-highlight-gold);
}

.active > .arrow {
  background-image: url("/arrow.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  animation-name: arrow;
  animation-duration: 0.5s;
}

@keyframes arrow {
  0% {
    top: -10px;
  }
  100% {
    top: 0px;
  }
}
</style>
