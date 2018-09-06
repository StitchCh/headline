export default {
  path: '/video',
  component: resolve => require(['@/apps/videos/index.vue'], resolve),
  meta: { level: 2, title: '视频', identifier: 'videos' },
  children: [
    {
      path: '/',
      redirect: '/video/list'
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
    }
  ]
}
