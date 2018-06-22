export default {
  path: '/works',
  // name: 'Medialibrary',
  component: resolve => require(['@/apps/works/index.vue'], resolve),
  meta: { level: 2, title: '工作台', identifier: 'works' },
  children: []
}
