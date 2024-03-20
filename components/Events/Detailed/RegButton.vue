<script setup lang="ts">
import type { PropType } from "vue";
enum ButtonTypes {
  "unauthenticated" = "unauthenticated",
  "authenticated" = "authenticated",
  "participant" = "participant",
}

defineProps({
  buttonType: {
    type: String as PropType<ButtonTypes>,
    required: true,
  },
});
</script>

<template>
  <button :class="buttonType">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 30px;
  padding: 12px 32px;
  text-align: center;
  position: relative;
  width: fit-content;
}

button:hover {
  cursor: pointer;
}

.unauthenticated {
  background-color: var(--white-color);
  color: var(--secondary-color);
}

.authenticated {
  background-color: var(--primary-color);
  color: var(--white-color);
}

.participant {
  background-color: var(--secondary-color);
  color: var(--white-color);
}

@media (max-width: 767px) {
  button {
    background-color: #7f00ff;
  }
}
</style>
