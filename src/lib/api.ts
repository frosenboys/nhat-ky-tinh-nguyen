import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = Cookies.get('token')

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    credentials: 'include',
  })

  if (!res.ok) {
    if (res.status === 401) {
      Cookies.remove('token')
      window.location.href = '/login'
    }
  }

  return res.json()
}

export async function fetchWOA(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error(`Lỗi khi gọi API: ${endpoint}`)
  }

  return res.json()
}