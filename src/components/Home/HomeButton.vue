<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  onClick?: () => void;
  href?: string;
}>();
</script>
<template>
  <a-button
    class="home-btn"
    @click="() => onClick && onClick()"
    :href="href"
    target="_blank"
  >
    <div class="gold-border">
      <div class="inner-border">
        <div class="inner-blue-border">
          <div class="button-content">
            <div>
              <slot />
            </div>
            <div>
              <h5 v-if="title">{{ title }}</h5>
              <p v-if="description">{{ description }}</p>
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
  background: linear-gradient(#084152, #2d9eca);
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
.home-btn:hover .button-content {
  background: linear-gradient(#094a63, #56bde3);
}

.home-btn:hover .gold-border {
  background: linear-gradient(#d6b27b, var(--color-highlight-gold));
}
</style>
