<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import("./styles/style.scss");

export default {
  name: "App",
  components: { Header, Footer },
};
</script>

<template>
  <div class="app" scoped>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@use "./styles/design" as *;
</style>
