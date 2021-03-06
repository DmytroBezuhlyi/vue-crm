import firebase from "firebase/app";

export default {
  actions: {
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUID');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit});

        return {title, limit, id: category.key};
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },
    async fetchCategories({dispatch, commit}) {
      try {
        const uid = await dispatch('getUID');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};

        return Object.keys(categories).map(key => ({...categories[key], id: key}));
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },
    async fetchCategoryByID({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUID');
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {};

        return {...category, id};
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },
    async updateCategory({dispatch, commit}, {id, title, limit}) {
      try {
        const uid = await dispatch('getUID');
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit});
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    }
  }
}