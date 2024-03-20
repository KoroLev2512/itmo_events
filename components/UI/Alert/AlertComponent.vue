<script setup lang="ts">
import Section from "~/components/UI/Section/SectionComponent.vue";

defineProps({
  alertType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  iconPath: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <Section>
    <div :class="`alert-wrapper ${alertType}`">
      <div class="alert-info">
        <div class="alert-icon">
          <img :src="iconPath" alt="ITMO/Events" />
        </div>
        <div class="alert-title">
          {{ title }}
        </div>
      </div>
      <div class="alert-text">
        {{ text }}
      </div>
    </div>
  </Section>
</template>

<style scoped>
.alert-wrapper {
  display: flex;
  flex-direction: column;
  width: auto;
  padding: var(--padding-m);
  gap: 16px;
  border-radius: 8px;
  max-width: calc(var(--max-width-base) - var(--padding-m) * 2);
  margin: 0 auto;
}

.pending {
  border: 2px solid var(--alert-yellow-color);
}

.succeed {
  border: 2px solid var(--alert-green-color);
}

.alert-info {
  display: flex;
  gap: 8px;
}

.alert-title {
  color: var(--black-color);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}

.alert-icon {
  width: 24px;
  height: 24px;
}

.alert-text {
  color: var(--black-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
</style>
