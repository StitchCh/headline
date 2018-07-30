export default {
  path: '/live',
  component: resolve => require(['@/apps/live/index.vue'], resolve),
  meta: { level: 2, title: '直播', identifier: 'live' }
}
