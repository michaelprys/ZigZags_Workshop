import { defineRouter } from '#q-app/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import routes from './routes';
import { supabase } from 'src/clients/supabase';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

let localOwner;

export default defineRouter(function (/* { store, ssrContext } */) {
    // const createHistory = process.env.SERVER
    //     ? createMemoryHistory
    //     : process.env.VUE_ROUTER_MODE === 'history'
    //       ? createWebHistory
    //       : createWebHashHistory;
    const createHistory = createWebHistory;

    const Router = createRouter({
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition;
            }

            if (to.hash || to.fullPath === '/') {
                return {
                    el: to.hash || 'body',
                    behavior: 'smooth',
                };
            }

            return { left: 0, top: 0 };
        },
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE),
    });

    const getUser = async (next) => {
        localOwner = await supabase.auth.getSession();

        if (localOwner.data.session === null) {
            next({ name: 'access-vault' });
        } else {
            next();
        }
    };

    Router.beforeEach(async (to, from, next) => {
        if (to.meta.requiresAuth) {
            await getUser(next);
        } else {
            next();
        }
    });

    return Router;
});
