<script setup lang="ts">
import dayjs from "dayjs";
import "@/assets/styles/tags.css";

defineProps(["item"]);

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
  <div class="carousel__item__wrapper">
    <NuxtLink :key="item.id" class="item__link" :to="`/events/${item.id}`">
      <img class="carousel__item__bg" :src="item.image" alt="" />
      <div class="item">
        <div v-if="item" class="item__tags">
          <span
            v-for="tag in item?.tags"
            :key="tag.id"
            :class="[colorsTagsHash[tag.id]]"
            class="item__tag"
          >
            {{ tag?.label }}
          </span>
        </div>
        <div class="item__info">
          <h1 v-if="item?.name" class="item__title">
            {{ item?.name }}
          </h1>
          <div v-if="item?.addresses" class="item__extra-info">
            <img src="/icons/place.svg" alt="" />
            <span>
              {{ item?.addresses[0].address }}
            </span>
          </div>
          <div v-if="item?.dateStart" class="item__extra-info">
            <img src="/icons/time_white.svg" alt="" />
            <span>
              {{ dayjs(item?.dateStart).format("DD.MM.YYYY в HH:mm") }}
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.carousel__item__wrapper {
  flex: 0 0 100%;
}

.carousel__item__bg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  object-fit: cover;
  object-position: center center;
}

.carousel__item__wrapper {
  height: 560px;
  background: rgba(0, 0, 0, 0.44);
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.44) 100%
  );
  border-radius: 32px;
}

.item {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  max-width: 1150px;
  padding: 40px;
  gap: 12px;
}

.item__info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item__title {
  color: var(--white-color);
  font-size: 32px;
  font-style: normal;
  font-weight: 750;
  line-height: 48px;
}

.item__extra-info {
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  align-items: center;
}

.item__extra-info span {
  color: var(--white-color);
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
}

.item__tags {
  display: flex;
  gap: 8px;
}

.item__tag {
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--white-color);
  border-radius: 16px;
  letter-spacing: 0.05em;
}

@media (max-width: 576px) {
  .carousel__item__bg {
    z-index: -1;
  }

  .carousel__item__bg,
  .carousel__item__wrapper {
    border-radius: 0;
  }

  .carousel__item__wrapper {
    max-height: 450px;
    border-radius: 0;
  }

  .item {
    padding: 0 16px 38px;
    gap: 16px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 37.98%, #000 100%);
  }

  .item__info {
    gap: 16px;
  }

  .item__title {
    font-size: 26px;
    font-weight: 750;
    line-height: 34px;
  }

  .item__extra-info > span {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
  }

  .item__extra-info > img {
    width: 20px;
    height: 20px;
  }
}
</style>
