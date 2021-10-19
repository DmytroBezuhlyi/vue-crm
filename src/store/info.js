import firebase from "firebase/app";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUID');
        const updateData = {...getters.info, ...toUpdate};
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);
        commit('setInfo', updateData);
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUID');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('setInfo', info);
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },
  },
  getters: {
    info: s => s.info,
  }
}