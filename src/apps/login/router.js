export default [{
  path: '/login',
  name: 'Login',
  component: resolve => require(['@/apps/login/index.vue'], resolve),
  meta: { level: 0, title: '登录' }
}, {
  path: '/findPassword',
  name: 'FindPassword',
  component: resolve => require(['@/apps/login/findPassword.vue'], resolve),
  meta: { level: 1, title: '找回密码' }
}, {
  path: '/chooseSite',
  name: 'ChooseSite',
  component: resolve => require(['@/apps/login/siteSelect.vue'], resolve),
  meta: { level: 1, title: '选择站点' }
}]
