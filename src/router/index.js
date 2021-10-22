import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Home')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Categories')
  },
  {
    path: '/detail/:id',
    name: 'DetailRecord',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/DetailRecord')
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/History')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Planning')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Profile')
  },
  {
    path: '/record',
    name: 'Record',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Record')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const isAuth = to.matched.some(r => r.meta.auth);

  if (isAuth && !currentUser) {
    next('/login?message=login');
  } else {
    next();
  }
});

export default router
