import axios from '@/utils/axios'

export function getPlace() {
  return axios.get('/place/type-place')
}

export function getPlaceById(id) {
  return axios.get('/place/' + id)
}

export function getTime(id, params) {
  return axios.get('/place/available/' + id, { params })
}

export function createComment(data) {
  return axios.post('/comment', data)
}
