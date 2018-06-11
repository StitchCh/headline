import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const routes = createRoutesFromFiles(require.context('../', true, /(\.\/apps\/[a-zA-Z0-9_-]+\/router)\.js$/))
function createRoutesFromFiles (routeFiles) {
  let _routes = []
  routeFiles.keys().forEach(key => {
    if (key === './router/index.js') return
    let item = routeFiles(key).default
    if (item instanceof Array) item.forEach(route => _routes.push(route))
    else _routes.push(item)
  })
  return _routes
}

function eachRoutes (children, parent) {
  children.forEach(child => {
    if (!child.meta) child.meta = {}
    if (parent) for (let key in parent.meta) child.meta[key] = child.meta[key] || parent.meta[key]
    if (child.children) eachRoutes(child.children, child)
  })
}
eachRoutes(routes)

const createRouter = () => new Router({
  mode: 'history',
  routes
})

const router = createRouter()

const showBgRoutes = ['Launcher', 'Login', 'FindPassword', 'ChooseSite']

function setTransition (to, from) {
  let transitionName = 'none'
  let toLevel = to.meta.level
  let fromLevel = from.meta.level
  if (toLevel > fromLevel) transitionName = 'in-app'
  else if (toLevel < fromLevel) transitionName = 'out-app'
  else transitionName = 'fade-app'
  if (showBgRoutes.includes(to.name) || showBgRoutes.includes(from.name)) store.commit('SET_SHOW_BG', true)
  else store.commit('SET_SHOW_BG', false)
  store.commit('SET_TRANSITION', transitionName)
}

router.beforeEach((to, from, next) => {
  setTransition(to, from)
  next()
})

router.afterEach((to) => {
  document.title = to.meta.title || 'CCPT'
  let token = localStorage.token || sessionStorage.token
  let siteId = localStorage.siteId || sessionStorage.siteId
  if (!siteId && !(to.name === 'Login' || to.name === 'ChooseSite' || to.name === 'FindPassword')) {
    router.replace('/login')
    return
  }
  if (!token && !(to.name === 'Login' || to.name === 'FindPassword')) {
    router.replace('/login')
  }
})

export default router
