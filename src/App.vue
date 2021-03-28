<script>
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import("./styles/style.scss");

export default {
  name: "App",
  components: { Header, Main, Footer },
};
</script>

<template>
  <div class="app" scoped>
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@use "./styles/design" as *;
</style>
