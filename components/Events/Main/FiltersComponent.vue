<script setup lang="ts">
import "@/assets/styles/tags.css";

const tags = {
  109: {
    name: "be friendly",
    color: "pink-tag",
  },
  110: {
    name: "be open",
    color: "orange-tag",
  },
  111: {
    name: "be healthy",
    color: "red-tag",
  },
  112: {
    name: "be eco",
    color: "green-tag",
  },
  113: {
    name: "be fit",
    color: "blue-tag",
  },
  114: {
    name: "be pro",
    color: "lilac-tag",
  },
};
defineProps(["filters", "onTagClick"]);
</script>

<template>
  <div class="filters__wrapper">
    <div class="tags">
      <div class="tags__wall tags__wall_left"></div>
      <div
        v-for="tag in tags"
        :key="tag.name"
        :class="filters.tags.includes(tag.name) ? tag.color : 'tag_inactive'"
        class="tag"
        @click="onTagClick(tag.name)"
      >
        {{ tag.name }}
      </div>
      <div class="tags__wall tags__wall_right"></div>
    </div>
  </div>
</template>

<style scoped>
.filters__wrapper {
  margin-bottom: 32px;
}

.tags {
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  overflow-y: hidden;
}

.tags::-webkit-scrollbar {
  width: 0;
}

.tag {
  display: flex;
  height: 32px;
  padding: 0 12px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 32px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
  user-select: none;
  color: white;
  transition: all 0.2s linear;
}

.tag:hover {
  cursor: pointer;
}

.tag_inactive {
  background: rgba(0, 0, 0, 0.04);
  color: rgba(27, 31, 59, 0.8);
}

@media (max-width: 576px) {
  .filters__wrapper {
    position: relative;
  }

  .tags {
    padding: 0 12px;
  }

  .tags__wall {
    position: absolute;
    height: 100%;
    width: 14px;
    z-index: 11;
  }

  .tags__wall_left {
    left: -2px;
    background: linear-gradient(
      90deg,
      #fff 52.65%,
      rgba(255, 255, 255, 0) 130%
    );
  }

  .tags__wall_right {
    right: -2px;
    background: linear-gradient(
      270deg,
      #fff 52.65%,
      rgba(255, 255, 255, 0) 130%
    );
  }
}
</style>
