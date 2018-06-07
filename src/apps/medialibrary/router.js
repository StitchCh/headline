export default {
  path: '/media',
  name: 'Medialibrary',
  component: resolve => require(['@/apps/medialibrary/index.vue'], resolve),
  meta: { level: 2, title: '媒体库', identifier: 'medialibrary' }
}
