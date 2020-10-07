import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    activeIndex: 0
  },
  getters: {
    token(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    }
  },
  mutations: {
    resetToken(state) {
      state.token = null;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    resetUser(state) {
      state.user = null;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    closeLoginOut(state) {
      state.isshowLoginState = false;
    }
  },
  actions: {
    resetToken(content) {
      content.commit("resetToken");
    },
    resetUser(content) {
      content.commit("resetUser");
    }
  },
  modules: {}
});
