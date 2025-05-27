import { defineRouter } from '#q-app/wrappers';
import { useStoreAuth } from 'src/stores/storeAuth';
import { useStoreInventory } from 'src/stores/storeInventory';
// import { delay } from 'src/utils/delay';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

export default defineRouter(function () {
    const createHistory = createWebHistory;

    const Router = createRouter({
        scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                return {
                    el: to.hash,
                    behavior: 'smooth'
                };
            }

            // if (to.query.page) {
            //     return { top: savedPosition ? savedPosition.top : 0 };
            // }

            // if (to.path === from.path) {
            //     return { top: 0, behavior: 'smooth' };
            // }

            // if (savedPosition) {
            //     return savedPosition;
            // } else {
            //     return { x: 0, y: 0 };
            // }

            return { top: 0 };
        },
        routes,
        history: createHistory(process.env.VUE_ROUTER_BASE)
    });

    Router.beforeEach(async (to, from, next) => {
        const storeAuth = useStoreAuth();
        const storeInventory = useStoreInventory();

        await storeAuth.checkSession();

        if (!storeAuth.session) {
            if (to.name === 'vault') {
                return next({ name: 'access-vault' });
            }

            if (to.name === 'black-market' || to.name === 'black-market-details') {
                return next({ name: 'black-market-access' });
            }

            return next();
        }

        if (to.name === 'black-market') {
            await storeInventory.checkInvitation();
            if (!storeInventory.invitation || storeInventory.invitation.length === 0) {
                return next({ name: 'black-market-access' });
            }
            return next();
        }

        if (to.name === 'good-details') {
            return next();
        }

        next();
    });

    return Router;
});
