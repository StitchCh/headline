
export default {
  path: '/push',
  component: resolve => require(['@/apps/push/index.vue'], resolve),
  meta: { level: 2, title: '推送', identifier: 'push' },
  children: [{
    path: '/',
    name: 'PushList',
    component: resolve => require(['@/apps/push/list.vue'], resolve)
  },{
    path: '/push/list',
    name: 'PushList',
    component: resolve => require(['@/apps/push/list.vue'], resolve)
  }, {
    path: '/push/add',
    name: 'PushAdd',
    component: resolve => require(['@/apps/push/add.vue'], resolve)
  }]
}
