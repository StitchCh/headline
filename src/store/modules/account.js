import Vue from 'vue'

const state = {
  menu: [],
  firstLogin: false
}

if (sessionStorage.menu) {
  state.menu = JSON.parse(sessionStorage.menu)
}

const mutations = {
  LOGIN (state, userinfo) {
    if (typeof userinfo !== 'object') return
    for (let key in userinfo) {
      Vue.set(state, key, userinfo[key])
    }
  },
  LOGOUT (state) {
    for (let key in state) state[key] = ''
  },
  setMenu (state, data) {
    state.menu = data
    sessionStorage.menu = JSON.stringify(data)
  },
  setFirstLogin (data) {
    state.firstLogin = data
  }
}

export default { state, mutations }
