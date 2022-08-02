import Vue from 'vue'

Vue.filter('formatMoney', (money) => {
  if (!money) return ''
  const formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND'
  })

  return formatter.format(money)
})

Vue.filter('formatNumber', (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
})
