export default [{
  path: '/ecommerce',
  component: resolve => require(['@/apps/ecommerce/index.vue'], resolve),
  meta: { level: 2, title: '电商', identifier: 'ecommerce' },
  children: [
    {
      path: '/',
      redirect: '/ecommerce/list'
    },
    {
      path: 'list',
      component: resolve => require(['@/apps/ecommerce/list/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'EcommerceContent',
          component: resolve => require(['@/apps/ecommerce/list/content.vue'], resolve),
          props: true
        },
        {
          path: ':id/statistics',
          name: 'EcommerceStatistics',
          component: resolve => require(['@/apps/ecommerce/list/statistics.vue'], resolve),
          props: true
        },
        {
          path: ':id/history',
          name: 'EcommerceHistory',
          component: resolve => require(['@/apps/ecommerce/list/history.vue'], resolve),
          props: true
        }
      ]
    },
    {
      path: 'tile',
      name: 'EcommerceTile',
      component: resolve => require(['@/apps/ecommerce/tile/index.vue'], resolve)
    },
    {
      path: 'reject',
      component: resolve => require(['@/apps/ecommerce/reject/index.vue'], resolve)
    },
    {
      path: 'recycle',
      name: 'EcommerceRecycle',
      component: resolve => require(['@/apps/ecommerce/recycle/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'EcommerceRecycleContent',
          component: resolve => require(['@/apps/ecommerce/list/content.vue'], resolve),
          props: true
        }
      ]
    }
  ]
}, {
  path: '/ecommerceAdd',
  name: 'EcommerceAdd',
  component: resolve => require(['@/apps/ecommerce/add.vue'], resolve),
  meta: { level: 3, title: '添加文章', identifier: 'article_add' }
}, {
  path: '/ecommerceEdit/:from/:id',
  name: 'EcommerceEdit',
  component: resolve => require(['@/apps/ecommerce/add.vue'], resolve),
  props: true,
  meta: { level: 3, title: '添加文章', identifier: 'article_edit' }
}
]
