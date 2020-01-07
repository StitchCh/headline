export default {
  path: '/dataCharts',
  component: resolve => require(['@/apps/dataCharts/index.vue'], resolve),
  meta: { level: 2, title: '统计报表', identifier: 'dataCharts' },
  children: []
}
