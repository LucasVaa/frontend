import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import OpenAccount from "../views/OpenAccount.vue";
import CloseAccount from "../views/CloseAccount.vue";

import store from '../store'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
            component: Login,
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: { requiresAuth: true },
        },
        {
            path: "/open",
            name: "open",
            component: OpenAccount,
            meta: { requiresAuth: true },
        },
        {
            path: "/close",
            name: "close",
            component: CloseAccount,
            meta: { requiresAuth: true },
        },
    ],
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.state.isLoggedIn;
    if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
        next({ path: "/" });
    } else {
        next();
    }
});

export default router;
