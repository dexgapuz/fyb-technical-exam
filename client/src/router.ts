import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

import NotFound from './pages/NotFound.vue';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import DefaultLayout from './layouts/DefaultLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [{ path: '', name: 'Home', component: Home }],
  },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
