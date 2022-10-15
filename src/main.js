import { createApp } from 'vue';

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

app.use(router);

app.mount('#app');
