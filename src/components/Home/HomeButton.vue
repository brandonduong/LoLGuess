<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    onClick?: () => void;
    href?: string;
    type?: string;
    active?: boolean;
  }>(),
  {
    type: "primary",
    active: true,
  }
);
</script>
<template>
  <a-button
    class="home-btn"
    @click="() => onClick && onClick()"
    :href="href"
    target="_blank"
    :style="active ? '' : 'filter: grayscale(70%);'"
  >
    <div :class="type === 'primary' ? 'gold-border' : ''" style="height: 100%">
      <div
        :class="type === 'primary' ? 'inner-border' : ''"
        style="height: 100%"
      >
        <div
          :class="type === 'primary' ? 'inner-blue-border' : ''"
          style="height: 100%"
        >
          <div class="button-content" :type="type" style="height: 100%">
            <div v-if="$slots.icon">
              <slot name="icon" />
            </div>
            <div>
              <h5 v-if="title">{{ title }}</h5>
              <p v-if="description">{{ description }}</p>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-button>
</template>
<style scoped>
.home-btn {
  height: 100%;
  padding: 0;
  border-radius: 0;
  border: 0;
}

.gold-border {
  background: linear-gradient(#c6a66b, var(--color-gold));
  padding: 4px;
}

.inner-border {
  background: linear-gradient(#082031, #183039);
  padding: 8px;
}

.inner-blue-border {
  background: linear-gradient(#3175a5, #76bcd8);
  padding: 4px;
}

.button-content {
  display: flex;
  padding: 1rem;
  gap: 1rem;
  align-items: center;
}

[type="primary"] {
  background: linear-gradient(#084152, #2d9eca);
}
.home-btn:hover [type="primary"] {
  background: linear-gradient(#094a63, #56bde3);
}

[type="secondary"] {
  background: var(--color-background-gray);
}
.home-btn:hover [type="secondary"] {
  background: var(--color-background-highlight-gray);
}

.button-content > div > p,
.button-content > div > h5 {
  margin: 0;
  text-align: start;
  color: rgb(240, 230, 210);
}

.home-btn:hover .inner-border {
  background: linear-gradient(#182c39, #213039);
}
.home-btn:hover .inner-blue-border {
  background: linear-gradient(#84cbe7, #a5efff);
}

.home-btn:hover .gold-border {
  background: linear-gradient(#d6b27b, var(--color-highlight-gold));
}
</style>
