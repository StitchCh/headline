<template>
  <div class="users-all">
    <div class="af-topbar">
      <span class="f-18">全部</span>
    </div>
    <div class="flex-item scroll-y bg-e relative">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div class="setting-card f-14">
        <table>
          <thead>
          <th>用户ID</th>
          <th>用户姓名</th>
          <th>登录名</th>
          <!--<th>登录密码</th>-->
          <th>用户状态</th>
          <!--<th>用户区域</th>-->
          <!--<th>用户手机</th>-->
          <!--<th>Email</th>-->
          <!--<th>创建时间</th>-->
          <th>本次登录时间</th>
          <th>登录IP</th>
          <!--<th>上次登录IP</th>-->
          <th colspan="3">操作</th>
          </thead>
          <tbody>
          <tr v-for="item in list" :key="item.id" @click="openDetail(item)">
            <td>{{item.id}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.loginUserName}}</td>
            <!--<td>{{item.loginUserPwd}}</td>-->
            <td>{{item.userStatus}}</td>
            <!--<td>{{item.userArea}}</td>-->
            <!--<td>{{item.userPhone}}</td>-->
            <!--<td>{{item.userEmail}}</td>-->
            <!--<td>{{item.createTime}}</td>-->
            <td>{{item.userLoginTime}}</td>
            <td>{{item.userLoginIp}}</td>
            <!--<td>{{item.userLastLoginIp}}</td>-->
            <td style="width: 30px;" v-tooltip="'重置密码'"><icon-btn small>refresh</icon-btn></td>
            <td style="width: 30px;" v-tooltip="'编辑'"><icon-btn small>edit</icon-btn></td>
            <td style="width: 30px;" v-tooltip="'删除'"><icon-btn small>delete</icon-btn></td>
            <td style="width: 30px;" v-tooltip="'审核'"><icon-btn small>find_in_page</icon-btn></td>
            <td style="width: 30px;" v-tooltip="'恢复'"><icon-btn small>restore_from_trash</icon-btn></td>
          </tr>
          </tbody>
        </table>
        <pagination :total="total" :size="10" :page="page" color="#66BB6A" style="justify-content: center;"></pagination>
      </div>
    </div>

    <layer v-if="detailShow" title="用户详情" width="600px" maskClick @close="detailShow = false">
      <div class="layer-text">
        <table>
          <tbody>
            <tr>
              <th align="right">用户ID</th>
              <td>{{detail.id}}</td>
            </tr>
            <tr>
              <th align="right">用户姓名</th>
              <td>{{detail.userName}}</td>
            </tr>
            <tr>
              <th align="right">登录名</th>
              <td>{{detail.loginUserName}}</td>
            </tr>
            <tr>
              <th align="right">登录密码</th>
              <td>{{detail.loginUserPwd}}</td>
            </tr>
            <tr>
              <th align="right">用户状态</th>
              <td>{{detail.userStatus}}</td>
            </tr>
            <tr>
              <th align="right">用户区域</th>
              <td>{{detail.userArea}}</td>
            </tr>
            <tr>
              <th align="right">用户手机</th>
              <td>{{detail.userPhone}}</td>
            </tr>
            <tr>
              <th align="right">Email</th>
              <td>{{detail.userEmail}}</td>
            </tr>
            <tr>
              <th align="right">创建时间</th>
              <td>{{detail.createTime}}</td>
            </tr>
            <tr>
              <th align="right">本次登录时间</th>
              <td>{{detail.userLoginTime}}</td>
            </tr>
            <tr>
              <th align="right">登录IP</th>
              <td>{{detail.userLoginIp}}</td>
            </tr>
            <tr>
              <th align="right">上次登录IP</th>
              <td>{{detail.userLastLoginIp}}</td>
            </tr>
            <tr>
              <th align="right">用户ID</th>
              <td>{{detail.id}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="layer-btns">
        <btn flat color="#66BB6A" @click="detailShow = false">关闭</btn>
      </div>
    </layer>
  </div>
</template>

<script>
export default {
  name: 'users-all',
  data () {
    return {
      loading: false,
      list: [],
      total: 1,
      page: 1,
      detailShow: false,
      detail: {}
    }
  },
  methods: {
    getList () {
      let params = {
        pageSize: 10,
        toPage: 1
      }
      this.$http.post('/cri-cms-platform/sysUser/queryList.monitor', params).then(
        res => {
          console.log(res)
          this.list = res.pages
          this.total = res.totalPage * 10
        }
      )
    },
    openDetail (item) {
      this.detail = item
      this.detailShow = true
    }
  },
  filters: {
    status (value) {
      if (value === '00') return '正常'
      if (value === '01') return '待审'
      if (value === '02') return '删除'
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less">
.users-all {background: #fafafa;
  .setting-card {max-width: 1440px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;
    th,td {padding: 5px 10px;}
    tr {border-top: 1px solid #e1e1e1;cursor: pointer;}
    tr:hover {background: rgba(0, 0, 0, .05);}
  }
  .add-site-btn {color: #008cff;padding: 14px 30px;cursor: pointer;transition: background .2s;
    &:active {background: #e1e1e1;}
  }
}
</style>
