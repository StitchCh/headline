export default [{
  path: '/links',
  component: resolve => require(['@/apps/links/index.vue'], resolve),
  meta: { level: 2, title: '链接', identifier: 'links' },
  children: [
    {
      path: '/',
      redirect: '/links/list'
    },
    {
      path: 'list',
      component: resolve => require(['@/apps/links/list/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'LinksContent',
          component: resolve => require(['@/apps/links/list/content.vue'], resolve),
          props: true
        },
        {
          path: ':id/statistics',
          name: 'LinksStatistics',
          component: resolve => require(['@/apps/links/list/statistics.vue'], resolve),
          props: true
        },
        {
          path: ':id/history',
          name: 'LinksHistory',
          component: resolve => require(['@/apps/links/list/history.vue'], resolve),
          props: true
        }
      ]
    },
    {
      path: 'draft',
      name: 'LinksDraft',
      component: resolve => require(['@/apps/links/draft/index.vue'], resolve)
    },
    {
      path: 'reject',
      name: 'LinksReject',
      component: resolve => require(['@/apps/links/reject/index.vue'], resolve)
    },
    {
      path: 'recycle',
      name: 'LinksRecycle',
      component: resolve => require(['@/apps/links/recycle/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'LinksRecycleContent',
          component: resolve => require(['@/apps/links/list/content.vue'], resolve),
          props: true
        }
      ]
    }
  ]
}, {
  path: '/linksAdd',
  name: 'LinksAdd',
  component: resolve => require(['@/apps/links/add.vue'], resolve),
  meta: { level: 3, title: '添加连接', identifier: 'links_add' }
}, {
  path: '/linksEdit/:from/:id',
  name: 'LinksEdit',
  component: resolve => require(['@/apps/links/add.vue'], resolve),
  props: true,
  meta: { level: 3, title: '编辑连接', identifier: 'links_edit' }
}]
