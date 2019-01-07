import Vue from 'vue'

const state = {
  menu: [],
  firstLogin: false,
  waterImg: false,
  appTypeList: {
    SPECIAL: '专题',
    VIDEO: '视频',
    ARTICLE: '文章',
    AUDIO: '音频',
    LIVE: '直播',
    ECOMMERCE: '电商',
    LINK: '连接',
    GALLERY: '图集',
    VOTE: '投票'
  }
}

if (sessionStorage.menu) {
  state.menu = JSON.parse(sessionStorage.menu)
}
if (sessionStorage.waterImg) {
  state.waterImg = sessionStorage.waterImg
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
  setFirstLogin (state, data) {
    state.firstLogin = data
  },
  setWaterImg (state, data) {
    state.waterImg = data
    sessionStorage.waterImg = data
  }
}

export default { state, mutations }
