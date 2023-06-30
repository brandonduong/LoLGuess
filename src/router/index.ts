import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/play",
      name: "home",
      component: () => import("../views/GameView.vue"),
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LeaderboardView.vue"),
    },
    {
      path: "/profile/:sub",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      props: true,
    },
    {
      path: "/supporters",
      name: "supporters",
      component: () => import("../views/SupportersView.vue"),
    },
    {
      path: "/login",
      name: "login",
      alias: "/",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

export default router;
