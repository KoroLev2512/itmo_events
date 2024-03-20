<script setup lang="ts">
import _ from "lodash";
import dayjs from "dayjs";
import { type IEvent, useEventStore } from "~/stores/event";
import "@/assets/styles/tags.css";

const eventStore = useEventStore();
const events = computed(() => eventStore.eventsList);

type addressType = {
  address: string;
  room: string;
  lng: number;
  lat: number;
};

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

function prepareEventsList(events: IEvent[]) {
  let preparedEvents = events;
  if (props.filters.tags.length !== 0) {
    preparedEvents = preparedEvents?.filter((eventMap) =>
      eventMap.tags.some((tag) => props.filters.tags?.includes(tag.label)),
    );
  }
  if (props.filters.days.length === 1) {
    preparedEvents = preparedEvents.filter(
      (eventMap) =>
        dayjs(eventMap.dateStart).format("DD.MM.YYYY") ===
        dayjs(props.filters.days).format("DD.MM.YYYY"),
    );
  } else if (props.filters.days.length === 2) {
    preparedEvents = preparedEvents.filter(
      (eventMap) =>
        dayjs(props.filters.days[0]).startOf("day").valueOf() <
          dayjs(eventMap.dateStart).valueOf() &&
        dayjs(eventMap.dateStart).valueOf() <
          dayjs(props.filters.days[1]).endOf("day").valueOf(),
    );
  }
  return preparedEvents;
}

function preparedAddresses(addresses: addressType[]) {
  return _.groupBy(addresses, ({ address }: addressType) => address);
}

const colorsTagsHash: Record<number, string> = {
  109: "pink-tag",
  110: "blue-tag",
  111: "red-tag",
  112: "green-tag",
  113: "orange-tag",
  114: "lilac-tag",
};
</script>
<template>
  <div class="events__wrapper">
    <div v-if="events && events.length" class="events">
      <div
        v-for="event in prepareEventsList(events)"
        :key="event.id"
        class="event"
      >
        <NuxtLink :key="event.id" :to="`/events/${event.id}`">
          <div class="image__wrapper">
            <img
              v-if="event?.image"
              class="event__img"
              :src="event.image"
              alt="Фото события"
            />
            <div v-if="event?.tags" class="event__tags">
              <span
                v-for="tag in event.tags"
                :key="tag.id"
                :class="[colorsTagsHash[tag.id]]"
                class="event__tag event__tag_desktop"
              >
                {{ tag.label }}
              </span>
              <span
                v-for="tag in event.tags"
                :key="tag.id"
                :class="[colorsTagsHash[tag.id]]"
                class="event__tag event__tag_mobile"
              >
              </span>
            </div>
          </div>
          <div v-if="event?.name" class="event__name">{{ event.name }}</div>
          <div class="event__info">
            <div>
              <div v-if="event?.addresses" class="event__addresses">
                <div
                  v-for="(__, address) in preparedAddresses(event.addresses)"
                  :key="address"
                  class="event__address"
                >
                  <p>{{ address }}</p>
                </div>
              </div>
              <p v-if="event?.dateStart" class="event__date">
                {{ dayjs(event?.dateStart).format("DD.MM.YYYY в HH:mm") }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="!events || prepareEventsList(events).length == 0"
      class="empty-list"
    >
      Мероприятия не найдены
    </div>
    <!--    <button type="button" class="button-more">-->
    <!--      <span>Показать ещё</span>-->
    <!--      <img src="/icons/arrow_drop_down.svg" alt="">-->
    <!--    </button>-->
  </div>
</template>

<style scoped>
.events__wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.empty-list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 120px;
  border-radius: 16px;
  font-family: ALS Gorizont Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  color: #959595;
}

.events {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 40px;
  transition: all 0.3s linear;
}

.event {
  transition: all 0.3s linear;
  display: flex;
  justify-content: center;
}

.event > a:focus {
  outline: none;
}

.image__wrapper {
  position: relative;
  height: 200px;
  border-radius: 16px;
  overflow: clip;
  background: linear-gradient(
    180deg,
    rgba(139, 139, 139, 0) 71%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.event__img {
  width: 300px;
  height: 200px;
  border-radius: 16px;
  object-fit: cover;
  object-position: center center;
  z-index: -1;
  position: relative;
  transition: scale 300ms;
}

.event__tags {
  position: absolute;
  left: 16px;
  bottom: 16px;
  display: flex;
  gap: 4px;
}

.event__tag {
  text-align: center;
  color: var(--white-color);
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.4px;
  height: 24px;
  padding: 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
}

.event__tag_desktop {
  display: flex;
}

.event__tag_mobile {
  display: none;
}

.event__name {
  color: var(--black-color);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-top: 24px;
  max-width: 300px;
}

.event__info {
  display: flex;
}

.event__address > p,
.event__date {
  color: #4f4f55;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  margin-top: 4px;
}

.button-more {
  margin-top: 32px;
  width: auto;
  border: none;
  border-radius: 30px;
  background: var(--white-color);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  height: 40px;
  padding: 0 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.button-more:hover {
  cursor: pointer;
}

.event:hover {
  .event__img {
    scale: 1.1;
  }
}

@media (max-width: 992px) {
  .events {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .events {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 576px) {
  .events {
    grid-column-gap: 24px;
    grid-row-gap: 24px;
  }

  .event__name {
    margin-top: 16px;
  }

  .event__tag_desktop {
    display: none;
  }

  .event__tag_mobile {
    display: block;
    padding: 0;
    height: 12px;
    width: 12px;
  }
}

@media (max-width: 350px) {
  .event__img {
    width: 100%;
  }
}
</style>
