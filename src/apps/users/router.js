export default {
  path: '/users',
  component: resolve => require(['@/apps/users/index.vue'], resolve),
  meta: { level: 2, title: '用户', identifier: 'users' },
  children: [{
    path: 'all',
    name: 'UsersAll',
    component: resolve => require(['@/apps/users/all.vue'], resolve)
  }, {
    path: 'normal',
    name: 'UsersNormal',
    component: resolve => require(['@/apps/users/normal.vue'], resolve)
  }, {
    path: 'auditing',
    name: 'UsersAuditing',
    component: resolve => require(['@/apps/settings/common/index.vue'], resolve)
  }, {
    path: 'delete',
    name: 'UsersDelete',
    component: resolve => require(['@/apps/settings/common/index.vue'], resolve)
  }]
}
