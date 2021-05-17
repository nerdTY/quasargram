const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageMatch.vue") },
      { path: "/myClub", component: () => import("pages/PageMyClub.vue") },
      { path: "/listClub", component: () => import("pages/PageListClub.vue") },
      { path: "/chat", component: () => import("pages/PageChat.vue") },
      { path: "/me", component: () => import("pages/PageMe.vue") },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/Login/LoginMainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/login/PageAuthMain.vue") },
      {
        path: "/auth/register1",
        name: "register1",
        component: () => import("pages/login/PageAuthRegisterEmail.vue"),
      },
      {
        path: "/auth/register2",
        name: "register2",
        component: () => import("pages/login/PageAuthRegisterPassword.vue"),
      },
      {
        path: "/auth/register3",
        name: "register3",
        component: () => import("pages/login/PageAuthRegisterNickname.vue"),
      },
      {
        path: "/auth/terms/:division",
        name: "terms",
        component: () => import("pages/login/PageAuthRegisterTerms.vue"),
        props: true,
      },
      {
        path: "/auth/login",
        name: "login",
        component: () => import("pages/login/PageAuthLogin.vue"),
      },
    ],
  },
  {
    path: "/authDetail",
    component: () => import("layouts/Login/LoginMainLayoutSub"),
    children: [
      {
        path: "",
        name: "register4",
        component: () => import("pages/login/PageAuthUserFavoriteTeam"),
      },
      {
        path: "/authDetail/location",
        name: "register5",
        component: () => import("pages/login/PageAuthUserActivityLocation"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
