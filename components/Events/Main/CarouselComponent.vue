<script setup lang="ts">
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import CarouselItem from "~/components/Events/Main/CarouselItem.vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const eventStore = useEventStore();

const sliderEvents = computed(() => eventStore?.eventsList?.slice(0, 4) || []);
</script>

<template>
  <div class="wrapper__buttons">
    <div
      slot="button-prev"
      class="swiper-button-prev carousel__button carousel__button_prev"
    >
      <img src="/icons/carousel_arrow_right.svg" alt="<" />
    </div>
    <swiper
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :modules="[Navigation, Pagination, Autoplay]"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true,
      }"
    >
      <swiper-slide v-for="item in sliderEvents" :key="item.id">
        <CarouselItem :key="item.id" :item="item" />
      </swiper-slide>
      <template #pagination>
        <div class="swiper-pagination swiper-pagination-bullets" />
      </template>
    </swiper>
    <div
      slot="button-next"
      class="swiper-button-next carousel__button carousel__button_next"
    >
      <img src="/icons/carousel_arrow_left.svg" alt="<" />
    </div>
  </div>
</template>

<style>
.wrapper__buttons {
  position: relative;
  margin-bottom: 8px;
}

.swiper {
  border-radius: 32px;
}

.carousel__button {
  display: flex;
  width: 48px;
  height: 48px;
  //padding: 0 24px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 30px;
  background: var(--white-color);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  position: absolute;
  top: calc(50% - 24px);
  z-index: 10;
  margin-top: 0;
  content: none;
}

.carousel__button:focus {
  outline: none;
}

.carousel__button:hover {
  cursor: pointer;
}

.carousel__button_prev {
  left: -24px;
}

.carousel__button_next {
  right: -24px;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  display: none;
  content: none;
}

.swiper-pagination {
  display: none;
}

@media (max-width: 576px) {
  .wrapper__buttons {
    width: 100vw;
  }

  .swiper {
    border-radius: 0;
  }

  .carousel__button {
    bottom: -50px;
    top: auto;
    display: none;
  }

  .swiper-pagination {
    bottom: 20px !important;
    display: block;
  }

  .swiper-pagination-bullet {
    width: 5px;
    height: 2px;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1px;
    margin: 0 1px !important;
    transition: width 0.2s ease-out;
  }

  .slick__inactive {
    height: 2px;
    width: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    border-radius: 2px;
    transform: scale(1) !important;
  }

  .slick__active,
  .swiper-pagination-bullet-active {
    height: 2px;
    background-color: var(--white-color);
    width: 20px;
    border: none;
    border-radius: 2px;
  }
}
</style>
