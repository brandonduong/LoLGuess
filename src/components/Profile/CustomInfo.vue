<script setup lang="ts">
import { InfoCircleOutlined } from "@ant-design/icons-vue";
</script>
<template>
  <a-popover
    color="var(--color-background-gray)"
    placement="bottomRight"
    overlayClassName="info"
  >
    <template #content>
      <div style="max-width: 300px">
        <slot />
      </div>
    </template>
    <InfoCircleOutlined
      style="
        color: var(--color-offwhite);
        font-size: 1rem;
        cursor: url('/cursor-pointer.png'), pointer;
      "
    />
  </a-popover>
</template>
<style>
.info > .ant-popover-content {
  border: 4px solid var(--color-gold);
}
</style>
