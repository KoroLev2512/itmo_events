<script setup lang="ts">
import _ from "lodash";
import { useEventStore } from "~/stores/event";
import Hero from "~/components/Events/Detailed/HeroComponent.vue";
import EventInfo from "~/components/Events/Detailed/EventInfo.vue";

definePageMeta({
  auth: false,
  validate: (route) => {
    return /^\d+$/.test(route.params.id as string);
  },
  layout: "event-layout",
});

const route = useRoute();
const eventStore = useEventStore();

await useAsyncData("event", () =>
  eventStore.getEvent(route.params.id as string),
);

const event = eventStore.event;

const description = event?.description?.replace(/<\/?[^>]+>/gi, "");
const config = useRuntimeConfig();

useHead({
  title: event?.name || "ITMO EVENTS",
  meta: [
    {
      name: "description",
      content: description || "Мероприятия Университета ИТМО",
    },
  ],
});

useJsonld({
  "@context": "https://schema.org",
  "@type": "Event",
  name: event?.name,
  startDate: event?.dateStart,
  endDate: event?.dateEnd,
  location: _.uniqBy(
    event?.addresses,
    (address: { address: string; room: string; lng: number; lat: number }) =>
      address.address,
  ).map((address) => [
    {
      "@type": "Place",
      name: address.address,
      address: address.address,
      longitude: address.lng,
      latitude: address.lat,
    },
  ]),
  // eventAttendanceMode: "OnlineEventAttendanceMode",
  eventStatus: "EventScheduled",
  description,
  image: event?.image,
  offers: {
    "@type": "Offer",
    price: 0,
    url: config.public.siteUrl + route.path,
  },
});

const ogImageOptions = {
  component: "Event",
  title: event?.name,
  coverImage: event?.image,
};
// a. Use the Composition API
defineOgImage(ogImageOptions);
</script>

<template>
  <Hero />
  <EventInfo :event="event" />
</template>

<style scoped></style>
