<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}>();
</script>
<template>
  <a-button
    class="home-btn"
    @click="() => onClick && onClick()"
    :disabled="disabled"
    :href="href"
    target="_blank"
  >
    <h3>
      <b>{{ title }}</b>
    </h3>
    <h5>{{ description }}</h5>
    <slot />
  </a-button>
</template>
<style scoped>
.home-btn {
  height: 100%;
  white-space: break-spaces;
  border-color: hsl(51, 99%, 43%);
  border-radius: 0.25rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.home-btn:hover {
  border-color: hsl(51, 99%, 43%);
  background-color: hsl(51, 100%, 83%);
}

.home-btn:disabled {
  background-color: rgb(214, 214, 214);
}
</style>
