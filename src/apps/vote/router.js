export default [{
  path: '/vote',
  component: resolve => require(['@/apps/vote/index.vue'], resolve),
  meta: { level: 2, title: '投票', identifier: 'vote' },
  children: [
    {
      path: '/',
      redirect: '/vote/list'
    },
    {
      path: 'list',
      component: resolve => require(['@/apps/vote/list/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'voteContent',
          component: resolve => require(['@/apps/vote/list/content.vue'], resolve),
          props: true
        },
        {
          path: ':id/statistics',
          name: 'voteStatistics',
          component: resolve => require(['@/apps/vote/list/statistics.vue'], resolve),
          props: true
        },
        {
          path: ':id/history',
          name: 'voteHistory',
          component: resolve => require(['@/apps/vote/list/history.vue'], resolve),
          props: true
        }
      ]
    },
    {
      path: 'tile',
      name: 'voteTile',
      component: resolve => require(['@/apps/vote/tile/index.vue'], resolve)
    },
    {
      path: 'reject',
      component: resolve => require(['@/apps/vote/reject/index.vue'], resolve)
    },
    {
      path: 'recycle',
      name: 'voteRecycle',
      component: resolve => require(['@/apps/vote/recycle/index.vue'], resolve),
      props: true,
      children: [
        {
          path: ':id',
          name: 'voteRecycleContent',
          component: resolve => require(['@/apps/vote/list/content.vue'], resolve),
          props: true
        }
      ]
    }
  ]
}, {
  path: '/voteAdd',
  name: 'voteAdd',
  component: resolve => require(['@/apps/vote/add.vue'], resolve),
  meta: { level: 3, title: '添加专题', identifier: 'vote_add' }
}, {
  path: '/voteEdit/:from/:id',
  name: 'voteEdit',
  component: resolve => require(['@/apps/vote/add.vue'], resolve),
  props: true,
  meta: { level: 3, title: '修改专题', identifier: 'vote_edit' }
}]
