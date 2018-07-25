export default {
  path: '/channels',
  name: 'Channels',
  component: resolve => require(['@/apps/channels/index.vue'], resolve),
  meta: { level: 2, title: '工作台', identifier: 'channels' }
}
