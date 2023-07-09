<template>
  <div class="heading">Now Playing Movie</div>
  <div v-if="isLoading">
    <Carousel v-bind="settings" :breakpoints="breakpoints">
      <Slide v-for="item in 10" :key="item">
        <div class="carousel__item">
          <img src="@/assets/img/card.jpg" alt="" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
  <div v-else>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
      <Slide v-for="movie in data" :key="movie.id">
        <div class="carousel__item">
          <div class="movie-card">
            <div class="movie-card__poster">
              <img
                :src="
                  `https://image.tmdb.org/t/p/original/` + movie.poster_path
                "
              />
            </div>
            <div class="movie-card__content">
              <div class="movie-card__content--title">{{ movie.title }}</div>
              <div class="movie-card__content--desc">{{ movie.overview }}</div>
              <router-link :to="`/movie/${movie.id}`" class="btn"
                >Detail Movie</router-link
              >
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  name: "NowPlaying",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      data: [],
      isLoading: false,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 5,
          snapAlign: "start",
        },
      },
    };
  },
  methods: {
    getData() {
      this.isLoading = true;
      this.$axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      })
        .then((response) => {
          this.data = response.data.results;
          setTimeout(() => {
            this.isLoading = false;
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style scoped lang="scss">
.heading {
  font-size: 32px;
  font-weight: 700;
  margin-left: 12px;
}

.movie-card {
  background: #fff;
  border-radius: 0 0 8px 8px;
  .movie-card__poster {
    img {
      width: 100%;
      border-radius: 8px 8px 0 0;
    }
  }
  .movie-card__content {
    text-align: center;
    padding: 16px;
    padding-bottom: 32px;

    .movie-card__content--title {
      font-size: 18px;
      font-weight: 700;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 8px;
    }

    .movie-card__content--desc {
      font-size: 16px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 24px;
      min-height: 41px;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 35px;
      color: #fff;
      background: #0015ff;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 14px;
    }
  }
}
</style>

<style>
.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  padding: 5px;
  color: #fff !important;
  background: #00000054;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0px -15px;
  margin-top: -80px;
}

.carousel__prev--disabled,
.carousel__next--disabled {
  display: none !important;
}

@media screen and (min-width: 768px) {
  .carousel__prev,
  .carousel__next {
    margin: 0px 30px;
    margin-top: -80px;
  }
}
</style>
