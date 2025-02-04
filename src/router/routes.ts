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
                name: 'workshop-details',
                component: () => import('pages/PageWorkshopDetails.vue'),
                meta: { section: 'workshop' },
            },
            {
                path: 'stash',
                name: 'stash',
                component: () => import('pages/PageStash.vue'),
            },
            {
                path: 'black-black-market-access',
                name: 'black-black-market-access',
                component: () => import('src/pages/PageBlackMarketAccess.vue'),
            },
            {
                path: 'black-market',
                name: 'black-market',
                component: () => import('pages/PageBlackMarket.vue'),
            },
            {
                path: 'black-market-details/:id',
                name: 'black-market-details',
                component: () => import('pages/PageBlackMarketDetails.vue'),
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
