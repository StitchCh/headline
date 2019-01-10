export default [{
  path: '/article',
  component: resolve => require(['@/apps/article/index.vue'], resolve),
  props: true,
  meta: { level: 2, title: '文章', identifier: 'article' },
  children: [
    {
      path: '/',
      redirect: '/article/list'
    },
    {
      path: 'list',
      component: resolve => require(['@/apps/article/list/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'ArticleContent',
          component: resolve => require(['@/apps/article/list/content.vue'], resolve),
          props: true
        },
        {
          path: ':id/statistics',
          name: 'ArticleStatistics',
          component: resolve => require(['@/apps/article/list/statistics.vue'], resolve),
          props: true
        },
        {
          path: ':id/history',
          name: 'ArticleHistory',
          component: resolve => require(['@/apps/article/list/history.vue'], resolve),
          props: true
        }
      ]
    },
    {
      path: 'reject',
      name: 'ArticleReject',
      component: resolve => require(['@/apps/article/reject/index.vue'], resolve)
    },
    {
      path: 'draft',
      name: 'ArticleDraft',
      component: resolve => require(['@/apps/article/draft/index.vue'], resolve)
    },
    {
      path: 'recycle',
      name: 'ArticleRecycle',
      component: resolve => require(['@/apps/article/recycle/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'ArticleRecycleContent',
          component: resolve => require(['@/apps/article/list/content.vue'], resolve),
          props: true
        }
      ]
    }
  ]
}, {
  path: '/articleAdd',
  name: 'ArticleAdd',
  component: resolve => require(['@/apps/article/add.vue'], resolve),
  meta: { level: 3, title: '添加文章', identifier: 'article_add' }
}, {
  path: '/articleEdit/:from/:id',
  name: 'ArticleEdit',
  component: resolve => require(['@/apps/article/add.vue'], resolve),
  props: true,
  meta: { level: 3, title: '添加文章', identifier: 'article_edit' }
}]
