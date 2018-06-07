export default {
  path: '/gallery',
  name: 'Gallery',
  component: resolve => require(['@/apps/gallery/index.vue'], resolve),
  meta: { level: 2, title: '图集', identifier: 'gallery' }
}
