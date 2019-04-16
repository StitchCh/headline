export default {
  path: '/comment',
  component: resolve => require(['@/apps/comment/index.vue'], resolve),
  meta: { level: 2, title: '评论', identifier: 'comment' },
  children: [
    {
      path: '/',
      redirect: '/comment/list'
    },
    {
      path: 'list',
      name: 'CommentList',
      component: resolve => require(['@/apps/comment/list/index.vue'], resolve)
    }
  ]
}
