
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  console.log('🌐 API_URL:', API_URL)
  console.log('📦 Endpoint:', `${API_URL}${endpoint}`)
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  })

  if (!res.ok) {
    if (res.status === 401) {
      Cookies.remove('token')
      window.location.href = '/login'
    }
    throw new Error(`Lỗi khi gọi API: ${endpoint}`)
  }

  return res.json()
}

// export const getUserProfile = () => fetchWithAuth('/users/me')
// export const getMissions = () => fetchWithAuth('/missions')
// export const getDiary = () => fetchWithAuth('/diary')
// export const getRanking = () => fetchWithAuth('/ranking')
// export const getAll = () => fetchWithAuth('/all')

