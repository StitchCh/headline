import axios from 'axios'
import store from '@/store'

export default function getUserInfo () {
  return axios.post('/cri-cms-platform/sites.monitor').then(res => {
    store.commit('LOGIN', res[0])
    return Promise.resolve(res[0])
  }).catch(e => {
    return Promise.reject(e)
  })
}
