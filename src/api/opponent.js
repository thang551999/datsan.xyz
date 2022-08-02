import axios from '@/utils/axios';

export function createFindOpponent(data) {
  return axios.post('/find-competitor', data);
}
export function findOpponent(params) {
  return axios.get('/find-competitor', { params });
}
