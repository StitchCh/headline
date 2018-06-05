export default {
  path: '/article',
  name: 'Article',
  component: resolve => require(['@/apps/article/index.vue'], resolve),
  meta: { level: 2, title: '文章', identifier: 'article' }
}
