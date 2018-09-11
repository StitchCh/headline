export default {
  path: '/frontDeskUsers',
  component: resolve => require(['@/apps/frontDeskUsers/index.vue'], resolve),
  meta: { level: 2, title: '前台用户管理', identifier: 'front_desk_users' },
  children: []
}
