<script>
export default {
  name: "Logo",
};
</script>

<template>
  <header>
    <img
      class="logo"
      src="images/sine-wave-tone-generator-logo.png"
      alt="Tone Generator Logo"
    />
  </header>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

.logo {
  width: $s-xxl;
  margin-right: $s-l;
}
</style>
