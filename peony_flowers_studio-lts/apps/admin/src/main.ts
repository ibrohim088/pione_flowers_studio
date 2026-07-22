import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import { autofocus } from './directives/autofocus';
import './assets/styles/main.scss';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.directive('autofocus', autofocus);
app.mount('#app');
