import { createRouter as createVueRouter } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound,
    },
];

// History is passed in: web history in the browser, memory history when prerendering
export const createRouter = (history) => createVueRouter({ history, routes });
