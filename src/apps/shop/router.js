export default {
  path: '/shop',
  component: resolve => require(['@/apps/shop/index.vue'], resolve),
  meta: { level: 2, title: '积分商城', identifier: 'shop' },
  children: [
    {
      path: '/',
      redirect: '/shop/product/index.vue'
    },
    {
      path: 'product',
      name: 'product',
      component: resolve => require(['@/apps/shop/product/index.vue'], resolve)
    },
    {
      path: 'order',
      name: 'order',
      component: resolve => require(['@/apps/shop/order/index.vue'], resolve)
    }
  ]
}
