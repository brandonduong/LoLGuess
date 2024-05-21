<script setup lang="ts">
defineProps<{
  onClick?: () => void;
  href?: string;
}>();
</script>

<template>
  <a-button
    class="icon-btn"
    @click="() => onClick && onClick()"
    :href="href"
    target="_blank"
  >
    <div class="gold-border">
      <div class="button-content">
        <slot />
      </div>
    </div>
  </a-button>
</template>
<style scoped>
.icon-btn {
  height: 100%;
  padding: 0;
  border-radius: 100%;
  border: 0;
}

.gold-border {
  background: linear-gradient(#c6a66b, var(--color-gold));
  padding: 4px;
  border-radius: 100%;
}

.button-content {
  padding: 1rem;
  background: radial-gradient(
    #1e2229 0%,
    #1e2229 55%,
    #424142 60%,
    #1e2229 70%
  );
  border-radius: 100%;
  display: flex;
}

.icon-btn:hover .button-content {
  background: radial-gradient(
    #424142 0%,
    #424142 55%,
    #757475 60%,
    #424142 70%
  );
}

.icon-btn:hover .gold-border {
  background: linear-gradient(#d6b27b, var(--color-highlight-gold));
}
</style>
