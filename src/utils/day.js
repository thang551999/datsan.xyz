import moment from 'moment'

export function getDay(date) {
  return moment(new Date(date)).format('YYYY/MM/DD')
}
