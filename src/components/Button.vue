<script>
export default {
  name: "Button",
};
</script>

<template>
  <button @click="$emit('pressed')" class="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

button {
  border: none;
  background: none;
  box-shadow: none;
  outline: none;
}

.button {
  position: relative;
  width: $s-xxl * 2;
  padding: $s-m 0;
  color: $c-aqua-marine;
  border-radius: $base-radius;
  border: 1px solid $c-aqua-marine;
  cursor: pointer;

  &::after {
    @include center;
    width: 100%;
    height: 100%;
    z-index: $z-minus;
    content: "";
    opacity: 0;
    transition: opacity 0.1s ease-out;
    border-radius: $base-radius;
    box-shadow: 0px 0px $s-xl $c-aqua-marine;
  }
  &:hover {
    &::after {
      opacity: 0.2;
    }
  }
}
</style>
