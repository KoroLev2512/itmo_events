<script setup lang="ts">
import dayjs from "dayjs";
import EventsList from "~/components/Events/Main/EventsList.vue";
import Carousel from "~/components/Events/Main/CarouselComponent.vue";
import Filters from "~/components/Events/Main/FiltersComponent.vue";
import Calendar from "~/components/Events/Main/CalendarComponent.vue";

export interface EventsFilters {
  tags: string[];
  days: object[];
}

const filters = useState<EventsFilters>("filters", () => ({
  tags: [],
  days: [],
}));

function onTagClick(tagName: string) {
  const tags = filters.value.tags;
  if (tags.includes(tagName)) {
    filters.value.tags = tags.filter((tag) => tag !== tagName);
  } else {
    filters.value.tags.push(tagName);
  }
}

function onCalendarDayClick(dayName: Date) {
  const days = filters.value.days;
  if (days.length === 0) {
    filters.value.days.push(dayName);
  } else if (days.length === 1) {
    const dayArray = filters.value.days[0] as Date;
    if (dayjs(dayName).valueOf() > dayjs(dayArray).valueOf()) {
      filters.value.days.push(dayName);
    } else if (dayjs(dayName).valueOf() < dayjs(dayArray).valueOf()) {
      filters.value.days.push(dayArray);
      filters.value.days[0] = dayName;
    } else {
      filters.value.days = [];
    }
  } else {
    filters.value.days = [];
  }
}
</script>

<template>
  <div class="carousel__main-wrapper">
    <Carousel />
  </div>
  <div class="wrapper">
    <h2>События в ИТМО</h2>
    <Calendar :filters="filters" :on-calendar-day-click="onCalendarDayClick" />
    <Filters :filters="filters" :on-tag-click="onTagClick" />
    <EventsList :filters="filters" />
  </div>
</template>

<style scoped>
.wrapper,
.carousel__main-wrapper {
  max-width: 1150px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
}

.carousel__main-wrapper {
  padding-bottom: 0;
}

.carousel__main-wrapper:focus {
  outline: none;
}

h2 {
  color: var(--black-color);
  font-family:
    ALS Gorizont Variable,
    serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 750;
  line-height: 52px;
  margin-bottom: 32px;
}

@media (max-width: 576px) {
  .carousel__main-wrapper {
    padding: 0;
  }
  .wrapper {
    padding: 24px 16px;
  }
  h2 {
    margin-bottom: 16px;
  }
}
</style>
