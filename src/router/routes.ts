import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('src/layouts/LayoutMain.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('pages/PageIndex.vue'),
            },
            {
                path: '',
                component: () => import('src/layouts/LayoutVault.vue'),
                children: [
                    {
                        path: 'access-vault',
                        name: 'access-vault',
                        component: () => import('pages/PageAccessVault.vue'),
                        // beforeEnter(to, from, next) {
                        //     console.log('vault beforeEnter');
                        //     console.log('to: ', to, 'from: ', from);
                        //     next();
                        // },
                    },
                    {
                        path: 'setup-vault',
                        name: 'setup-vault',
                        component: () => import('pages/PageSetUpVault.vue'),
                    },
                    {
                        path: 'vault',
                        name: 'vault',
                        component: () => import('pages/PageVault.vue'),
                    },
                ],
            },
            {
                path: 'guide',
                name: 'guide',
                component: () => import('src/pages/PageGuide.vue'),
            },
            {
                path: 'workshop',
                name: 'workshop',
                component: () => import('pages/PageWorkshop.vue'),
            },
            {
                path: 'workshop/:id',
                name: 'item-details',
                component: () => import('pages/PageItemDetails.vue'),
                meta: { section: 'workshop' },
            },
            {
                path: 'stash',
                name: 'stash',
                component: () => import('pages/PageStash.vue'),
            },
            {
                path: 'market-access',
                name: 'market-access',
                component: () => import('pages/PageMarketAccess.vue'),
            },
            {
                path: 'black-market',
                name: 'black-market',
                component: () => import('pages/PageBlackMarket.vue'),
                beforeEnter: (to, from, next) => {
                    // next({ name: 'market-access' });
                    next();
                },
            },
            {
                path: 'merchant',
                name: 'merchant',
                meta: { requiresAuth: true },
                component: () => import('pages/PageMerchant.vue'),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        name: 'not-found',
        component: () => import('src/pages/PageNotFound.vue'),
    },
];

export default routes;
