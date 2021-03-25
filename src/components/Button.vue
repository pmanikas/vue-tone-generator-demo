<script>
export default {
  name: "Button",
};
</script>

<template>
  <button class="button"><slot /></button>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;
</style>
