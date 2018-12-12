export default {
  path: '/audit',
  component: resolve => require(['@/apps/audit/index.vue'], resolve),
  props: true,
  meta: { level: 2, title: '审核', identifier: 'audit' },
  children: [
    {
      path: 'ARTICLE/:id',
      name: 'AuditContentArticle',
      props: true,
      component: resolve => require(['@/apps/article/list/content.vue'], resolve)
    },
    {
      path: 'VIDEO/:id',
      name: 'AuditContentVideo',
      props: true,
      component: resolve => require(['@/apps/videos/list/content.vue'], resolve)
    },
    {
      path: 'LINK/:id',
      name: 'AuditContentLink',
      props: true,
      component: resolve => require(['@/apps/links/list/content.vue'], resolve)
    }
  ]
}
