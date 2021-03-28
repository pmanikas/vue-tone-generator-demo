<script>
import Logo from "./Logo";
export default {
  name: "Header",
  components: { Logo },
};
</script>

<template>
  <header>
    <nav class="nav">
      <Logo />
      <h1>Tone Generator</h1>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: $s-xxxl 0 $s-xl;
}
</style>
