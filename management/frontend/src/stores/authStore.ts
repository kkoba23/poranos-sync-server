import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { poranosPost } from '@/api/poranos'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const isAuthenticated = ref(false)
  const initialized = ref(false)
  const error = ref('')

  const userEmail = computed(() => user.value?.email || '')

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
    const auth = getAuth()
    await signOut(auth)
    localStorage.removeItem('idToken')
    user.value = null
    isAuthenticated.value = false
  }

  function initAuth(): Promise<void> {
    return new Promise((resolve) => {
      const auth = getAuth()
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          user.value = firebaseUser
          isAuthenticated.value = true
          try {
            const token = await firebaseUser.getIdToken()
            localStorage.setItem('idToken', token)
          } catch { /* ignore */ }
        } else {
          user.value = null
          isAuthenticated.value = false
        }
        initialized.value = true
        resolve()
      })
    })
  }

  return { user, isAuthenticated, initialized, error, userEmail, login, logout, initAuth }
})
