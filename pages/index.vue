<script setup lang="ts">
import Main from "~/components/Events/Main/MainComponent.vue";
import { useEventStore } from "~/stores/event";
definePageMeta({ auth: false });

useHead({
  title: "ITMO EVENTS",
});

const eventStore = useEventStore();
await useAsyncData("events", () => eventStore.getEventsList());
</script>
<template>
  <Main />
</template>

<style scoped></style>
