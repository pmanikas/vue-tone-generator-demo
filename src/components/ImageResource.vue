<script>
import LazyLoad from "./../directives/LazyLoad";

const placeHolder = "d.jpg";

export default {
  name: "ImageResource",
  directives: { lazyload: LazyLoad },
  props: {
    src: {
      type: String,
      default: placeHolder,
    },
    alt: {
      type: String,
      default: "Tone Generator Image",
    },
  },
};
</script>
<template>
  <div class="wrap" v-lazyload>
    <img :data-url="src" :alt="alt" class="image" />
  </div>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

.wrap {
  &.loaded .image {
    animation: fadeIn 1s ease-out forwards;
  }
}
.image {
  display: block;
  object-fit: cover;
  height: 100%;
  width: 100%;
  opacity: 0;
}
</style>
