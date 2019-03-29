export default {
  path: '/roles',
  component: resolve => require(['@/apps/roles/index.vue'], resolve),
  meta: { level: 2, title: '角色', identifier: 'roles' },
  children: []
}
