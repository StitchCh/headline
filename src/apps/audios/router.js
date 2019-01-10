export default [
  {
    path: '/audio',
    component: resolve => require(['@/apps/audios/index.vue'], resolve),
    meta: { level: 2, title: '音频', identifier: 'audio' },
    children: [
      {
        path: '/',
        redirect: '/audio/list'
      },
      {
        path: 'album',
        name: 'AudioAlbum',
        component: resolve => require(['@/apps/audios/album/index.vue'], resolve),
        props: true,
        children: [
          {
            path: ':id',
            name: 'AudioAlbumContent',
            component: resolve => require(['@/apps/audios/album/content.vue'], resolve),
            props: true
          }
        ]
      },
      {
        path: 'list',
        component: resolve => require(['@/apps/audios/list/index.vue'], resolve),
        props: true,
        children: [
          {
            path: ':id',
            name: 'AudioContent',
            component: resolve => require(['@/apps/audios/list/content.vue'], resolve),
            props: true
          },
          {
            path: ':id/statistics',
            name: 'AudioStatistics',
            component: resolve => require(['@/apps/audios/list/statistics.vue'], resolve),
            props: true
          },
          {
            path: ':id/history',
            name: 'AudioHistory',
            component: resolve => require(['@/apps/audios/list/history.vue'], resolve),
            props: true
          }
        ]
      },
      {
        path: 'reject',
        name: 'AudioReject',
        component: resolve => require(['@/apps/audios/reject/index.vue'], resolve)
      },
      {
        path: 'draft',
        name: 'AudioDraft',
        component: resolve => require(['@/apps/audios/draft/index.vue'], resolve)
      },
      {
        path: 'recycle',
        name: 'AudioRecycle',
        component: resolve => require(['@/apps/audios/recycle/index.vue'], resolve),
        props: true,
        children: [
          {
            path: ':id',
            name: 'AudioRecycleContent',
            component: resolve => require(['@/apps/audios/list/content.vue'], resolve),
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '/audioAdd',
    name: 'AudioAdd',
    component: resolve => require(['@/apps/audios/editAudio/index.vue'], resolve),
    meta: { level: 3, title: '添加音频', identifier: 'audio_add' }
  },
  {
    path: '/audioEdit/:from/:id',
    name: 'AudioEdit',
    component: resolve => require(['@/apps/audios/editAudio/index.vue'], resolve),
    props: true,
    meta: { level: 3, title: '修改音频', identifier: 'audio_edit' }
  },
  {
    path: '/audioAlbumEdit',
    name: 'AudioAlbumEdit',
    component: resolve => require(['@/apps/audios/album/edit.vue'], resolve),
    props: true,
    meta: { level: 3, title: '编辑专辑', identifier: 'audio_album_edit' },
    children: [
      {
        path: ':id'
      }
    ]
  }
]
