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
          name: 'SpecialContent',
          component: resolve => require(['@/apps/special/list/content.vue'], resolve),
          props: true
        },
        {
          path: ':id/statistics',
          name: 'SpecialStatistics',
          component: resolve => require(['@/apps/special/list/statistics.vue'], resolve),
          props: true
        },
        {
          path: ':id/history',
          name: 'SpecialHistory',
          component: resolve => require(['@/apps/special/list/history.vue'], resolve),
          props: true
        }
      ]
    },
    {
      path: 'tile',
      name: 'SpecialTile',
      component: resolve => require(['@/apps/special/tile/index.vue'], resolve)
    },
    {
      path: 'reject',
      component: resolve => require(['@/apps/special/reject/index.vue'], resolve)
    },
    {
      path: 'recycle',
      name: 'SpecialRecycle',
      component: resolve => require(['@/apps/special/recycle/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'SpecialRecycleContent',
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
  path: '/articleEdit/:from/:id',
  name: 'SpecialEdit',
  component: resolve => require(['@/apps/special/add.vue'], resolve),
  props: true,
  meta: { level: 3, title: '修改专题', identifier: 'special_edit' }
}]
