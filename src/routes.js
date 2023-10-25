import { createRouter, createWebHistory } from 'vue-router';
import GuideThree from './views/Guides/GuideThree.vue';
import GuideOne from './views/Guides/GuideOne.vue';
import GuideTwo from './views/Guides/GuideTwo.vue';
import GuideFour from './views/Guides/GuideFour.vue';
import GuideFive from './views/Guides/GuideFive.vue';
import GuideSix from './views/Guides/GuideSix.vue';
import GuideSeven from './views/Guides/GuideSeven.vue';
import GuideEight from './views/Guides/GuideEight.vue';
import Patients from './views/Patients.vue';
import CreatePatient from './views/Patients/CreatePatient.vue';
import PatientThree from './views/Patients/PatientThree.vue';
import PatientData from './views/Patients/PatientData.vue';
import PatientOne from './views/Patients/PatientOne.vue';
import PatientTwo from './views/Patients/PatientTwo.vue';
import PatientFour from './views/Patients/PatientFour.vue';
import PatientFive from './views/Patients/PatientFive.vue';
import PatientSix from './views/Patients/PatientSix.vue';
import PatientSeven from './views/Patients/PatientSeven.vue';
import PatientEight from './views/Patients/PatientEight.vue';

const routes = [
    {
        path: '/create/patient',
        component: CreatePatient
    },
    {
        path: '/create/guidethree/:id',
        component: GuideThree,
        props: true
    },
    {
        path: '/create/guideOne/:id',
        component: GuideOne,
        props: true
    },
    {
        path: '/create/guidetwo/:id',
        component: GuideTwo,
        props: true
    },
    {
        path: '/create/guidefour/:id',
        component: GuideFour,
        props: true
    },
    {
        path: '/create/guidefive/:id',
        component: GuideFive,
        props: true
    },
    {
        path: '/create/guidesix/:id',
        component: GuideSix,
        props: true
    },
    {
        path: '/create/guideseven/:id',
        component: GuideSeven,
        props: true
    },
    {
        path: '/create/guideeight/:id',
        component: GuideEight,
        props: true
    },
    {
        path: '/:id',
        component: Patients,
        props: true,
        children: [
            {
                path: 'data',
                component: PatientData,
            },
            {
                path: 'guideone',
                component: PatientOne,
            },
            {
                path: 'guidetwo',
                component: PatientTwo,
            },
            {
                path: 'guidethree',
                component: PatientThree,
            },
            {
                path: 'guidefour',
                component: PatientFour,
            },
            {
                path: 'guidefive',
                component: PatientFive,
            },
            {
                path: 'guidesix',
                component: PatientSix,
            },
            {
                path: 'guideseven',
                component: PatientSeven,
            },
            {
                path: 'guideeight',
                component: PatientEight,
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export { router };