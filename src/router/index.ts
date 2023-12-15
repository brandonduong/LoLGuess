import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/play",
      name: "play",
      component: () => import("../views/GameView.vue"),
    },
    {
      path: "/play/:guessId",
      name: "replay",
      component: () => import("../views/GameView.vue"),
      props: true,
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
      path: "/",
      name: "home",
      alias: "/",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/updates",
      name: "updates",
      component: () => import("../views/UpdatesView.vue"),
    },
    {
      path: "/404",
      component: () => import("../views/NotFoundView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
