import axios from 'axios'
import store from '@/store'

export default function getUserInfo () {
  return axios.post('/cri-cms-platform/sites.monitor').then(res => {
    console.log(res)
    store.commit('LOGIN', res.user)
    return Promise.resolve(res)
  }).catch(e => {
    return Promise.reject(e)
  })
}
