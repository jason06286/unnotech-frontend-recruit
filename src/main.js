import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';
import './index.css';

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    left: 0,
  });
});

const app = createApp(App);

app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
});
app.use(router);

app.mount('#app');
