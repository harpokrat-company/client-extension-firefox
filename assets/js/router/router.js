import Vue from 'vue';
import Router from 'vue-router';

import Login from '../pages/Login.vue';
import Passwords from '../pages/Passwords.vue';

Vue.use(Router);

export default new Router({
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
        path: '/passwords',
        name: 'passwords',
        component: Passwords
    },
    {
      path: '/',
      name: 'home',
      redirect: '/login',
    },

  ],
});
