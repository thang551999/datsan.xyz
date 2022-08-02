import axios from '@/utils/axios'

export function getNews(params) {
  return axios.get('/article', { params })
}

export function getNewsById(id) {
  return axios.get('/article/' + id)
}
