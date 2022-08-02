import axios from '@/utils/axios'

export function createPayment(data) {
  return axios.post('/payment/vnpay/create-payment', data)
}
