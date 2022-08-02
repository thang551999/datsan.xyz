import axios from '@/utils/axios'

export function order(data) {
  return axios.post('/order', data)
}

export function applyVoucher(data) {
  return axios.post('/order/apply/voucher', data)
}

export function getOrder(params) {
  if (!params) {
    params = { pageSize: 20, page: 1 }
  }
  return axios.get('/order/history', { params })
}

export function reportOrder(data) {
  return axios.post('/order/report-order', data)
}
