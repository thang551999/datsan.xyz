import axios from '@/utils/axios'

export function login(data) {
  return axios.post('/auth/login', data)
}

export function getInfor() {
  return axios.get('/auth/me')
}

export function register(data) {
  return axios.post('/auth/register', data)
}
