export default {
  path: '*',
  name: '404',
  component: resolve => require(['@/apps/404/index.vue'], resolve),
  meta: { title: 'CCTP' }
}
