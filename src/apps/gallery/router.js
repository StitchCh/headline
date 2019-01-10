export default [
  {
    path: '/gallery',
    component: resolve => require(['@/apps/gallery/index.vue'], resolve),
    meta: { level: 2, title: '图集', identifier: 'gallery' },
    children: [
      {
        path: '/',
        redirect: '/gallery/list'
      },
      {
        path: 'list',
        component: resolve => require(['@/apps/gallery/list/index.vue'], resolve),
        props: true,
        children: [
          {
            path: ':id',
            name: 'GalleryContent',
            component: resolve => require(['@/apps/gallery/list/content.vue'], resolve),
            props: true
          },
          {
            path: ':id/statistics',
            name: 'GalleryStatistics',
            component: resolve => require(['@/apps/gallery/list/statistics.vue'], resolve),
            props: true
          },
          {
            path: ':id/history',
            name: 'GalleryHistory',
            component: resolve => require(['@/apps/gallery/list/history.vue'], resolve),
            props: true
          }
        ]
      },
      {
        path: 'reject',
        name: 'GalleryReject',
        component: resolve => require(['@/apps/gallery/reject/index.vue'], resolve)
      },
      {
        path: 'draft',
        name: 'GalleryDraft',
        component: resolve => require(['@/apps/gallery/draft/index.vue'], resolve)
      },
      {
        path: 'recycle',
        name: 'GalleryRecycle',
        component: resolve => require(['@/apps/gallery/recycle/index.vue'], resolve),
        props: true,
        children: [
          {
            path: ':id',
            name: 'GalleryRecycleContent',
            component: resolve => require(['@/apps/gallery/list/content.vue'], resolve),
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '/galleryAdd',
    name: 'GalleryAdd',
    component: resolve => require(['@/apps/gallery/editGallery/index.vue'], resolve),
    meta: { level: 3, title: '添加图集', identifier: 'gallery_add' }
  },
  {
    path: '/galleryEdit/:from/:id',
    name: 'GalleryEdit',
    component: resolve => require(['@/apps/gallery/editGallery/index.vue'], resolve),
    props: true,
    meta: { level: 3, title: '修改图集', identifier: 'gallery_edit' }
  }
]
