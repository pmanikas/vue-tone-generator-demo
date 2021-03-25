<script>
import ToneGenerator from "./components/ToneGenerator";
import("./styles/style.scss");

export default {
  name: "App",
  components: { ToneGenerator },
};
</script>

<template>
  <div class="app">
    <ToneGenerator />
  </div>
</template>

<style lang="scss">
@use "./styles/design" as *;

.app {
  padding: $s-m;
  margin: $s-xxl auto;
}

body {
  background: $c-mine-shaft;
  color: $c-silver;
}

@include desktop {
  .app {
    width: $tablet;
  }
}
</style>
