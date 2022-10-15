import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@/pages/index.vue';

const routes = [
  {
    path: '/books',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Home',
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
