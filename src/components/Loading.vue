<script setup lang="ts">
import { h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "4rem",
    margin: "5rem 0 4.5rem 0",
    color: "lightslategray",
  },
  spin: true,
});
</script>

<template>
  <div>
    <a-spin :indicator="indicator"></a-spin>
  </div>
</template>

<style></style>
