export default [{
  path: '/special',
  component: resolve => require(['@/apps/special/index.vue'], resolve),
  meta: { level: 2, title: '专题', identifier: 'special' },
  children: [
    {
      path: '/',
      redirect: '/special/list'
    },
    {
      path: 'list',
      component: resolve => require(['@/apps/special/list/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'specialContent',
          component: resolve => require(['@/apps/special/list/content.vue'], resolve),
          props: true
        },
        {
          path: ':id/statistics',
          name: 'specialStatistics',
          component: resolve => require(['@/apps/special/list/statistics.vue'], resolve),
          props: true
        },
        {
          path: ':id/history',
          name: 'specialHistory',
          component: resolve => require(['@/apps/special/list/history.vue'], resolve),
          props: true
        }
      ]
    },
    {
      path: 'tile',
      name: 'specialTile',
      component: resolve => require(['@/apps/special/tile/index.vue'], resolve)
    },
    {
      path: 'reject',
      component: resolve => require(['@/apps/special/reject/index.vue'], resolve)
    },
    {
      path: 'recycle',
      name: 'specialRecycle',
      component: resolve => require(['@/apps/special/recycle/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'specialRecycleContent',
          component: resolve => require(['@/apps/special/list/content.vue'], resolve),
          props: true
        }
      ]
    }
  ]
}, {
  path: '/specialAdd',
  name: 'specialAdd',
  component: resolve => require(['@/apps/special/add.vue'], resolve),
  meta: { level: 3, title: '添加专题', identifier: 'special_add' }
}, {
  path: '/specialEdit/:from/:id',
  name: 'specialEdit',
  component: resolve => require(['@/apps/special/add.vue'], resolve),
  props: true,
  meta: { level: 3, title: '添加专题', identifier: 'special_edit' }
}]
