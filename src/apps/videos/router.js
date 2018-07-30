export default {
  path: '/videos',
  component: resolve => require(['@/apps/videos/index.vue'], resolve),
  meta: { level: 2, title: '视频', identifier: 'videos' }
}
