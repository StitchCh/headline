export default {
  path: '/guide',
  // name: 'Medialibrary',
  component: resolve => require(['@/apps/guide/index.vue'], resolve),
  meta: { level: 2, title: '广告设置', identifier: 'guide' },
  children: [{
    path: '/guide/common',
    name: 'guideCommon',
    component: resolve => require(['@/apps/guide/common/index.vue'], resolve)
  }]
}
