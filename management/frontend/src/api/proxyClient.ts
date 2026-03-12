/**
 * Proxy API client — FastAPIの/api/poranos/経由でporanos.comにアクセス
 * Firebase Authトークンを付与し、バックエンドがキャッシュ付きプロキシとして動作
 */
import { getAuth } from 'firebase/auth'

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms),
    ),
  ])
}

async function getAuthHeader(): Promise<Record<string, string>> {
  try {
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
      const token = await withTimeout(user.getIdToken(), 3000)
      return { Authorization: `Bearer ${token}` }
    }
  } catch {
    // offline, timeout, or not authenticated — try localStorage fallback
  }
  const cached = localStorage.getItem('idToken')
  if (cached) {
    return { Authorization: `Bearer ${cached}` }
  }
  return {}
}

export async function proxyGet<T = any>(path: string): Promise<T> {
  const headers = await getAuthHeader()
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)
  try {
    const res = await fetch(path, {
      headers: { ...headers, Accept: 'application/json' },
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`GET ${path}: ${res.status}`)
    return res.json()
  } finally {
    clearTimeout(timeoutId)
  }
}
