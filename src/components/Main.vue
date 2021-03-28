<script>
import ToneGenerator from "./ToneGenerator";
import GithubCard from "./GithubCard";
import("./../styles/style.scss");

export default {
  name: "App",
  components: { ToneGenerator, GithubCard },
};
</script>

<template>
  <main class="main">
    <ToneGenerator class="content" />
    <div class="githubCardSection">
      <h2 class="title">About Developer</h2>
      <GithubCard username="pmanikas" />
    </div>
  </main>
</template>

<style lang="scss">
@use "./../styles/design" as *;

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.githubCardSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: $s-xxl * 3;
}

.title {
  margin-bottom: $s-xl;
}

@include desktop {
  .content {
    width: $tablet;
    padding: $s-xxl;
  }
}
</style>
