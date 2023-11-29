import './assets/main.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// App Vue
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes';
// Font Awsome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCirclePlus, faCaretRight, faEllipsis, faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// Firebase config
import { firebaseConfig } from '../firebase.js';

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

library.add(faCirclePlus, faCaretRight, faEllipsis, faArrowLeft, faEye, faEyeSlash);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app');

export { db }