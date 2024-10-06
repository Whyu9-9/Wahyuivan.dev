import { createRouter, createWebHistory } from 'vue-router';
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

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    // This is where we send page views to Google Analytics
    if (window.gtag) {
        window.gtag('config', import.meta.env.VITE_GA_ID, {
            page_path: to.fullPath,
        });
    }
});

export default router;
