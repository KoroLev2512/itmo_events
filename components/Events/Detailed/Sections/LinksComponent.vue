<script setup lang="ts">
import type { PropType } from "vue";
import Section from "~/components/UI/Section/SectionComponent.vue";

defineProps({
  links: {
    type: Array as PropType<
      {
        link: string;
        label: string;
        type: string;
      }[]
    >,
    required: true,
  },
});
</script>

<template>
  <Section title="Полезные ссылки">
    <div class="links">
      <div v-for="link in links" :key="link.link" class="link">
        <a :href="link.link" target="_blank">{{ link.label }}</a>
      </div>
    </div>
  </Section>
</template>

<style scoped>
.link {
  display: flex;
  align-items: center;
}

.link a {
  color: #254ddd;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}
</style>
