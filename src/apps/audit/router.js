export default {
  path: '/audit',
  name: 'audit',
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
    },
    {
      path: 'SPECIAL/:id',
      name: 'AuditContentSpecial',
      props: true,
      component: resolve => require(['@/apps/special/list/content.vue'], resolve)
    },
    {
      path: 'AUDIO/:id',
      name: 'AuditContentAudio',
      props: true,
      component: resolve => require(['@/apps/audios/list/content.vue'], resolve)
    },
    {
      path: 'LIVE/:id',
      name: 'AuditContentLive',
      props: true,
      component: resolve => require(['@/apps/live/list/content.vue'], resolve)
    },
    {
      path: 'ECOMMERCE/:id',
      name: 'AuditContentEcommerce',
      props: true,
      component: resolve => require(['@/apps/ecommerce/list/content.vue'], resolve)
    },
    {
      path: 'GALLERY/:id',
      name: 'AuditContentGallery',
      props: true,
      component: resolve => require(['@/apps/gallery/list/content.vue'], resolve)
    },
    {
      path: 'VOTE/:id',
      name: 'AuditContentVote',
      props: true,
      component: resolve => require(['@/apps/vote/list/content.vue'], resolve)
    }
  ]
}
