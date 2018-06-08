import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import obj2FormData from './util/obj2FormData'

import './util/filter'
import './common'

Vue.config.productionTip = false

axios.interceptors.request.use(function (config) {
  let token = sessionStorage.token || localStorage.token
  if (!config.headers.Authorization && token) config.headers.Authorization = `Bearer ${token}`
  if (config.method !== 'post') return config
  let data = Object.assign({ siteId: '1001' }, config.data)
  config.data = obj2FormData(data)
  return config
})

axios.interceptors.response.use(function (response) {
  if (response.data) {
    let code = parseInt(response.data.code)
    if (code === 1) return response.data.result
    if (code === 1002) {
      router.replace('/login')
      sessionStorage.removeItem('token')
      localStorage.removeItem('token')
      store.commit('LOGOUT')
      return
    }
    return Promise.reject(response.data)
  }
  return Promise.reject(response)
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
