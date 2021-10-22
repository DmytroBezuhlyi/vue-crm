import Vue from 'vue'
import {Vuelidate} from "vuelidate";
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import messagePlugin from '@/utils/message.plugin';
import Loader from "@/components/app/Loader";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.component('Loader', Loader);

let app;

firebase.initializeApp({
  apiKey: "AIzaSyBCaGKb6xIAmkYMFj5P_y89XghegGp3su4",
  authDomain: "vue-crm-4012a.firebaseapp.com",
  projectId: "vue-crm-4012a",
  storageBucket: "vue-crm-4012a.appspot.com",
  messagingSenderId: "1011735178135",
  appId: "1:1011735178135:web:82e03243d331e4fef7f2d2",
  databaseURL: "https://vue-crm-4012a-default-rtdb.europe-west1.firebasedatabase.app/",
})

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
