import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: () => {
      try {
        const raw = localStorage.getItem('poranos-settings')
        if (raw) {
          const s = JSON.parse(raw)
          if (s.uiMode === 'advance') return '/operation'
        }
      } catch { /* ignore */ }
      return '/portable'
    },
  },
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
    component: () => import('@/views/OperationLayout.vue'),
    children: [
      {
        path: '',
        name: 'Operation',
        component: () => import('@/views/OperationView.vue'),
      },
      {
        path: ':roomId/files',
        name: 'FilePlayer',
        component: () => import('@/views/FilePlayerView.vue'),
      },
      {
        path: ':roomId/movie',
        name: 'MoviePlayer',
        component: () => import('@/views/MoviePlayerView.vue'),
      },
    ],
  },
  {
    path: '/portable',
    name: 'Portable',
    component: () => import('@/views/PortableView.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
