import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import PostAdd from '../views/PostAdd.vue'

import { getAuth } from "firebase/auth";


Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/postadd',
    name: 'PostAdd',
    component: PostAdd,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const guest = to.matched.some(record => record.meta.guest);
  if (requiresAuth && !getAuth().currentUser) {
    next('login');
  } else {
    next();
  }

  if (guest && getAuth().currentUser) {
    next('/');
  } else {
    next();
  }

})



export default router
