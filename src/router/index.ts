import { defineRouter } from '#q-app/wrappers';
import {
    createMemoryHistory,
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useStoreAuth } from 'src/stores/useStoreAuth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
    // const createHistory = process.env.SERVER
    //     ? createMemoryHistory
    //     : process.env.VUE_ROUTER_MODE === 'history'
    //       ? createWebHistory
    //       : createWebHashHistory;
    const createHistory = createWebHistory;

    const Router = createRouter({
        scrollBehavior(to) {
            if (to.hash || to.fullPath === '/') {
                return {
                    el: to.hash || 'body',
                    behavior: 'smooth',
                };
            }
        },
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE),
    });

    Router.beforeEach(async (to, from, next) => {
        const store = useStoreAuth();

        if (!store.session) {
            await store.checkSession();
        }

        const hasInvitation = true;

        if (!store.session) {
            if (
                to.name === 'black-market' ||
                to.name === 'black-market-details'
            ) {
                return next({ name: 'black-market-access' });
            }
            if (to.name === 'vault') {
                return next({ name: 'access-vault' });
            }
            next();
        } else {
            if (
                to.name === 'black-market' ||
                to.name === 'black-market-details'
            ) {
                if (!hasInvitation) {
                    return next({ name: 'black-market-access' });
                }
                next();
            }
            if (to.name === 'access-vault') {
                return next({ name: 'vault' });
            } else {
                next();
            }
        }
    });

    return Router;
});
