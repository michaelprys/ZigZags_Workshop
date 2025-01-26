import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('src/layouts/LayoutMain.vue'),
        children: [{ path: '', component: () => import('pages/PageIndex.vue') }],
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
