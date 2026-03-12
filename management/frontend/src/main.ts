import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import './firebase'  // Firebase初期化
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// Firebase Auth の状態を復元してからマウント
const authStore = useAuthStore()
authStore.initAuth().then(() => {
  app.mount('#app')
})
