import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import obj2FormData from './util/obj2FormData'

import './util/filter'
import './common'

Vue.config.productionTip = false

// axios.defaults.timeout = 10000

axios.interceptors.request.use(function (config) {
  let token = sessionStorage.token || localStorage.token
  let siteId = sessionStorage.siteId || localStorage.siteId || ''
  if (!config.headers.Authorization && token) config.headers.Authorization = `Bearer ${token}`
  if (config.method !== 'post') return config
  let data = Object.assign({ siteId }, config.data)
  config.data = obj2FormData(data)
  return config
})

axios.interceptors.response.use(function (response) {
  if (response.data) {
    let code = parseInt(response.data.code)
    if (code === 1) return (response.data.result || response.data.results)
    if (code === -2001) {
      Vue.prototype.$toast(response.data.msg)
      return
    }
    if (code === -1001) {
      Vue.prototype.$toast(response.data.msg)
      return
    }
    if (code === 1001) {
      Vue.prototype.$toast(response.data.msg)
      return
    }
    if (code === 1002) {
      router.replace('/login')
      sessionStorage.removeItem('token')
      localStorage.removeItem('token')
      sessionStorage.removeItem('siteId')
      localStorage.removeItem('siteId')
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

Vue.prototype.keydownFun = function (nub, fun) {
  let gettype = Object.prototype.toString
  let arrtrue = gettype.call(nub) === '[object Array]' ? true : false
  if (typeof nub === 'number') {
    nub = nub + ''
  }
  if (arrtrue){
    for (let i = 0; i < nub.length; i++) {
      if (typeof nub[i] === 'string') {
        nub[i] = parseInt(nub[i])
      }
    }
  }
  document.onkeydown = function(){
    if (nub === 'all') {
      fun()
    } else if (nub.indexOf(event.keyCode) >= 0) {
      fun()
    }
  }
}

Vue.prototype.qrcode = function (id) {
  let siteId = sessionStorage.getItem('siteId')
  let previewUrl = sessionStorage.getItem('previewUrl')
  return `${previewUrl}/${siteId}/${id}`
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
