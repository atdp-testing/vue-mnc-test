import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Homepage/HomeView.vue"),
  },
  {
    path: "/movie/:id",
    name: "detail",
    component: () => import("../views/MovieDetail/MovieView.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/SearchView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
