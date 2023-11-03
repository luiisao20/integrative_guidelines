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
import PatientsList from './views/PatientsList.vue';
import PatientProcesses from './views/Patients/PatientProcesses.vue';
import PatientProcess from './views/Patients/PatientProcess.vue';

const routes = [
    {
        path: '/create/patient',
        component: CreatePatient
    },
    {
        path: '/create/guidethree/:id/:processid',
        component: GuideThree,
        props: true
    },
    {
        path: '/create/guideOne/:id/:processid',
        component: GuideOne,
        props: true
    },
    {
        path: '/create/guidetwo/:id/:processid',
        component: GuideTwo,
        props: true
    },
    {
        path: '/create/guidefour/:id/:processid',
        component: GuideFour,
        props: true
    },
    {
        path: '/create/guidefive/:id/:processid',
        component: GuideFive,
        props: true
    },
    {
        path: '/create/guidesix/:id/:processid',
        component: GuideSix,
        props: true
    },
    {
        path: '/create/guideseven/:id/:processid',
        component: GuideSeven,
        props: true
    },
    {
        path: '/create/guideeight/:id/:processid',
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
                path: 'processes',
                component: PatientProcesses,
                children: [
                    {
                        path: ':processid/guideone',
                        component: PatientOne,
                        props: true
                    },
                    {
                        path: ':processid/guidetwo',
                        component: PatientTwo,
                        props: true
                    },
                    {
                        path: ':processid/guidethree',
                        component: PatientThree,
                        props: true
                    },
                    {
                        path: ':processid/guidefour',
                        component: PatientFour,
                        props: true
                    },
                    {
                        path: ':processid/guidefive',
                        component: PatientFive,
                        props: true
                    },
                    {
                        path: ':processid/guidesix',
                        component: PatientSix,
                        props: true
                    },
                    {
                        path: ':processid/guideseven',
                        component: PatientSeven,
                        props: true
                    },
                    {
                        path: ':processid/guideeight',
                        component: PatientEight,
                        props: true
                    }
                ]
            },
        ]
    },
    {
        path: '/patientslist',
        component: PatientsList
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export { router };