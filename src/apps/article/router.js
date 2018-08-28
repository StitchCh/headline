export default [{
  path: '/article',
  // name: 'Article',
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
          component: resolve => require(['@/apps/article/list/content.vue'], resolve),
          props: true
        },
        {
          path: ':id/statistics',
          component: resolve => require(['@/apps/article/list/statistics.vue'], resolve),
          props: true
        }
      ]
    },
    {
      path: 'tile',
      component: resolve => require(['@/apps/article/tile/index.vue'], resolve)
    },
    {
      path: 'reject',
      component: resolve => require(['@/apps/article/reject/index.vue'], resolve)
    },
    {
      path: 'recycle',
      component: resolve => require(['@/apps/article/recycle/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
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
