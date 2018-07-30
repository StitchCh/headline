export default {
  path: '/ecommerce',
  component: resolve => require(['@/apps/ecommerce/index.vue'], resolve),
  meta: { level: 2, title: '电商', identifier: 'ecommerce' }
}
