<script setup lang="ts">
import type { PropType } from "vue";
import { type ButtonVariants, Sizes } from "./types";

const props = defineProps({
  variant: {
    type: String as PropType<ButtonVariants>,
    required: true,
  },
  size: {
    type: String as PropType<Sizes>,
    default: null,
  },
  class: {
    type: String,
    default: "",
  },
});

const classes = ["btn", props.variant, props.class];

if (props.size != null) {
  classes.push(`size-${props.size}`);
}
</script>

<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.btn {
  padding: 12px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--white-color);
  border-radius: 30px;
  background: var(--primary-color);
  border: none;
  width: fit-content;
  transition: background 0.3s;
  cursor: pointer;

  &.icon {
    padding: 12px 16px;
  }

  &.primary {
    background: var(--primary-color);
  }

  &.primary:hover {
    background: var(--link-color);
  }

  &.success {
    background: var(--alert-green-color);
  }

  &.disabled {
    background: var(--secondary-color);
    cursor: default;
  }

  &.size-sm {
    font-size: 14px;
    line-height: 20px;
    padding: 6px 16px;
  }

  &.skeleton {
    width: 250px;
    height: 48px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(
        to right,
        rgb(143, 142, 141) 0%,
        rgb(237, 235, 233) 50%,
        rgb(143, 142, 141) 100%
      )
      0 0 / 100% 100% rgb(243, 242, 241);
    animation: linearAnim 2s infinite linear;
  }

  @keyframes linearAnim {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 250px 0;
    }
  }
}
</style>
