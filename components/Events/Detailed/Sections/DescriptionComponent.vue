<script setup lang="ts">
import Section from "~/components/UI/Section/SectionComponent.vue";

defineProps({
  description: {
    type: String,
    required: true,
  },
});
const showText = useState<boolean>("showText", () => false);
</script>

<template>
  <Section title="О событии">
    <div v-if="showText">
      <div class="description_full" v-html="description" />
      <button class="description__button" @click="showText = false">
        Скрыть
      </button>
    </div>
    <div v-else>
      <div class="description_part" v-html="description" />
      <button class="description__button" @click="showText = true">
        Показать больше
      </button>
    </div>
  </Section>
</template>

<style scoped>
.description_full {
  display: block;
}

.description__button {
  display: none;
}

@media (max-width: 576px) {
  .description_part {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .description__button {
    display: block;
    color: #254ddd;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    border: none;
    background: none;
    cursor: pointer;
    margin-top: 16px;
  }
}
</style>
