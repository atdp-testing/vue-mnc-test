<template>
  <Header />
  <div class="home">
    <NowPlaying />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header";
import NowPlaying from "./components/NowPlaying.vue";

export default {
  name: "HomeView",
  components: {
    NowPlaying,
    Header,
  },
  data() {
    return {
      data: [],
    };
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.home {
  padding: 1.8rem 20px;
  background: #f2f2f2;
}
</style>
