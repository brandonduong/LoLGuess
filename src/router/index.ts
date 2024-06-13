import { createRouter, createWebHistory } from "vue-router";
const GameView = () => import("../views/GameView.vue");
const LeaderboardView = () => import("../views/LeaderboardView.vue");
const ProfileView = () => import("../views/ProfileView.vue");
const SupportersView = () => import("../views/SupportersView.vue");
const HomeView = () => import("../views/HomeView.vue");
const DailyView = () => import("../views/DailyView.vue");
const LoginView = () => import("../views/LoginView.vue");
const UpdatesView = () => import("../views/UpdatesView.vue");
const NotFoundView = () => import("../views/NotFoundView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/play",
      name: "play",
      component: GameView,
    },
    {
      path: "/play/:guessId",
      name: "replay",
      component: GameView,
      props: true,
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LeaderboardView,
    },
    {
      path: "/profile/:sub",
      name: "profile",
      component: ProfileView,
      props: true,
    },
    {
      path: "/supporters",
      name: "supporters",
      component: SupportersView,
    },
    {
      path: "/",
      name: "home",
      alias: "/",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/updates",
      name: "updates",
      component: UpdatesView,
    },
    {
      path: "/daily/:date?/:category?",
      name: "daily",
      component: DailyView,
      props: true,
    },
    {
      path: "/404",
      component: NotFoundView,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundView,
    },
  ],
});

export default router;
