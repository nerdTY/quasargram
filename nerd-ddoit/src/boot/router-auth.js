import { LocalStorage } from "quasar";

export default ({ router }) => {
  // something to do
  router.beforeEach((to, from, next) => {
    if (!to.path.includes("auth")) {
      let loggedIn = LocalStorage.getItem("loggedIn");
      if (!loggedIn && to.path !== "/auth") {
        next("/auth");
      } else {
        next();
      }
    } else {
      next();
    }
  });
};
