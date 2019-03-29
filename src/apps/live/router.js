export default [{
  path: '/live',
  component: resolve => require(['@/apps/live/index.vue'], resolve),
  meta: { level: 2, title: '直播', identifier: 'live' },
  children: [
    {
      path: '/',
      redirect: '/live/list'
    },
    {
      path: 'list',
      component: resolve => require(['@/apps/live/list/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'LiveContent',
          component: resolve => require(['@/apps/live/list/content.vue'], resolve),
          props: true
        },
        {
          path: ':id/statistics',
          name: 'LiveStatistics',
          component: resolve => require(['@/apps/live/list/statistics.vue'], resolve),
          props: true
        },
        {
          path: ':id/history',
          name: 'LiveHistory',
          component: resolve => require(['@/apps/live/list/history.vue'], resolve),
          props: true
        }
      ]
    },
    {
      path: 'reject',
      component: resolve => require(['@/apps/live/reject/index.vue'], resolve)
    },
    {
      path: 'recycle',
      name: 'liveRecycle',
      component: resolve => require(['@/apps/live/recycle/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'LiveRecycleContent',
          component: resolve => require(['@/apps/live/list/content.vue'], resolve),
          props: true
        }
      ]
    }
  ]
}, {
  path: '/liveAdd',
  name: 'liveAdd',
  component: resolve => require(['@/apps/live/add.vue'], resolve),
  meta: { level: 3, title: '添加直播', identifier: 'live_add' }
}, {
  path: '/liveRoom',
  name: 'liveRoom',
  component: resolve => require(['@/apps/live/liveRoom.vue'], resolve),
  meta: { level: 3, title: '直播间', identifier: 'live_room' }
},{
  path: '/liveEdit/:from/:id',
  name: 'liveEdit',
  component: resolve => require(['@/apps/live/add.vue'], resolve),
  props: true,
  meta: { level: 3, title: '修改直播', identifier: 'live_edit' }
}
]
