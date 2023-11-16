import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import OpenAccount from '../views/OpenAccount.vue';
import CloseAccount from '../views/CloseAccount.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/open',
      name: 'open',
      component: OpenAccount
    },
    {
      path: '/close',
      name: 'close',
      component: CloseAccount
    }
  ]
})

export default router
