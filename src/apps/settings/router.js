export default {
  path: '/settings',
  // name: 'Medialibrary',
  component: resolve => require(['@/apps/settings/index.vue'], resolve),
  meta: { level: 2, title: '设置', identifier: 'settings' },
  children: [{
    path: '/settings/common',
    name: 'SettingsCommon',
    component: resolve => require(['@/apps/settings/common/index.vue'], resolve)
  }, {
    path: '/settings/site',
    name: 'SettingsSite',
    component: resolve => require(['@/apps/settings/site/index.vue'], resolve)
  }, {
    path: '/settings/channel',
    name: 'SettingsChannel',
    component: resolve => require(['@/apps/settings/channel/index.vue'], resolve)
  }, {
    path: '/settings/user',
    name: 'SettingsUser',
    component: resolve => require(['@/apps/settings/user/index.vue'], resolve)
  }, {
    path: '/settings/role',
    name: 'SettingsRole',
    component: resolve => require(['@/apps/settings/role/index.vue'], resolve)
  }]
}
