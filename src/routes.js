import { createRouter, createWebHistory } from 'vue-router';
import GuideThree from './views/GuideThree.vue';
import GuideOne from './views/GuideOne.vue';
import GuideTwo from './views/GuideTwo.vue';

const routes = [
    {
        path: '/guidethree',
        component: GuideThree
    },
    {
        path: '/guideOne',
        component: GuideOne
    },
    {
        path: '/',
        component: GuideTwo
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export { router };