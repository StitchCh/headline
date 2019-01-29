export default {
  path: '/push',
  component: resolve => require(['@/apps/push/index.vue'], resolve),
  meta: { level: 2, title: '推送', identifier: 'push' }
}
