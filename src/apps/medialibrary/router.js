export default {
  path: '/media',
  // name: 'Medialibrary',
  component: resolve => require(['@/apps/medialibrary/index.vue'], resolve),
  meta: { level: 2, title: '媒体库', identifier: 'medialibrary' },
  children: [{
    path: '',
    name: 'MediaPhotos',
    component: resolve => require(['@/apps/medialibrary/photos.vue'], resolve)
  }, {
    path: '/media/videos',
    name: 'MediaVideos',
    component: resolve => require(['@/apps/medialibrary/videos.vue'], resolve)
  }, {
    path: '/media/audios',
    name: 'MediaAudios',
    component: resolve => require(['@/apps/medialibrary/audios.vue'], resolve)
  }]
}
