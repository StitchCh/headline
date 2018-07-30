export default {
  path: '/links',
  component: resolve => require(['@/apps/links/index.vue'], resolve),
  meta: { level: 2, title: '音频', identifier: 'links' }
}
