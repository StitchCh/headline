export default [{
  path: '/article',
  // name: 'Article',
  component: resolve => require(['@/apps/article/index.vue'], resolve),
  props: true,
  meta: { level: 2, title: '文章', identifier: 'article' },
  children: [
    {
      path: '/',
      redirect: '/article/sent/index'
    },
    {
      path: ':any',
      redirect: '/article/sent/index'
    },
    {
      path: ':scope/:status'
    },
    {
      path: ':scope/:status/index',
      component: resolve => require(['@/apps/article/draftList'], resolve),
      props: true
    },
    {
      path: ':scope/:status/:id',
      component: resolve => require(['@/apps/article/content'], resolve),
      props: true
    }

    // {
    //   path: ':status/:id'
    // }
    // {
    //   path: 'sent/:id',
    //   components: {
    //     default: resolve => require(['@/apps/article/content'], resolve),
    //     center: resolve => require(['@/components/app-frame/afCenter'], resolve),
    //     props: { default: true, center: false }
    //   }
    // },
    // {
    //   path: 'check',
    //   components: {
    //     center: resolve => require(['@/components/app-frame/afCenter'], resolve)
    //   }
    // },
    // {
    //   path: 'check/:id',
    //   components: {
    //     default: resolve => require(['@/apps/article/content'], resolve),
    //     center: resolve => require(['@/components/app-frame/afCenter'], resolve),
    //     props: { default: true, center: false }
    //   }
    // },
    // {
    //   path: 'reject'
    // },
    // {
    //   path: 'reject/:id',
    //   component: resolve => require(['@/apps/article/content'], resolve),
    //   props: true
    // },
    // {
    //   path: 'draft'
    // },
    // {
    //   path: 'draft/:id',
    //   component: resolve => require(['@/apps/article/content'], resolve),
    //   props: true
    // }
  ]
}, {
  path: '/articleAdd',
  name: 'ArticleAdd',
  component: resolve => require(['@/apps/article/add.vue'], resolve),
  meta: { level: 3, title: '添加文章', identifier: 'article_add' }
}]
