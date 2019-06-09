export default {
  path: '/InviteCodeCode',
  name: 'InviteCodeCode',
  component: resolve => require(['@/apps/InviteCode/index.vue'], resolve),
  meta: { level: 2, title: '邀请码统计', identifier: 'lnviteCode' },
  children: [{
    path: '/InviteCodeCode/common',
    name: 'InviteCodeCodeCommon',
    component: resolve => require(['@/apps/InviteCode/common/index.vue'], resolve)
  }]
}
