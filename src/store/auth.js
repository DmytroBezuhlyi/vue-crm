import firebase from "firebase/app";

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },
    async logout() {
      await firebase.auth();
    },
    async registration({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUID');
        await firebase.database().ref(`users/${uid}/info`).set({
          name,
          bill: 10000,
        });
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },
    getUID() {
      const user = firebase.auth().currentUser;
      return user.uid || null;
    }
  }
}