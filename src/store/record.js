import firebase from "firebase/app";

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUID');

        return await firebase.database().ref(`/users/${uid}/records`).push(record);
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUID');
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};

        return Object.keys(records).map(key => ({...records[key], id: key}));
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },
    async fetchRecordByID({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUID');
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {};

        return {...record, id};
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    }
  }
}