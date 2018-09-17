export default {
  path: '/gallery',
  name: 'Gallery',
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
        }
        // {
        //   path: ':id/statistics',
        //   name: 'GalleryStatistics',
        //   component: resolve => require(['@/apps/gallery/list/statistics.vue'], resolve),
        //   props: true
        // },
        // {
        //   path: ':id/history',
        //   name: 'GalleryHistory',
        //   component: resolve => require(['@/apps/gallery/list/history.vue'], resolve),
        //   props: true
        // }
      ]
    }
  ]
}
