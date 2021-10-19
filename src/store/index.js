import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth';
import info from "@/store/info";
import category from "@/store/category";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, err) {
      state.error = err;
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    getError(state) {
      return state.error;
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&format=1&symbols=USD,EUR,UAH`)
      return await res.json();
    },
  },
  modules: {
    auth, info, category
  }
})
