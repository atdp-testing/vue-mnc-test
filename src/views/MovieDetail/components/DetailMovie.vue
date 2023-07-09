<template>
  <div
    class="detail"
    :style="{
      backgroundImage: `url(http://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
    }"
  >
    <div class="detail__visual">
      <img :src="`http://image.tmdb.org/t/p/original/${data?.poster_path}`" />
      <div class="detail__visual--cta">
        <button class="btn">Watch Trailer</button>
      </div>
    </div>
    <div class="detail__overview">
      <h1 class="detail__overview--title">{{ data?.title }}</h1>
      <div class="detail__overview--genre" v-if="data?.genres">
        {{ viewGenre(data?.genres) }} • {{ data.runtime }} min
      </div>
      <div class="detail__overview--sub">Overview</div>
      <p class="detail__overview--subdesc">{{ data?.overview }}</p>
      <div class="detail__overview--sub">Actors</div>
      <p class="detail__overview--subdesc">{{ actors }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailMovie",
  components: {},
  data() {
    return {
      data: {},
      isLoading: false,
      actors: "",
    };
  },
  methods: {
    getData() {
      this.isLoading = true;
      this.$emit("isLoading", true);
      this.$axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${this.$route.params.id}`,
      })
        .then((response) => {
          this.data = response.data;
          setTimeout(() => {
            this.$emit("isLoading", false);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getActors() {
      this.isLoading = true;
      this.$axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits`,
      })
        .then((response) => {
          const actingCast = response.data.cast.filter(
            (cast) => cast.known_for_department === "Acting"
          );
          const limitedArray = actingCast.slice(0, 20);
          const actingCastNames = limitedArray.map((cast) => cast.name);
          this.actors = actingCastNames.join(", ");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    viewGenre(genres) {
      return genres.map((genre) => genre.name).join(", ");
    },
  },
  mounted() {
    this.getData();
    this.getActors();
  },
};
</script>
<style scoped lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 16px;
  background-position: center;
  background-size: cover;
  position: relative;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: 16px;
  }

  &::before {
    content: "";
    border-radius: 16px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  &__visual {
    position: relative;
    width: 100%;

    @media screen and (min-width: 768px) {
      width: 30%;
      padding: 24px;
    }

    &--cta {
      margin-top: 16px;
      text-align: center;
      .btn {
        padding: 12px 24px;
        border-radius: 35px;
        color: #0e0e0e;
        background: #fff;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 16px;
        border: none;
      }
    }
  }

  &__overview {
    width: 100%;
    position: relative;
    color: #fff;
    font-size: 16px;

    @media screen and (min-width: 768px) {
      width: 70%;
      padding: 20px 40px;
      font-size: 18px;
    }

    &--title {
      font-size: 48px;
      margin: 20px 0 0;
    }

    &--genre {
      margin: 0px 0 24px;
    }

    &--sub {
      opacity: 0.7;
    }

    &--subdesc {
      opacity: 1;
    }
  }
}
</style>
