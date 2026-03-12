import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/operation' },
  { path: '/dashboard', redirect: '/sync-server' },
  {
    path: '/sync-server',
    name: 'Sync Server',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: '/devices',
    name: 'Devices',
    component: () => import('@/views/DevicesView.vue'),
  },
  {
    path: '/mirroring',
    name: 'Mirroring',
    component: () => import('@/views/MirroringView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/files',
    name: 'Files',
    component: () => import('@/views/FilesView.vue'),
  },
  {
    path: '/operation',
    name: 'Operation',
    component: () => import('@/views/OperationView.vue'),
  },
  {
    path: '/operation/:roomId/files',
    name: 'FilePlayer',
    component: () => import('@/views/FilePlayerView.vue'),
  },
  {
    path: '/operation/:roomId/movie',
    name: 'MoviePlayer',
    component: () => import('@/views/MoviePlayerView.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
