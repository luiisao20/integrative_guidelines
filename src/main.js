import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes';
// Font Awsome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCirclePlus, faCaretRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';

library.add(faCirclePlus, faCaretRight, faEllipsis);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app');