export default {
  path: '/media',
  // name: 'Medialibrary',
  component: resolve => require(['@/apps/medialibrary/index.vue'], resolve),
  meta: { level: 2, title: '素材库', identifier: 'medialibrary' },
  children: [{
    path: '',
    name: 'MediaPhotos',
    component: resolve => require(['@/apps/medialibrary/pages/photos.vue'], resolve),
    meta: { type: 0 }
  }, {
    path: '/media/videos',
    name: 'MediaVideos',
    component: resolve => require(['@/apps/medialibrary/pages/videos.vue'], resolve),
    meta: { type: 2 }
  }, {
    path: '/media/audios',
    name: 'MediaAudios',
    component: resolve => require(['@/apps/medialibrary/pages/audios.vue'], resolve),
    meta: { type: 1 }
  }]
}
