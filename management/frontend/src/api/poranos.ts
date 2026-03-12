/**
 * poranos.com API client — Firebase Auth token付きでAPIにアクセス
 */
import { getAuth } from 'firebase/auth'

const API_BASE = import.meta.env.VITE_PORANOS_API_URL || 'https://api.poranos.com'

async function getIdToken(): Promise<string> {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')
  return user.getIdToken()
}

export async function poranosGet<T = any>(endpoint: string): Promise<T> {
  const token = await getIdToken()
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  if (res.status === 401) {
    // トークン更新して再試行
    const auth = getAuth()
    const newToken = await auth.currentUser!.getIdToken(true)
    const retry = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${newToken}`,
        Accept: 'application/json',
      },
    })
    if (!retry.ok) throw new Error(`GET ${endpoint}: ${retry.status}`)
    return retry.json()
  }
  if (!res.ok) throw new Error(`GET ${endpoint}: ${res.status}`)
  return res.json()
}

export async function poranosPost<T = any>(endpoint: string, body?: any): Promise<T> {
  const token = await getIdToken()
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`POST ${endpoint}: ${res.status}`)
  return res.json()
}
