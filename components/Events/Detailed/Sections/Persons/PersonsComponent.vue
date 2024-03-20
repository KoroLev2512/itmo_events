<script setup lang="ts">
import type { PropType } from "vue";
import Section from "~/components/UI/Section/SectionComponent.vue";
import Person from "~/components/Events/Detailed/Sections/Persons/PersonComponent.vue";

defineProps({
  persons: {
    type: Array as PropType<
      {
        fullName: string;
        userPic?: string;
        role: string;
        contacts: Array<any>;
      }[]
    >,
    required: true,
  },
});
</script>

<template>
  <Section title="Контактные лица">
    <div v-if="persons" class="persons">
      <Person
        v-for="person in persons"
        :key="person.fullName"
        :person="person"
      />
    </div>
  </Section>
</template>

<style scoped>
.persons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 16px;
}

@media (max-width: 767px) {
  .persons {
    margin-top: 16px;
    grid-template-columns: 1fr;
  }
}
</style>
