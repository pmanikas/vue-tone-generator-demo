<script>
import ImageResource from "./ImageResource";
import LogoImage from "./../images/sine-wave-tone-generator-logo.png";
export default {
  name: "Logo",
  components: { ImageResource },
  data() {
    return {
      LogoImage,
    };
  },
};
</script>

<template>
  <ImageResource class="logo" :src="LogoImage" alt="Tone Generator Logo" />
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

.logo {
  width: $s-xxl;
  margin-right: $s-l;
}
</style>
