export default {
  path: '/special',
  component: resolve => require(['@/apps/special/index.vue'], resolve),
  meta: { level: 2, title: '专题', identifier: 'special' }
}
