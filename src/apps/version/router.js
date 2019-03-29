export default {
  path: '/version',
  component: resolve => require(['@/apps/version/index.vue'], resolve),
  meta: { level: 2, title: '版本设置', identifier: 'version' },
  children: []
}
