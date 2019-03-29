export default {
  path: '/site',
  component: resolve => require(['@/apps/site/index.vue'], resolve),
  meta: { level: 2, title: '站点', identifier: 'site' },
  children: [{
    path: '/site/list',
    name: 'SiteList',
    component: resolve => require(['@/apps/site/list/index.vue'], resolve)
  }]
}
