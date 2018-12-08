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
          name: 'ArticleContent',
          component: resolve => require(['@/apps/special/list/content.vue'], resolve),
          props: true
        },
        {
          path: ':id/statistics',
          name: 'ArticleStatistics',
          component: resolve => require(['@/apps/special/list/statistics.vue'], resolve),
          props: true
        },
        {
          path: ':id/history',
          name: 'ArticleHistory',
          component: resolve => require(['@/apps/special/list/history.vue'], resolve),
          props: true
        }
      ]
    },
    {
      path: 'tile',
      name: 'ArticleTile',
      component: resolve => require(['@/apps/special/tile/index.vue'], resolve)
    },
    {
      path: 'reject',
      component: resolve => require(['@/apps/special/reject/index.vue'], resolve)
    },
    {
      path: 'recycle',
      name: 'ArticleRecycle',
      component: resolve => require(['@/apps/special/recycle/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'ArticleRecycleContent',
          component: resolve => require(['@/apps/special/list/content.vue'], resolve),
          props: true
        }
      ]
    }
  ]
}, {
  path: '/articleAdd',
  name: 'ArticleAdd',
  component: resolve => require(['@/apps/special/add.vue'], resolve),
  meta: { level: 3, title: '添加文章', identifier: 'article_add' }
}, {
  path: '/articleEdit/:from/:id',
  name: 'ArticleEdit',
  component: resolve => require(['@/apps/special/add.vue'], resolve),
  props: true,
  meta: { level: 3, title: '添加文章', identifier: 'article_edit' }
}]
