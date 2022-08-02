import axios from '@/utils/axios';

export function getAddress(params) {
  return axios.get('/address', { params });
}

export function search(params) {
  return axios.get('/place', { params });
}
