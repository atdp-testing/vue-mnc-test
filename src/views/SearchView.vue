<template>
  <Header @refreshData="refreshData" />
  <div class="isLoading" v-if="isLoading">
    <div class="isLoading__content">
      <img src="@/assets/img/loading.gif" />
      <div>Please wait...</div>
    </div>
  </div>
  <div class="home" :class="{ 'is-loading': isLoading }">
    <div class="result" v-if="data && data.length > 0">
      <div class="heading">Result</div>
      <div class="row">
        <div class="col-md-4 col-12" v-for="movie in data" :key="movie.id">
          <div class="movie-card">
            <div class="movie-card__poster">
              <img
                :src="
                  `https://image.tmdb.org/t/p/original/` + movie.poster_path
                "
                v-if="movie.poster_path"
              />
              <img src="@/assets/img/noimage.jpg" alt="" v-else />
            </div>
            <div class="movie-card__content">
              <div class="movie-card__content--title">{{ movie.title }}</div>
              <div class="movie-card__content--desc">
                {{ movie.overview }}
              </div>
              <router-link :to="`/movie/${movie.id}`" class="btn"
                >Detail Movie</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nodata" v-else>
      <img src="@/assets/img/no-data.png" />
      <div>
        There were no results matching your search "{{ $route.query.q }}".
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "HomeView",
  components: {
    Header,
  },
  data() {
    return {
      data: [],
      isLoading: true,
    };
  },
  methods: {
    getData(query) {
      this.isLoading = true;
      this.$axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
      })
        .then((response) => {
          console.log(response.data.results);
          this.data = response.data.results;
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    refreshData(query) {
      this.getData(query);
    },
  },
  mounted() {
    var query = this.$route.query.q;
    if (query) {
      this.getData(query);
    } else {
      this.$router.push("/");
    }

    console.log(this.$route.path);
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 1.8rem 20px 1.8rem;
  background: #f2f2f2;
}

.is-loading {
  display: none;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
  .col-md-4.col-12 {
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .col-md-4.col-12 {
      width: 20%;
    }
  }
}

.isLoading {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100vw;

  &__content {
    img {
      width: 120px;
      margin-bottom: -20px;
    }
  }
}

.heading {
  font-size: 32px;
  font-weight: 700;
  margin-left: 12px;
}

.nodata {
  font-size: 18px;
  text-align: center;
  margin-top: 3rem;

  img {
    width: 100px;
    margin-bottom: 16px;
  }
}

.movie-card {
  background: #fff;
  border-radius: 0 0 8px 8px;
  margin: 8px;
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
