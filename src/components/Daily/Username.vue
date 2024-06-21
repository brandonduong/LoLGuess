<script setup lang="ts">
const props = defineProps<{ username: string }>();
const separate = props.username.split("#");
const name = separate[0].trim();
const tag = `#${separate[1]}`;
</script>
<template>
  <div class="username">
    <h5>{{ name }}</h5>
    <p>{{ tag }}</p>
  </div>
</template>
<style>
.username {
  text-align: start;
}

.username > h5,
.username > p {
  margin: 0;
}
</style>
