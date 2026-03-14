import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { poranosPost } from '@/api/poranos'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const isAuthenticated = ref(false)
  const initialized = ref(false)
  const error = ref('')

  const userEmail = computed(() => user.value?.email || localStorage.getItem('userEmail') || '')

  async function login(email: string, password: string) {
    error.value = ''
    try {
      const auth = getAuth()
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const token = await cred.user.getIdToken(true)
      localStorage.setItem('idToken', token)

      // Django側にも通知
      try {
        await poranosPost('/login/', { idToken: token })
      } catch {
        // ログイン通知失敗は無視（APIアクセスはトークンで可能）
      }

      user.value = cred.user
      isAuthenticated.value = true
      if (cred.user.email) localStorage.setItem('userEmail', cred.user.email)
    } catch (e: any) {
      switch (e.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
          error.value = 'メールアドレスまたはパスワードが正しくありません'
          break
        case 'auth/too-many-requests':
          error.value = 'ログイン試行が多すぎます。しばらくお待ちください'
          break
        default:
          error.value = e.message || 'ログインに失敗しました'
      }
      throw e
    }
  }

  async function logout() {
    // iframe内のporanos.comもログアウト
    const manualIframe = document.querySelector('.manual-iframe') as HTMLIFrameElement | null
    if (manualIframe?.contentWindow) {
      manualIframe.contentWindow.postMessage({ type: 'poranos-auth-logout' }, 'https://poranos.com')
    }

    const auth = getAuth()
    await signOut(auth)
    localStorage.removeItem('idToken')
    localStorage.removeItem('userEmail')
    user.value = null
    isAuthenticated.value = false
  }

  function initAuth(): Promise<void> {
    return new Promise((resolve) => {
      let resolved = false
      const done = () => { if (!resolved) { resolved = true; resolve() } }

      const auth = getAuth()
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          user.value = firebaseUser
          isAuthenticated.value = true
          if (firebaseUser.email) localStorage.setItem('userEmail', firebaseUser.email)
          try {
            const token = await firebaseUser.getIdToken()
            localStorage.setItem('idToken', token)
          } catch { /* ignore */ }
        } else {
          user.value = null
          isAuthenticated.value = false
        }
        initialized.value = true
        done()
      })

      // Offline fallback: don't block app mount waiting for Firebase
      setTimeout(() => {
        if (!resolved) {
          const cachedToken = localStorage.getItem('idToken')
          if (cachedToken) {
            isAuthenticated.value = true
          }
          initialized.value = true
          done()
        }
      }, 3000)
    })
  }

  return { user, isAuthenticated, initialized, error, userEmail, login, logout, initAuth }
})
