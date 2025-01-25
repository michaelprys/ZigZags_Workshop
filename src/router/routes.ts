import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('src/layouts/LayoutMain.vue'),
        children: [{ path: '', component: () => import('pages/PageIndex.vue') }],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('src/pages/PageNotFound.vue'),
    },
];

export default routes;
