export default [
  {
    path: '/video',
    component: resolve => require(['@/apps/videos/index.vue'], resolve),
    meta: { level: 2, title: '视频', identifier: 'video' },
    children: [
      {
        path: '/',
        redirect: '/video/list'
      },
      {
        path: 'album',
        name: 'VideoAlbum',
        component: resolve => require(['@/apps/videos/album/index.vue'], resolve),
        props: true,
        children: [
          {
            path: ':id',
            name: 'VideoAlbumContent',
            component: resolve => require(['@/apps/videos/album/content.vue'], resolve),
            props: true
          }
        ]
      },
      {
        path: 'list',
        component: resolve => require(['@/apps/videos/list/index.vue'], resolve),
        props: true,
        children: [
          {
            path: ':id',
            name: 'VideoContent',
            component: resolve => require(['@/apps/videos/list/content.vue'], resolve),
            props: true
          },
          {
            path: ':id/statistics',
            name: 'VideoStatistics',
            component: resolve => require(['@/apps/videos/list/statistics.vue'], resolve),
            props: true
          },
          {
            path: ':id/history',
            name: 'VideoHistory',
            component: resolve => require(['@/apps/videos/list/history.vue'], resolve),
            props: true
          }
        ]
      },
      {
        path: 'draft',
        name: 'VideoDraft',
        component: resolve => require(['@/apps/videos/draft/index.vue'], resolve)
      },
      {
        path: 'recycle',
        name: 'VideoRecycle',
        component: resolve => require(['@/apps/videos/recycle/index.vue'], resolve),
        props: true,
        children: [
          {
            path: ':id',
            name: 'VideoRecycleContent',
            component: resolve => require(['@/apps/videos/list/content.vue'], resolve),
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '/videoAdd',
    name: 'VideoAdd',
    component: resolve => require(['@/apps/videos/editVideo/index.vue'], resolve),
    meta: { level: 3, title: '添加视频', identifier: 'video_add' }
  },
  {
    path: '/videoEdit/:from/:id',
    name: 'VideoEdit',
    component: resolve => require(['@/apps/videos/editVideo/index.vue'], resolve),
    props: true,
    meta: { level: 3, title: '修改视频', identifier: 'video_edit' }
  }
]
