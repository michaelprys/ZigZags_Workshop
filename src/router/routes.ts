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
                path: 'our-story',
                name: 'our-story',
                component: () => import('pages/PageOurStory.vue'),
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
