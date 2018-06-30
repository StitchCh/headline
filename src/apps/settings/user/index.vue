<template>
<div class="settings-user">
  <div class="af-topbar"></div>
  <div class="flex-item scroll-y">
    <div class="card">
      <table>
        <thead>
          <th>用户ID</th>
          <th>联系人</th>
          <th>手机</th>
          <th>邮箱</th>
          <th>站点数</th>
          <th>最后登录</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.userPhone}}</td>
            <td>{{item.userEmail}}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'settings-user',
  data () {
    return {
      list: [],
      current: 1,
      totalPage: 1
    }
  },
  methods: {
    getList () {
      this.$http.post('/cri-cms-platform/sysUser/queryList.monitor', {
        pageSize: 10,
        toPage: 1
      }).then(
        res => {
          this.list = res.pages
          console.log(res)
        }
      ).catch(
        res => {
          console.log(res)
        }
      )
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less">
.settings-user{
  //
  .card {max-width: 1440px;margin: 20px auto;border-radius: 6px;box-shadow: 0 0 5px 1px rgba(0, 0, 0, .15);padding: 20px;
    th,td {padding: 5px 10px;font-size: 14px;}
    tr {border-top: 1px solid #e1e1e1;}
    tr:hover {background: rgba(0, 0, 0, .07);}
  }
}
</style>
