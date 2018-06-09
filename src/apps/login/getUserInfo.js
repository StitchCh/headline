import axios from 'axios'
import store from '@/store'

export default function getUserInfo () {
  return axios.post('/cri-cms-platform/sites.monitor').then(res => {
    store.commit('LOGIN', res.user)
    return Promise.resolve(res.user)
  }).catch(e => {
    return Promise.reject(e)
  })
}
