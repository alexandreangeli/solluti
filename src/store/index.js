import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
  },
  getters: {
    loading: (state) => state.loading,
  },
});

export default store;
