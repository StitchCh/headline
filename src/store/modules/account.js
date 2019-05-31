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
  },
  authorList: []
}

if (localStorage.menu) {
  state.menu = JSON.parse(localStorage.menu)
}
if (sessionStorage.waterImg) {
  state.waterImg = sessionStorage.waterImg
}

const mutations = {
  setAuthor (state, siteId) {
    if (siteId == 1001) {
      state.authorList = [ '中俄头条', '中央广播电视总台央视新闻', '中央广播电视总台', '中央广播电视总台央视网', '俄罗斯卫星通讯社', ]
    } else {
      state.authorList = [ 'Россия-Китай: главное' ]
    }
  },
  LOGIN (state, userinfo) {
    if (typeof userinfo !== 'object') return
    for (let key in userinfo) {
      Vue.set(state, key, userinfo[key])
    }
  },
  LOGOUT (state) {
    for (let key in state) state[key] = ''
    state.menu = []
  },
  setMenu (state, data) {
    state.menu = data
    console.log(state.menu)
    localStorage.menu = JSON.stringify(data)
  },
  setFirstLogin (state, data) {
    state.firstLogin = data
  },
  setWaterImg (state, data) {
    state.waterImg = data
    sessionStorage.waterImg = data
  }
}

if (sessionStorage.siteId) {
  mutations.setAuthor(state, sessionStorage.siteId)
}

export default { state, mutations }
