<template>
  <div class="map-wrap">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script setup>
import { Map, Marker, config, LngLatBounds } from "@maptiler/sdk";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useRuntimeConfig } from "#app";

const runtimeConfig = useRuntimeConfig();
const MapStyleUrl = runtimeConfig.public.mapStyleUrl;

const props = defineProps({
  points: {
    type: Array,
    required: true,
  },
});

const mapContainer = shallowRef(null);
const map = shallowRef(null);

onMounted(() => {
  config.apiKey = "3sh3qZulwbhuoEGtaOWy";

  const initialState = {
    zoom: 13,
    pitch: 0,
  };

  map.value = markRaw(
    new Map({
      container: mapContainer.value,
      style: MapStyleUrl,
      center: [props.points[0].lng, props.points[0].lat],
      zoom: initialState.zoom,
      pitch: initialState.pitch,
      cooperativeGestures: true,
      maxZoom: 19,
    }),
  );

  // new Marker({color: '#0038ff'})
  //     .setLngLat([props.lng, props.lat])
  //     .addTo(map.value);

  props.points.forEach((point) => {
    const el = document.createElement("div");
    el.className = "marker";
    el.style.backgroundImage = `url(/icons/marker.svg)`;
    el.style.backgroundSize = `cover`;
    el.style.backgroundRepeat = `no-repeat`;
    el.style.backgroundPosition = `center`;
    el.style.width = `32px`;
    el.style.height = `32px`;

    new Marker({ element: el })
      .setLngLat([point.lng, point.lat])
      .addTo(map.value);
  });

  if (props.points.length > 1) {
    const bounds = props.points
      .map((point) => [point.lng, point.lat])
      .reduce(
        (bounds, coord) => {
          return bounds.extend(coord);
        },
        new LngLatBounds(
          props.points.map((point) => [point.lng, point.lat])[0],
          props.points.map((point) => [point.lng, point.lat])[0],
        ),
      );

    map.value.fitBounds(bounds, {
      padding: 100,
    });
  }
});

onUnmounted(() => {
  map.value?.remove();
});
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: 500px;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

@media (max-width: 991px) {
  .map-wrap {
    height: 350px;
  }
}
</style>
