import { createRouter, createWebHistory } from 'vue-router';
import GuideThree from './views/GuideThree.vue';
import GuideOne from './views/GuideOne.vue';
import GuideTwo from './views/GuideTwo.vue';
import GuideFour from './views/GuideFour.vue';
import GuideFive from './views/GuideFive.vue';
import GuideSix from './views/GuideSix.vue';
import GuideSeven from './views/GuideSeven.vue';
import GuideEight from './views/GuideEight.vue';

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
        path: '/guidetwo',
        component: GuideTwo
    },
    {
        path: '/guidefour',
        component: GuideFour
    },
    {
        path: '/guidefive',
        component: GuideFive
    },
    {
        path: '/guidesix',
        component: GuideSix
    },
    {
        path: '/guideseven',
        component: GuideSeven
    },
    {
        path: '/',
        component: GuideEight
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export { router };