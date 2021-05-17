import Vue from "vue";
import { LocalStorage, Loading } from "quasar";
import { firebaseAuth } from "boot/firebase";
import { firebaseDb } from "boot/firebase";
import { showErrorMessage } from "../../../awesome-todo/src/functions/function-show-error-message";

const state = {
  favoriteTeam: "",
  teams: {},
  locations: {},
  location: "seoul",
  chooseLocationCnt: 0,
};

const mutations = {
  addTeam(state, payload) {
    Vue.set(state.teams, payload.teamId, payload.teamDetails);
  },
  addLocations(state, payload) {
    Vue.set(state.locations, payload.locationId, payload.locationDetails);
  },
  clearLocation({ commit }) {
    let locationsTask = state.locations[state.location];
    Object.keys(locationsTask).forEach((task) => {
      locationsTask[task].checked = false;
    });
  },
  selectTeam(state, team) {
    state.teams[team].checked = !state.teams[team].checked;
    if (state.teams[team].checked) {
      state.favoriteTeam = team;
    } else {
      state.favoriteTeam = "";
    }
  },
  selectLocation(state, location) {
    let locationsTask = state.locations[state.location];
    if (location === "all") {
      let flag = !locationsTask[location].checked;

      if (flag) {
        state.chooseLocationCnt = Object.keys(locationsTask).length - 1;
      } else {
        state.chooseLocationCnt = 0;
      }

      Object.keys(locationsTask).forEach((task) => {
        locationsTask[task].checked = flag;
      });
    } else {
      let selectItem = locationsTask[location];
      if (locationsTask["all"]) {
        locationsTask["all"].checked = false;
      }
      selectItem.checked = !selectItem.checked;
      if (selectItem.checked) {
        state.chooseLocationCnt++;
      } else {
        state.chooseLocationCnt--;
      }
    }
  },
};

const actions = {
  selectTeam({ commit }, team) {
    commit("selectTeam", team);
  },
  selectLocation({ commit }, location) {
    commit("selectLocation", location);
  },
  clearLocation({ commit }) {
    commit("clearLocation");
  },
  firebaseGetDefaultInfo({ commit }) {
    let teamTasks = firebaseDb.ref("teams");
    teamTasks.on("child_added", (snapshot) => {
      let teamDetails = snapshot.val();
      let teamId = snapshot.key;
      commit("addTeam", {
        teamId,
        teamDetails,
      });
    });

    let locationTasks = firebaseDb.ref("locations");
    locationTasks.on("child_added", (snapshot) => {
      let locationDetails = snapshot.val();
      let locationId = snapshot.key;
      commit("addLocations", {
        locationId,
        locationDetails,
      });
    });
  },
  firebaseAddUserDetails({ dispatch }, payload) {
    let userId = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref("users/" + userId);
    taskRef.child("favoriteTeam").set(payload.favoriteTeam);
    taskRef.child("activityLocation").set(payload.activityLocation);
    dispatch("auth/handleAuthStateChange", null, { root: true });
  },
};

const getters = {
  tasksSorted: (state) => {
    let locationsTask = state.locations[state.location];
    let tasksSorted = {},
      keysOrdered = Object.keys(locationsTask);

    keysOrdered.sort((a, b) => {
      let taskAProp = locationsTask[a].name.toLowerCase(),
        taskBProp = locationsTask[b].name.toLowerCase();

      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });

    keysOrdered.forEach((key, index) => {
      if (index === 0) {
        tasksSorted["all"] = locationsTask["all"];
      } else if (key !== "all") {
        tasksSorted[key] = locationsTask[key];
      }
    });

    return tasksSorted;
  },
  teamTasks: (state) => {
    return state.teams;
  },
  locationTasks: (state, getters) => {
    return getters.tasksSorted;
  },
  getChooseTeam: (state) => {
    return state.favoriteTeam;
  },
  getChooseLocation: (state) => {
    let locationsTask = state.locations[state.location];
    let chooseLocations = [];
    Object.keys(locationsTask).forEach((key) => {
      if (locationsTask[key].checked) {
        chooseLocations.push(key);
      }
    });
    return chooseLocations;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
