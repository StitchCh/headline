export default {
  path: '/',
  name: 'Launcher',
  component: resolve => require(['@/apps/launcher/index.vue'], resolve),
  meta: { level: 1, identifier: 'launcher' }
}
