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

      <div class="setting-card f-16 add-site-btn" @click="openNew">
        添加新用户...
      </div>

      <div class="setting-card f-14">
        <table>
          <thead>
          <th>用户ID</th>
          <th>用户姓名</th>
          <th>登录名</th>
          <th>用户状态</th>
          <th>本次登录时间</th>
          <th>登录IP</th>
          <th colspan="4">操作</th>
          </thead>
          <tbody>
          <tr v-for="item in list" :key="item.id" @click="openDetail(item)">
            <td>{{item.id}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.loginUserName}}</td>
            <td>{{item.userStatus | status}}</td>
            <td>{{item.userLoginTime}}</td>
            <td>{{item.userLoginIp}}</td>
            <td style="width: 30px;"><icon-btn v-tooltip="'重置密码'" small>refresh</icon-btn></td>
            <td style="width: 30px;"><icon-btn v-tooltip="'编辑'" small>edit</icon-btn></td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'删除'" v-if="item.userStatus !== '02'" small>delete</icon-btn>
              <icon-btn v-tooltip="'恢复'" v-else small>restore_from_trash</icon-btn>
            </td>
            <td style="width: 30px;"><icon-btn v-tooltip="'审核'" v-if="item.userStatus === '01'" small @click="audit(item.id)">find_in_page</icon-btn></td>
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
              <td>{{detail.userStatus | status}}</td>
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
            <tr>
              <th align="right">操作</th>
              <td>
                <icon-btn style="margin: 0 2px;" v-tooltip="'重置密码'" small>refresh</icon-btn>
                <icon-btn style="margin: 0 2px;" v-tooltip="'编辑'" small>edit</icon-btn>
                <icon-btn style="margin: 0 2px;" v-tooltip="'删除'" v-if="detail.userStatus !== '02'" small>delete</icon-btn>
                <icon-btn style="margin: 0 2px;" v-tooltip="'恢复'" v-else small>restore_from_trash</icon-btn>
                <icon-btn style="margin: 0 2px;" v-tooltip="'审核'" v-if="detail.userStatus === '01'" small>find_in_page</icon-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="layer-btns">
        <btn flat color="#66BB6A" @click="detailShow = false">关闭</btn>
      </div>
    </layer>

    <layer v-if="newShow" title="添加新用户" width="600px">
      <div class="layer-text">
        <input-box label="用户名称" v-model="newForm.userName"></input-box>
        <input-box label="登录名称" v-model="newForm.loginUserName" :hint="newLoginUserNameHint" @blur="vertifyLoginUserName"></input-box>
        <input-box label="登录密码" type="password" v-model="newForm.loginUserPwd"></input-box>
        <input-box label="再次输入登录密码" type="password" v-model="vertify.newLoginUserPwd"></input-box>
        <input-box label="手机号码" v-model="newForm.userPhone"></input-box>
        <input-box label="用户邮箱" v-model="newForm.userEmail"></input-box>
        <input-box label="角色ID（多个角色用逗号分开）" v-model="newForm.rolesId"></input-box>
      </div>
      <div class="layer-btns">
        <btn flat @click="newShow = false">取消</btn>
        <btn flat color="#66BB6A" @click="submitNew">提交</btn>
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
      detail: {},
      newShow: false,
      vertify: {
        newLoginUserPwd: ''
      },
      newForm: {
        userName: '',
        loginUserName: '',
        loginUserPwd: '',
        userPhone: '',
        userEmail: '',
        rolesId: ''
      },
      newLoginUserNameHint: '',
      editShow: false,
      editForm: {}
    }
  },
  methods: {
    getList () {
      this.$http.post('/cri-cms-platform/sysUser/queryList.monitor', {
        pageSize: 10,
        toPage: this.page
      }).then(
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
    },

    // 新建用户
    openNew () {
      this.vertify.newLoginUserPwd = ''
      for (let k in this.newForm) {
        this.newForm[k] = ''
      }
      this.newLoginUserNameHint = ''
      this.newShow = true
    },
    vertifyLoginUserName () {
      if (this.newForm.loginUserName === '') return
      this.$http.post('/cri-cms-platform/sysUser/valident.monitor', {
        loginUserName: this.newForm.loginUserName
      }).then(
        res => {
          console.log(res)
          this.newLoginUserNameHint = '登录名可用'
        }
      ).catch(
        res => {
          console.log(res)
          this.newLoginUserNameHint = '登录名不可用'
        }
      )
    },
    submitNew () {
      if (this.newForm.userName === '') {
        this.$toast('请输入用户名称')
        return
      }
      if (this.newForm.loginUserName === '') {
        this.$toast('请输入登录名称')
        return
      }
      if (this.newForm.loginUserName === '') {
        this.$toast('请输入登录名称')
        return
      }
      if (this.newForm.loginUserPwd === '') {
        this.$toast('请输入登录密码')
        return
      }
      if (this.newForm.userPhone === '') {
        this.$toast('请输入手机号码')
        return
      }
      if (this.newForm.userEmail === '') {
        this.$toast('请输入用户邮箱')
        return
      }
      if (this.newForm.loginUserPwd !== this.vertify.newLoginUserPwd) {
        this.$toast('两次输入的密码不一致')
        return
      }
      this.$http.post('/cri-cms-platform/sysUser/save.monitor', this.newForm).then(
        res => {
          console.log(res)
          this.newShow = false
        }
      )
    },
    openEdit () {},
    submitEdit () {},
    audit (id) {
      this.$http.post('/cri-cms-platform/sysUser/queryList.monitor', { id }).then(
        res => {
          console.log(res)
        }
      )
    }
  },
  filters: {
    status (value) {
      if (value === '00') return '正常'
      if (value === '01') return '待审'
      if (value === '02') return '删除'
      return ''
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
  .layer-text {
    th, td {padding: 5px 15px;}
    th {width: 130px;}
  }
}
</style>
