export default {
    path: '/collection',
    component: resolve => require(['@/apps/collection/index.vue'], resolve),
    meta: { level: 2, title: '采集', identifier: 'collection' },
    children: []
  }
  