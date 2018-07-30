export default {
  path: '/audios',
  component: resolve => require(['@/apps/audios/index.vue'], resolve),
  meta: { level: 2, title: '音频', identifier: 'audios' }
}
