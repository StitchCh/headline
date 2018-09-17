export default {
  path: '/menus',
  component: resolve => require(['@/apps/menus/index.vue'], resolve),
  meta: { level: 2, title: '菜单', identifier: 'menus' },
  children: []
}
