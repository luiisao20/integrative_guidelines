import { createRouter, createWebHistory } from 'vue-router';
import GuideThree from './views/Guides/GuideThree.vue';
import GuideOne from './views/Guides/GuideOne.vue';
import GuideTwo from './views/Guides/GuideTwo.vue';
import GuideFour from './views/Guides/GuideFour.vue';
import GuideFive from './views/Guides/GuideFive.vue';
import GuideSix from './views/Guides/GuideSix.vue';
import GuideSeven from './views/Guides/GuideSeven.vue';
import GuideEight from './views/Guides/GuideEight.vue';
import CreateDiagnosis from './views/Guides/CreateDiagnosis.vue';
import Patients from './views/Patients.vue';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Test from './views/Test.vue';
import Profile from './views/Profile.vue';
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
import Psychodiagnosis from './views/Patients/Psychodiagnosis.vue';
import Diagnosis from './views/Patients/Diagnosis.vue';
import Biography from './views/Patients/Biography.vue';
import Consent from './views/Patients/Consent.vue';
import RegisterUser from './views/Admin/RegisterUser.vue';
import UserInfo from './views/Profile/UserInfo.vue';
import Password from './views/Profile/Password.vue';
import Payments from './views/Profile/Payments.vue';
import Confidentiality from './views/Profile/Confidentiality.vue';
import Mail from './views/Profile/Mail.vue';
import UsersList from './views/Admin/UsersList.vue';

const routes = [
    {
        path: '/',
        component: Login,
        name: 'Login'
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/test',
        component: Test,
    },
    {
        path: '/profile',
        component: Profile,
        children: [
            {
                path: 'info',
                component: UserInfo,
            },
            {
                path: 'password',
                component: Password,
            },
            {
                path: 'payments',
                component: Payments,
            },            
            {
                path: 'mail',
                component: Mail,
            },
            {
                path: 'register',
                component: RegisterUser
            },
            {
                path: 'users',
                component: UsersList,
            },
            {
                path: 'confidentiality',
                component: Confidentiality,
            },
        ]
    },
    {
        path: '/create/patient',
        component: CreatePatient
    },
    {
        path: '/create/psychodiagnosis/:id',
        component: CreateDiagnosis,
        props: true
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
                path: 'process/:processid',
                component: PatientProcess,
                props: true,
                children: [
                    {
                        path: 'guideone',
                        component: PatientOne,
                        props: true
                    },
                    {
                        path: 'guidetwo',
                        component: PatientTwo,
                        props: true
                    },
                    {
                        path: 'guidethree',
                        component: PatientThree,
                        props: true
                    },
                    {
                        path: 'guidefour',
                        component: PatientFour,
                        props: true
                    },
                    {
                        path: 'guidefive',
                        component: PatientFive,
                        props: true
                    },
                    {
                        path: 'guidesix',
                        component: PatientSix,
                        props: true
                    },
                    {
                        path: 'guideseven',
                        component: PatientSeven,
                        props: true
                    },
                    {
                        path: 'guideeight',
                        component: PatientEight,
                        props: true
                    }
                ]
            },
            {
                path: 'processes',
                component: PatientProcesses,
            },
            {
                path: 'psychodiagnosis',
                component: Psychodiagnosis
            },
            {
                path: 'biography',
                component: Biography
            },
            {
                path: 'consent',
                component: Consent
            },
            {
                path: 'diagnosis/:diagnosisid',
                component: Diagnosis,
                props: true,
            }
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