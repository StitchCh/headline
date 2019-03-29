export default {
  path: '/member',
  component: resolve => require(['@/apps/member/index.vue'], resolve),
  meta: { level: 2, title: '会员', identifier: 'member' },
  children: [
    {
      path: '/',
      redirect: '/member/list'
    },
    {
      path: 'list',
      name: 'MemberList',
      component: resolve => require(['@/apps/member/list/index.vue'], resolve)
    }
  ]
}
