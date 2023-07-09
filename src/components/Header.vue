<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header">
    <div class="header__brand">
      <router-link to="/">
        <img src="@/assets/img/logo-brand.png" alt="" />
      </router-link>
    </div>
    <div class="header__search">
      <input
        type="text"
        v-model="search"
        placeholder="Search"
        class="header__search--form"
        @keydown="handleSubmit"
      />
      <button class="header__search--btn" @click="searchMovie">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    handleSubmit(event) {
      if (this.search == "") {
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault(); // Menghentikan perilaku default dari tombol Enter
        this.$router.push(`/search?q=${this.search}`);
        if (this.$route.path == "/search") {
          this.$emit("refreshData", this.search);
        }
      }
    },
    searchMovie() {
      if (this.search == "") {
        return;
      } else {
        this.$router.push(`/search?q=${this.search}`);
        if (this.$route.path == "/search") {
          this.$emit("refreshData", this.search);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;

  .header__brand {
    img {
      width: 200px;
    }
  }

  .header__search {
    display: flex;
    align-items: center;

    .header__search--form {
      width: 100px;
      height: 30px;
      border: 1px solid #ccc;
      border-right: 0;
      border-radius: 5px 0 0 5px;
      padding: 0 10px;

      @media screen and (min-width: 768px) {
        width: 220px;
        height: 40px;
      }
    }

    .header__search--btn {
      height: 32px;
      border: 1px solid #ccc;
      border-radius: 0 5px 5px 0;
      padding: 0 8px;

      @media screen and (min-width: 768px) {
        height: 42px;
        padding: 0 16px;
      }
    }
  }
}
</style>
