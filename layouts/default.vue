<script setup lang="ts">
import Footer from "~/components/Layout/FooterComponent.vue";
import HeaderMain from "~/components/Layout/HeaderMain.vue";
</script>

<template>
  <div class="app">
    <HeaderMain />
    <slot />
    <Footer />
  </div>
</template>

<style scoped>
.app {
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
  padding-bottom: 137px;
}

@media (max-width: 767px) {
  .app {
    padding-bottom: 97px;
  }
}

@media (max-width: 576px) {
  .app {
    padding-bottom: 60px;
  }
}
</style>
