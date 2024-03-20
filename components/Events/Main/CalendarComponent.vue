<script setup lang="ts">
import { computed, onMounted } from "vue";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";

const props = defineProps([
  "filters",
  "onCalendarDayClick",
  "onDatepickerDayClick",
]);

const calendar = useState<HTMLElement | null>("calendar", () => null);
const startDate = dayjs().startOf("day");
const canScrollLeft = useState<boolean>("canScrollLeft", () => false);
const canScrollRight = useState<boolean>("canScrollRight", () => true);
const isDatepickerVisible = useState<boolean>(
  "isDatepickerVisible",
  () => false,
);
const currentMonthIndex = useState("currentMonthIndex", () => 0);
let touchStartX = 0;
let touchCurrentX = 0;

const dates = computed(() => {
  let current = startDate;
  const result = [];
  for (let i = 0; i < 90; i++) {
    result.push(current);
    current = current.add(1, "day");
  }
  return result;
});

const today = dayjs().startOf("day");

const groupedDates = computed(() => {
  const groups: { [key: string]: Dayjs[] } = {};
  for (const date of dates.value) {
    const monthKey = date.locale("ru").format("MMMM");
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(date);
  }
  return groups;
});

const closeDatepicker = () => {
  isDatepickerVisible.value = false;
};

const isDateSelected = computed(() => props.filters.days.length > 0);

const datepickerDates = computed(() => {
  const weeks = [];
  const currentDayOfMonth = dayjs()
    .add(currentMonthIndex.value, "month")
    .startOf("month")
    .day();

  let currentDate =
    currentDayOfMonth === 1
      ? dayjs()
          .startOf("month")
          .add(currentMonthIndex.value, "month")
          .startOf("day")
      : dayjs()
          .add(currentMonthIndex.value, "month")
          .startOf("month")
          .subtract(currentDayOfMonth - 1, "day")
          .startOf("day");
  for (let i = 0; i < 5; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      week.push(
        (i === 0 && currentDate.date() > 7) ||
          (i === 4 && currentDate.date() < 24)
          ? null
          : currentDate,
      );
      currentDate = currentDate.add(1, "day");
    }
    weeks.push(week);
  }
  return weeks;
});

function nextMonth() {
  if (currentMonthIndex.value < 5) {
    currentMonthIndex.value += 1;
  }
}

function prevMonth() {
  if (currentMonthIndex.value > 0) {
    currentMonthIndex.value -= 1;
  }
}

function formatDate(date: Dayjs) {
  return {
    month: date.locale("ru").format("МММ"),
    date: date.locale("ru").format("D"),
    weekday: date.locale("ru").format("dd"),
  };
}

function isWeekend(date: Dayjs): boolean {
  return date.day() === 0 || date.day() === 6;
}

function handleScroll() {
  if (calendar.value) {
    const maxScrollLeft =
      calendar.value.scrollWidth - calendar.value.clientWidth;
    canScrollLeft.value = calendar.value.scrollLeft > 0;
    canScrollRight.value = calendar.value.scrollLeft < maxScrollLeft;
  }
}

function scroll(direction: number) {
  if (calendar.value) {
    const amount = direction * 300;
    calendar.value.scrollBy({ left: amount, behavior: "smooth" });
    handleScroll();
  }
}

function handleTouchStart(event: TouchEvent) {
  touchStartX = event.touches[0].clientX;
  touchCurrentX = touchStartX;
}

function handleTouchMove(event: TouchEvent) {
  touchCurrentX = event.touches[0].clientX;
  if (calendar.value) {
    const deltaX = touchStartX - touchCurrentX;
    calendar.value.scrollLeft += deltaX;
    touchStartX = touchCurrentX;
  }
}

function toggleDatepicker() {
  isDatepickerVisible.value = !isDatepickerVisible.value;
}

function formatMonthName(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: "long" };
  const locale = "ru-RU";
  const monthName = new Intl.DateTimeFormat(locale, options).format(date);
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}

function isPastDate(date: dayjs.Dayjs) {
  return date.isBefore(today, "day");
}

onMounted(() => {
  if (calendar.value) {
    handleScroll();
  }
});

const dateStylesCheck = (dayName: Dayjs) => {
  if (props.filters.days.length === 0) {
    return "date";
  } else if (
    props.filters.days.length === 1 &&
    dayjs(props.filters.days[0]).valueOf() === dayName.valueOf()
  ) {
    return "date date_select";
  } else {
    const day1 = dayjs(props.filters.days[0]).valueOf();
    const day2 = dayjs(props.filters.days[1]).valueOf();
    const dayCheck = dayName.valueOf();
    if (day1 < dayCheck && dayCheck < day2) {
      return "date date_between";
    } else if (day1 === dayCheck) {
      return "date date_select date_select_start";
    } else if (dayCheck === day2) {
      return "date date_select date_select_end";
    } else {
      return "date";
    }
  }
};

function isDateChecked(day: Dayjs): string {
  if (
    props.filters.days.some(
      (item: Dayjs) => dayjs(item).valueOf() === dayjs(day).valueOf(),
    )
  ) {
    return "dp-date dp-date-checked";
  }

  if (props.filters.days.length > 1) {
    const day1 = dayjs(props.filters.days[0]).valueOf();
    const day2 = dayjs(props.filters.days[1]).valueOf();
    const dayCheck = dayjs(day).valueOf();
    if (day1 < dayCheck && dayCheck < day2) {
      return "dp-date dp-date-includes";
    }
  }

  return "dp-date";
}
</script>

<template>
  <div class="calendar__wrapper__buttons">
    <button
      v-if="canScrollLeft"
      class="calendar__button calendar__button_prev"
      @click="scroll(-1)"
    >
      <img src="/icons/carousel_arrow_right.svg" alt="<" />
    </button>
    <div class="calendar-container">
      <div
        ref="calendar"
        class="calendar"
        @scroll="handleScroll"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
      >
        <div
          class="datepickerIcon"
          :class="{ datepickerIconSelected: isDateSelected }"
          @click="toggleDatepicker"
        >
          <img src="/icons/calendar.svg" alt="calendar" width="16px" />
        </div>
        <div
          v-for="(dates, monthKey) in groupedDates"
          :key="monthKey"
          class="month-group"
        >
          <div class="month-label">
            {{ monthKey }}
          </div>
          <div class="dates-group">
            <div
              v-for="date in dates"
              :key="date.toString()"
              class="calendar__item"
              @click="onCalendarDayClick(date)"
            >
              <div :class="dateStylesCheck(date)">
                <div>
                  {{ formatDate(date).date }}
                </div>
                <div class="weekday" :class="{ weekend: isWeekend(date) }">
                  {{ formatDate(date).weekday }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="canScrollRight"
      class="calendar__button calendar__button_next"
      @click="scroll(1)"
    >
      <img src="/icons/carousel_arrow_left.svg" alt=">" />
    </button>
  </div>
  <div
    v-if="isDatepickerVisible"
    class="dp-container-wrapper"
    @click="closeDatepicker"
  />
  <div v-if="isDatepickerVisible" class="dp-container">
    <div class="dp-buttons">
      <div @click="prevMonth">
        <img src="/icons/datepicker_arrow_left.svg" alt="<" />
      </div>
      <div>
        {{
          formatMonthName(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + currentMonthIndex,
              1,
            ),
          )
        }}
      </div>
      <div @click="nextMonth">
        <img src="/icons/datepicker_arrow_right.svg" alt="<" />
      </div>
    </div>
    <div class="dp-weekday-container">
      <div
        v-for="date in datepickerDates[1] as Dayjs[]"
        :key="date?.toString()"
        class="dp-date"
        :class="{ weekend: isWeekend(date) }"
      >
        <div>
          {{ formatDate(date).weekday }}
        </div>
      </div>
    </div>
    <div
      v-for="week in datepickerDates"
      :key="String(week[0])"
      class="dp-month"
    >
      <div
        v-for="(date, index) in week"
        :key="date != null ? date.toString() : index"
        :class="{ 'dp-date-disabled': date != null && isPastDate(date) }"
      >
        <div
          v-if="date != null"
          :key="date.toString()"
          :class="isDateChecked(date)"
          @click="onCalendarDayClick(date)"
        >
          {{ formatDate(date).date }}
        </div>
        <div v-else class="dp-date" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dp-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 0 8px 0;
}

.dp-container-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
}

.dp-container {
  display: inline-flex;
  position: absolute;
  background: var(--white-color);
  margin-top: -25px;
  z-index: 101;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  user-select: none;
}

.dp-month {
  display: flex;
  justify-content: center;
}

.dp-weekday-container {
  display: flex;
  justify-content: center;
}

.dp-weekday-container > * {
  opacity: 0.4;
  color: var(--black-color);
  user-select: none;
}

.dp-date {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: lighter;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 4px;
}

.dp-date-disabled {
  color: var(--black-color);
  opacity: 0.4;
  pointer-events: none;
}

.dp-date-checked {
  background: rgba(0, 0, 0, 0.08);
  color: var(--black-color);
}

.dp-date-includes {
  background: rgba(245, 245, 245, 0.5);
  color: var(--black-color);
  border-radius: 4px;
  height: 32px;
}

.month-group {
  display: flex;
  position: relative;
  flex-direction: column;
  margin-right: 16px;
  text-transform: uppercase;
  user-select: none;
}

.month-group:last-child {
  margin-right: 0;
  user-select: none;
}

.dates-group {
  display: flex;
  flex-direction: row;
}

.calendar__wrapper__buttons {
  position: relative;
  margin-bottom: 32px;
}

.calendar__button {
  display: flex;
  width: 48px;
  height: 100%;
  padding: 0;
  justify-content: center;
  align-items: center;
  border: none;
  position: absolute;
  top: 0;
  z-index: 10;
  user-select: none;
}

.calendar__button:focus {
  outline: none;
}

.calendar__button_prev {
  background: linear-gradient(to right, #ffffff 60%, transparent);
  left: -24px;
}

.calendar__button_next {
  background: linear-gradient(to left, #ffffff 60%, transparent);
  right: -24px;
}

.calendar-container {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
}

.calendar {
  display: flex;
  overflow-x: scroll;
  flex-grow: 1;
  height: 74px;
  gap: 8px;
}

.calendar::-webkit-scrollbar {
  display: none;
}

.calendar__item {
  position: relative;
}

.month-label {
  font-size: 12px;
  position: sticky;
  text-transform: uppercase;
  opacity: 0.4;
  color: var(--black-color);
  top: 0;
  left: 26px;
  margin-top: -6px;
  width: 40px;
  text-align: center;
  user-select: none;
}

.date {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 10px;
  gap: 2px;
  min-width: 40px;
  height: 52px;
  white-space: nowrap;
  margin-top: 8px;
  user-select: none;
}

.datepickerIcon {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 51px;
  width: 40px;
  padding: 0 11px;
  align-self: stretch;
  border-radius: 8px;
  background: #f5f5f5;
  box-sizing: border-box;
  margin: auto 0 4px;
  user-select: none;
  transition: 0.5s;
}

.datepickerIcon:hover {
  background: rgba(0, 0, 0, 0.12);
}

.datepickerIconSelected {
  background: var(--black-color);
  transition: 0.5s;
}

.datepickerIconSelected img {
  filter: brightness(0) invert(1);
}

.datepickerIconSelected:hover {
  background: var(--black-color);
}

.date_select {
  background: #f5f5f5;
  border-radius: 8px;
}

.calendar__item:last-child .date::after {
  content: "";
  display: block;
  position: absolute;
  top: 8px;
  background-color: white;
  width: 24px;
  height: 52px;
  right: -24px;
}

.date_select_start {
  border-radius: 8px 0 0 8px;
}

.calendar__item:last-child .date_select_start::after {
  background: rgba(245, 245, 245, 0.43);
}

.date_select_end {
  border-radius: 0 8px 8px 0;
}

.date_between {
  background: rgba(245, 245, 245, 0.43);
}

.calendar__item:last-child .date_between::after {
  background: rgba(245, 245, 245, 0.43);
}

.date_select,
.date_between {
  transition: all 0.3s linear;
}

.date:hover {
  cursor: pointer;
}

.weekday {
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.4;
  color: var(--black-color);
  user-select: none;
}

.weekend {
  opacity: 1;
  color: var(--red-color);
  user-select: none;
}
</style>
