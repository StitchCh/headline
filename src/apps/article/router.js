export default [{
  path: '/article',
  name: 'Article',
  component: resolve => require(['@/apps/article/index.vue'], resolve),
  meta: { level: 2, title: '文章', identifier: 'article' }
}, {
  path: '/articleAdd',
  name: 'ArticleAdd',
  component: resolve => require(['@/apps/article/add.vue'], resolve),
  meta: { level: 3, title: '添加文章', identifier: 'article_add' }
}]
