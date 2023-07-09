<template>
  <Header />
  <div class="isLoading" v-if="isLoading">
    <div class="isLoading__content">
      <img src="@/assets/img/loading.gif" />
      <div>Please wait...</div>
    </div>
  </div>
  <div class="home" :class="{ 'is-loading': isLoading }">
    <!-- <TrandingMovie /> -->
    <DetailMovie ref="detailMovie" @isLoading="loadingView" />
    <Recommendation @refreshData="refreshData" @isLoading="loadingView" />
  </div>
</template>

<script>
// @ is an alias to /src
import DetailMovie from "./components/DetailMovie.vue";
import Recommendation from "./components/Recommendation.vue";
import Header from "@/components/Header";

export default {
  name: "HomeView",
  components: {
    DetailMovie,
    Recommendation,
    Header,
  },
  data() {
    return {
      data: [],
      isLoading: false,
    };
  },
  methods: {
    refreshData() {
      this.$refs.detailMovie.getData();
      this.$refs.detailMovie.getActors();
    },
    loadingView(data) {
      this.isLoading = data;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.home {
  padding: 1rem 20px 1.8rem;
}

.is-loading {
  display: none;
}

.isLoading {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100vw;
  // position: absolute;
  // top: 0;
  // left: 0;
  // background-color: #fff;
  // z-index: 2;

  &__content {
    img {
      width: 120px;
      margin-bottom: -20px;
    }
  }
}
</style>
