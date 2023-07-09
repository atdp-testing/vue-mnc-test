import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmFmOGVlYmRkNmNhOWU1M2U4MmFjZDA5YjgxMGY3ZSIsInN1YiI6IjY0YTdkYjg4OTY1MjIwMDEwMDExYWIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRLCwwdHdbP8fujRtzs73w4ZTjkzMKCyRll8ZEFCHUg";

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.use(router);
app.mount("#app");
