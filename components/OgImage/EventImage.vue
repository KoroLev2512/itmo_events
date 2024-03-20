<script setup lang="ts">
defineOptions({
  inheritAttrs: true,
});

const props = defineProps({
  path: String,
  title: {
    type: String,
    default: "Og Image Template",
  },
  description: {
    type: String,
    default: "Set a description to change me.",
  },
  coverImage: {
    type: String,
    default: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
  },
  eventDate: {
    type: String,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
});

const backgroundImageAttributes = computed(() => {
  return {
    src: props.coverImage,
    style: {
      objectFit: "cover",
      position: "absolute",
      width: "100%",
      height: "100%",
    },
  };
});

const wrapperAttributes = computed(() => {
  return {
    style: {
      background: `rgba(0,0,0,0.5)`,
      position: "absolute",
      padding: "50px",
      width: "100%",
      height: "100%",
    },
  };
});

const logoAttributes = computed(() => {
  return {
    style: {
      position: "absolute",
      top: "50px",
      left: "50px",
      height: "32px",
      width: "297px",
    },
  };
});

const titleAttributes = computed(() => {
  return {
    style: {
      fontSize: "64px",
      fontFamily: "alsgorizont-extrabold",
      fontWeight: "700",
      color: "#ffffff",
      position: "absolute",
      top: "50%",
      left: "50px",
      right: "50px",
      // transform: 'translateY(-50%)', убрано, посколдьку при рендеринге в png/svg это не поддерживается
      lineClamp: 3,
      verticalAlign: "middle",
    },
  };
});
</script>

<template>
  <div :style="{ width: '100%', height: '100%' }">
    <img v-bind="backgroundImageAttributes" />
    <div v-bind="wrapperAttributes">
      <img src="/logo.svg" v-bind="logoAttributes" />
      <div v-bind="titleAttributes">
        {{ title }}
      </div>
    </div>
  </div>
</template>
