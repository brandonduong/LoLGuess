<script setup lang="ts">
enum ButtonType {
  primary,
  secondary,
  tertiary,
  default,
}

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    onClick?: () => void;
    href?: string;
    type?: keyof typeof ButtonType;
    active?: boolean;
    justifyContent?: string;
    flexDirection?: string;
    iconGap?: string;
    padding?: string;
  }>(),
  {
    type: "primary",
    active: true,
    justifyContent: "start",
    flexDirection: "row",
    iconGap: "1rem",
    padding: "1rem",
  }
);
function borderOne() {
  switch (props.type) {
    case "primary":
      return "gold-border";
    case "default":
      return "gold-border";
    default:
      break;
  }
}

function borderTwo() {
  switch (props.type) {
    case "primary":
      return "inner-border";
    case "default":
      return "default-inner-border";
    default:
      break;
  }
}

function borderThree() {
  switch (props.type) {
    case "primary":
      return "inner-blue-border";
    case "default":
      return "default-border-3";
    default:
      break;
  }
}

function contentColor() {
  switch (props.type) {
    case "primary":
      return "primary-content";
    case "default":
      return "default-content";
    case "secondary":
      return "secondary-content";
    case "tertiary":
      return "primary-content";
    default:
      break;
  }
}
</script>
<template>
  <a-button
    class="home-btn"
    @click="() => onClick && active && onClick()"
    :href="href"
    target="_blank"
    :style="active ? '' : 'filter: grayscale(70%);'"
  >
    <div :class="borderOne()" style="height: 100%">
      <div :class="borderTwo()" style="height: 100%">
        <div :class="borderThree()" style="height: 100%">
          <div
            class="button-content"
            :class="contentColor()"
            :style="`justify-content: ${justifyContent}; flex-direction: ${flexDirection}; gap: ${iconGap}; padding: ${padding}`"
          >
            <span v-if="$slots.icon" style="display: flex">
              <slot name="icon" />
            </span>
            <div v-if="title || description">
              <h5 v-if="title">{{ title }}</h5>
              <p v-if="description">{{ description }}</p>
            </div>
            <slot />
            <span v-if="$slots.iconRight" style="display: flex">
              <slot name="iconRight" />
            </span>
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

@keyframes fadeInFromNone {
  0% {
    opacity: 0.8;
  }

  100% {
    opacity: 1;
  }
}

.button-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.button-content > div > p,
.button-content > div > h5 {
  margin: 0;
  text-align: start;
  color: rgb(240, 230, 210);
}

/* BORDERS */

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

.default-inner-border {
  background: linear-gradient(#0a1016, #0a0f17);
  padding: 8px;
}

.default-border-3 {
  background: linear-gradient(#584534, #3d3227);
  padding: 4px;
}

/* CONTENT */

.primary-content {
  background: linear-gradient(var(--color-dark-blue), var(--color-light-blue));
  animation: fadeInFromNone 0.4s ease-out;
}

.secondary-content {
  background: var(--color-background-gray);
}

.default-content {
  background: linear-gradient(#2e2a28, #24211d);
}

/* CONTENT HOVERS */
.home-btn:hover .primary-content {
  background: linear-gradient(
    var(--color-highlight-dark-blue),
    var(--color-highlight-light-blue)
  );
}
.home-btn:hover .secondary-content {
  background: var(--color-background-highlight-gray);
}
.home-btn:hover .default-content {
  background: linear-gradient(#6c5641, #3f3228);
}

/* BORDER HOVERS */

.home-btn:hover .inner-border {
  background: linear-gradient(#182c39, #213039);
}
.home-btn:hover .inner-blue-border {
  background: linear-gradient(#84cbe7, #a5efff);
}

.home-btn:hover .gold-border {
  background: linear-gradient(#d6b27b, var(--color-highlight-gold));
}

.home-btn:hover .default-inner-border {
  background: linear-gradient(#1c1c1b, #15181a);
}
.home-btn:hover .default-border-3 {
  background: linear-gradient(#af885b, #836139);
}
</style>
