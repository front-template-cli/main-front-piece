import { RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    component: () => import('../views/home/index.vue'),
    name: 'Home',
    path: '/home'
  }
]
