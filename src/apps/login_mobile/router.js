export default [{
  path: '/mobile',
  name: 'mobile',
  component: resolve => require(['@/apps/login_mobile/index.vue'], resolve),
  meta: { level: 0, title: '登录' }
}, {
  path: '/findPassword_mobile',
  name: 'FindPassword_mobile',
  component: resolve => require(['@/apps/login_mobile/findPassword.vue'], resolve),
  meta: { level: 1, title: '找回密码' }
}, {
  path: '/chooseSite_mobile',
  name: 'ChooseSite_mobile',
  component: resolve => require(['@/apps/login_mobile/siteSelect.vue'], resolve),
  meta: { level: 1, title: '选择站点' }
}]
