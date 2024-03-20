<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section class="section-wrapper">
    <div class="section-header">
      <h3 v-if="title">{{ title }}</h3>
      <slot name="head-btn"></slot>
    </div>
    <slot></slot>
  </section>
</template>

<style scoped>
/*.section-wrapper {

}*/

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
