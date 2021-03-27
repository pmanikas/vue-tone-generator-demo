<script>
import ToneGenerator from "./components/ToneGenerator";
import GithubCard from "./components/GithubCard";
import("./styles/style.scss");

export default {
  name: "App",
  components: { ToneGenerator, GithubCard },
};
</script>

<template>
  <div class="app" scoped>
    <h1 class="title">Tone Generator</h1>
    <ToneGenerator class="content" />
    <h2 class="title">About Developer</h2>
    <GithubCard username="pmanikas" />
  </div>
</template>

<style lang="scss">
@use "./styles/design" as *;

.title {
  text-align: center;
  margin: $s-xxxl;
}

.content {
  position: relative;
  width: 400px;
  max-width: 95%;
  padding: $s-l;
  margin: 0 auto;
  &::before {
    @include center;
    z-index: $z-minus;
    border: 2px solid darken($c-persian-indigo, 15%);
    border-radius: $s-l;
    content: "";
    height: 100%;
    position: absolute;
    width: 100%;
    opacity: 0.6;
  }
}

@include desktop {
  .content {
    width: $tablet;
    padding: $s-xxl;
  }
}
</style>
