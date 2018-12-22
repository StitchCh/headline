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
          name: 'SpecialContent',
          component: resolve => require(['@/apps/live/list/content.vue'], resolve),
          props: true
        },
        {
          path: ':id/statistics',
          name: 'SpecialStatistics',
          component: resolve => require(['@/apps/live/list/statistics.vue'], resolve),
          props: true
        },
        {
          path: ':id/history',
          name: 'SpecialHistory',
          component: resolve => require(['@/apps/live/list/history.vue'], resolve),
          props: true
        }
      ]
    },
    // {
    //   path: 'tile',
    //   name: 'SpecialTile',
    //   component: resolve => require(['@/apps/live/tile/index.vue'], resolve)
    // },
    // {
    //   path: 'reject',
    //   component: resolve => require(['@/apps/live/reject/index.vue'], resolve)
    // },
    {
      path: 'recycle',
      name: 'liveRecycle',
      component: resolve => require(['@/apps/live/recycle/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'SpecialRecycleContent',
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
