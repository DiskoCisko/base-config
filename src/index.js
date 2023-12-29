import { createApp } from 'vue';
import App from './App.vue';
import { router } from './route.js';
import { store } from './store.js';
import './main.scss';

import {COLORS} from '@shared/lib';


const div = document.createElement('div');
div.id = 'root';
document.body.appendChild(div);
document.body.style.setProperty('--primary-color', COLORS.default);
document.body.style.setProperty('--secondary-color', COLORS.secondary);
document.body.style.setProperty('--error-color', COLORS.error);
document.body.style.setProperty('--light-color', COLORS.light);
document.body.style.setProperty('--additional-color', COLORS.additional);


const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#root');