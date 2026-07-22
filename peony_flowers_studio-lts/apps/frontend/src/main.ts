import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import { i18n } from './i18n';
import { autofocus } from './directives/autofocus';
import './assets/styles/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.directive('autofocus', autofocus);

app.mount('#app');



// import { createApp } from 'vue';
// import { createPinia } from 'pinia';
// import App from './App.vue';
// import { router } from './router';
// import { i18n } from './i18n';
// import './assets/styles/main.scss';

// const app = createApp(App);

// app.use(createPinia());
// app.use(router);
// app.use(i18n);

// app.mount('#app');
