import { LocalStorage, Loading } from "quasar";
import { firebaseAuth } from "boot/firebase";
import { firebaseDb } from "boot/firebase";

const state = {
  loggedIn: false,
  email: "",
  emailError: false,
  password: "",
  nickname: "",
  isLoginError: false,
};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
  setEmailError(state, value) {
    state.emailError = value;
  },
  setEmail(state, email) {
    state.email = email;
  },
  setPassword(state, pw) {
    state.password = pw;
  },
  setNickname(state, nickname) {
    state.nickname = nickname;
  },
  clearState(state) {
    state.email = "";
    state.emailError = false;
    state.password = "";
    state.nickname = "";
  },
  setLoginError(state, val) {
    state.isLoginError = val;
  },
};

const actions = {
  clearState({ commit }) {
    commit("clearState");
  },
  setEmail({ commit }, email) {
    commit("setEmail", email);
  },
  setPassword({ commit }, pw) {
    commit("setPassword", pw);
  },
  setNickname({ commit }, nickname) {
    commit("setNickname", nickname);
  },
  registerCheckEmail({ commit }, email) {
    firebaseAuth
      .fetchSignInMethodsForEmail(email)
      .then((response) => {
        if (response.length) {
          commit("setEmailError", true);
        } else {
          commit("setEmailError", false);
        }
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  registerUser({}, payload) {
    Loading.show();
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((respone) => {
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).set({
          email: payload.email,
          nickname: payload.nickname,
          termsUse: payload.termsUse,
          termsIndividual: payload.termsIndividual,
          termsThirdparty: payload.termsThirdparty,
        });
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  loginUser({ dispatch }, payload) {
    Loading.show();
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((respone) => {
        console.log("response : ", respone);
      })
      .catch((error) => {
        Loading.hide();
        dispatch("setLoginError", true);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged((user) => {
      Loading.hide();
      if (user) {
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).once("value", (snapshot) => {
          let userDetail = snapshot.val();
          if (!userDetail.termsUse || !userDetail.termsIndividual) {
            this.$router.replace("/auth/register3").catch((err) => {});
          } else if (!userDetail.favoriteTeam) {
            this.$router.replace("/authDetail").catch((err) => {});
            dispatch("authDetail/firebaseGetDefaultInfo", null, { root: true });
          } else {
            commit("setLoggedIn", true);
            LocalStorage.set("loggedIn", true);
            this.$router.push("/").catch((err) => {});
          }
        });
      } else {
        commit("clearState");
        commit("setLoggedIn", false);
        LocalStorage.set("loggedIn", false);
        this.$router.replace("/auth").catch((err) => {});
      }
    });
  },
  setLoginError({ commit }, val) {
    commit("setLoginError", val);
  },
};

const getters = {
  getEmailAlreadyExist: (state) => {
    return state.emailError;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
