export default {
  path: '/works',
  // name: 'Medialibrary',
  component: resolve => require(['@/apps/works/index.vue'], resolve),
  meta: { level: 2, title: '工作台', identifier: 'works' },
  children: [{
    path: '',
    name: 'works-published',
    component: resolve => require(['@/apps/works/published.vue'], resolve)
  }, {
    path: 'unpublished',
    name: 'works-unpublished',
    component: resolve => require(['@/apps/works/unpublished.vue'], resolve)
  }, {
    path: 'history',
    name: 'works-history',
    component: resolve => require(['@/apps/works/history.vue'], resolve)
  }]
}
