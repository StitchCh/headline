<template>
  <div>
    <div class="af-topbar">
      <span class="f-18">全部</span>
    </div>
    <div class="flex-item scroll-y bg-e relative">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div class="setting-card f-16 add-btn" @click="openNew">
        添加新用户...
      </div>

      <div class="setting-card f-14">
        <table>
          <thead>
          <th>序号</th>
          <th>用户姓名</th>
          <th>登录名</th>
          <th>角色</th>
          <th>用户状态</th>
          <th>本次登录时间</th>
          <th>登录IP</th>
          <th colspan="4">操作</th>
          </thead>
          <tbody>
          <tr v-for="(item, index) in list" :key="item.id" @click="openDetail(item.id)">
            <td>{{index+1}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.loginUserName}}</td>
            <td>{{item.roleName}}</td>
            <td>{{item.userStatus == '00' ? '正常' : '停用'}}</td>
            <td>{{item.userLoginTime}}</td>
            <td>{{item.userLoginIp}}</td>
            <td style="width: 30px;"><icon-btn v-tooltip="'重置密码'" small @click.stop.native="backPassWd(item.id)">refresh</icon-btn></td>
            <td style="width: 30px;"><icon-btn v-tooltip="'编辑'" small @click.stop.native="openEdit(item.id)">edit</icon-btn></td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'停用'" v-if="item.userStatus == '00'" small @click.stop.native="deleteUser(item.id)">delete</icon-btn>
              <icon-btn v-tooltip="'恢复'" v-else small @click.stop.native="restoreUser(item.id)">restore_from_trash</icon-btn>
            </td>
            <!--<td style="width: 30px;"><icon-btn v-tooltip="'审核'" v-if="item.userStatus === '01'" small @click.stop.native="auditUser(item.id)">find_in_page</icon-btn></td>-->
          </tr>
          </tbody>
        </table>
        <pagination @change="p => {page = p; this.getList()}" :total="total" :size="10" :page="page" color="#66BB6A" style="justify-content: center;"></pagination>
      </div>
    </div>

    <layer v-if="detailShow" title="用户详情" width="600px" maskClick @close="detailShow = false">
      <div class="layer-text">
        <table>
          <tbody>
            <tr>
              <th align="right">用户姓名</th>
              <td>{{detail.sysUser.userName}}</td>
            </tr>
            <tr>
              <th align="right">登录名</th>
              <td>{{detail.sysUser.loginUserName}}</td>
            </tr>
            <tr>
              <th align="right">用户状态</th>
              <td>{{detail.sysUser.userStatus == '00' ? '正常' : '停用'}}</td>
            </tr>
            <tr>
              <th align="right">用户手机</th>
              <td>{{detail.sysUser.userPhone}}</td>
            </tr>
            <tr>
              <th align="right">Email</th>
              <td>{{detail.sysUser.userEmail}}</td>
            </tr>
            <tr>
              <th align="right">创建时间</th>
              <td>{{detail.sysUser.createTime}}</td>
            </tr>
            <tr>
              <th align="right">本次登录时间</th>
              <td>{{detail.sysUser.userLoginTime}}</td>
            </tr>
            <tr>
              <th align="right">登录IP</th>
              <td>{{detail.sysUser.userLoginIp}}</td>
            </tr>
            <tr>
              <th align="right">角色</th>
              <td>
                <tag v-for="item in detail.roleIds" :key="item" small>{{getRole(item)}}</tag>
              </td>
            </tr>
            <tr>
              <th align="right">操作</th>
              <td>
                <icon-btn v-tooltip="'重置密码'" small @click.stop.native="backPassWd(detail.sysUser.id)">refresh</icon-btn>
                <icon-btn v-tooltip="'编辑'" small @click.stop.native="openEdit(detail.sysUser.id)">edit</icon-btn>
                <icon-btn v-tooltip="'删除'" v-if="detail.sysUser.userStatus !== '02'" small @click.stop.native="deleteUser(detail.sysUser.id)">delete</icon-btn>
                <icon-btn v-tooltip="'恢复'" v-else small @click.stop.native="restoreUser(detail.sysUser.id)">restore_from_trash</icon-btn>
                <icon-btn v-tooltip="'审核'" v-if="detail.sysUser.userStatus === '01'" small @click.stop.native="auditUser(detail.sysUser.id)">find_in_page</icon-btn>
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
        <!--<input-box label="登录密码" type="password" v-model="newForm.loginUserPwd"></input-box>-->
        <!--<input-box label="再次输入登录密码" type="password" v-model="vertify.newLoginUserPwd"></input-box>-->
        <input-box label="手机号码" v-model="newForm.userPhone"></input-box>
        <input-box label="用户邮箱" v-model="newForm.userEmail"></input-box>
        <!--<input-box label="角色ID（多个角色用逗号分开）" v-model="newForm.rolesId"></input-box>-->
        <div>
          <check-box style="width: 30%;" v-model="newForm.isAllQuery" text="是否查看全部记录"></check-box>

          <check-box style="width: 30%;" v-model="newForm.isPassIssue" text="是否跳过审核"></check-box>

          <check-box style="width: 30%;" v-model="newForm.isUpdateDown" text="是否修改后下架"></check-box>
        </div>
        <div class="relative input-box">
          <label>角色</label>
          <div style="padding-left: 50px;">
            <tag v-for="item in newRoles" :key="item" small>{{getRole(item)}}</tag>
            <icon-btn small @click="newRolesShow = true">edit</icon-btn>
          </div>
        </div>
      </div>
      <div class="layer-btns">
        <btn flat @click="newShow = false">取消</btn>
        <btn flat color="#66BB6A" @click="submitNew">提交</btn>
      </div>
    </layer>

    <layer v-if="editShow" title="编辑用户" width="600px">
      <div class="layer-text">
        <input-box label="用户名称" v-model="editForm.userName"></input-box>
        <input-box label="手机号码" v-model="editForm.userPhone"></input-box>
        <input-box label="用户邮箱" v-model="editForm.userEmail"></input-box>
        <!--<input-box label="角色ID（多个角色用逗号分开）" v-model="editForm.rolesId"></input-box>-->
        <div>
          <check-box style="width: 30%;" v-model="editForm.isAllQuery" text="是否查看全部记录"></check-box>

          <check-box style="width: 30%;" v-model="editForm.isPassIssue" text="是否跳过审核"></check-box>

          <check-box style="width: 30%;" v-model="editForm.isUpdateDown" text="是否修改后下架"></check-box>
        </div>
        <div class="relative input-box">
          <label>角色</label>
          <div style="padding-left: 50px;">
            <tag v-for="item in editRoles" :key="item" small>{{getRole(item)}}</tag>
            <icon-btn small @click="editRolesShow = true">edit</icon-btn>
          </div>
        </div>
      </div>
      <div class="layer-btns">
        <btn flat @click="editShow = false">取消</btn>
        <btn flat color="#66BB6A" @click="submitEdit">提交</btn>
      </div>
    </layer>

    <select-card :value="newRoles" multiple v-if="newRolesShow" title="选择用户角色" width="600px" maskClick @close="newRolesShow = false">
      <select-card-option v-for="item in rolesList" :value="item.id" :key="item.id" @click="selectNewRole(item.id)">{{item.rolesCnName}}</select-card-option>
    </select-card>
    <select-card :value="editRoles" multiple v-if="editRolesShow" title="选择用户角色" width="600px" maskClick @close="editRolesShow = false">
      <select-card-option v-for="item in rolesList" :value="item.id" :key="item.id" @click="selectEditRole(item.id)">{{item.rolesCnName}}</select-card-option>
    </select-card>
  </div>
</template>

<script>
import SelectCard from '@/components/select-card/index'
import SelectCardOption from '@/components/select-card/option'

export default {
  name: 'users-all',
  components: { SelectCard, SelectCardOption },
  data () {
    return {
      loading: true,
      list: [],
      rolesList: [],
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
        // loginUserPwd: '',
        userPhone: '',
        userEmail: '',
        rolesId: '',
        isAllQuery: false,
        isPassIssue: false,
        isUpdateDown: false
      },
      newLoginUserNameHint: '',
      editShow: false,
      editForm: {
        id: '',
        userName: '',
        userPhone: '',
        userEmail: '',
        rolesId: ''
      },
      newRolesShow: false,
      editRolesShow: false
    }
  },
  computed: {
    newRoles: {
      get () {
        if (this.newForm.rolesId === '') return []
        return this.newForm.rolesId.split(',')
      },
      set (value) {
        this.newForm.rolesId = value.join(',')
      }
    },
    editRoles: {
      get () {
        if (this.editForm.rolesId === '') return []
        return this.editForm.rolesId.split(',')
      },
      set (value) {
        this.editForm.rolesId = value.join(',')
      }
    }
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/sysUser/queryList.monitor', {
        pageSize: 10,
        toPage: this.page
      }).then(
        res => {
          console.log(res)
          this.list = res.pages
          this.total = res.totalPage * 10
          this.loading = false
        }
      )
    },
    openDetail (id) {
      this.$http.post('/cri-cms-platform/sysUser/updateQuery.monitor', { id }).then(
        res => {
          this.detail = res
          this.detailShow = true
        }
      ).catch(
        res => {
          this.$toast(res.msg)
          console.log(res)
        }
      )
    },

    // 新建用户
    openNew () {
      this.vertify.newLoginUserPwd = ''
      this.newForm = {
        userName: '',
        loginUserName: '',
        // loginUserPwd: '',
        userPhone: '',
        userEmail: '',
        rolesId: '',
        isAllQuery: false,
        isPassIssue: false,
        isUpdateDown: false
      }
      this.newLoginUserNameHint = ''
      this.newShow = true
    },
    vertifyLoginUserName () {
      if (this.newForm.loginUserName === '') return
      this.$http.post('/cri-cms-platform/sysUser/valident.monitor', {
        param: this.newForm.loginUserName
      }).then(
        res => {
          console.log(res)
          if (Number(res.validate)) {
            this.newLoginUserNameHint = '登录名可用'
          } else {
            this.newLoginUserNameHint = '登录名不可用'
          }
        }
      ).catch(
        res => {
          console.log(res)
          this.$toast(res.msg)
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
      if (this.newLoginUserNameHint === '登录名不可用') {
        this.$toast('登录名不可用')
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

      let obj = {...this.newForm}
      obj.isAllQuery = obj.isAllQuery == true ? 1 : 0
      obj.isPassIssue = obj.isPassIssue == true ? 1 : 0
      obj.isUpdateDown = obj.isUpdateDown == true ? 1 : 0

      this.$http.post('/cri-cms-platform/sysUser/save.monitor', obj).then(
        res => {
          this.$toast(res.msg)
          this.getList()
          this.newShow = false
        }
      ).catch(
        res => {
          this.$toast(res.msg)
          console.log(res)
        }
      )
    },
    openEdit (id) {
      if (Object.keys(this.detail).length !== 0 && this.detail.sysUser.id === id) {
        this.editForm.id = this.detail.sysUser.id
        this.editForm.userName = this.detail.sysUser.userName
        this.editForm.userPhone = this.detail.sysUser.userPhone
        this.editForm.userEmail = this.detail.sysUser.userEmail
        this.editForm.rolesId = this.detail.roleIds.join(',')
        this.editForm.isAllQuery = this.detail.isAllQuery == 0 ? false : true
        this.editForm.isPassIssue = this.detail.isPassIssue == 0 ? false : true
        this.editForm.isUpdateDown = this.detail.isUpdateDown == 0 ? false : true
        this.editShow = true
        return
      }
      this.$http.post('/cri-cms-platform/sysUser/updateQuery.monitor', { id }).then(
        res => {
          this.editForm.id = res.sysUser.id
          this.editForm.userName = res.sysUser.userName
          this.editForm.userPhone = res.sysUser.userPhone
          this.editForm.userEmail = res.sysUser.userEmail
          this.editForm.rolesId = res.roleIds.join(',')
          this.editForm.isAllQuery = res.sysUser.isAllQuery == 0 ? false : true
          this.editForm.isPassIssue = res.sysUser.isPassIssue == 0 ? false : true
          this.editForm.isUpdateDown = res.sysUser.isUpdateDown == 0 ? false : true
          this.editShow = true
          console.log(res)
        }
      ).catch(
        res => {
          this.$toast(res.msg)
          console.log(res)
        }
      )
    },
    submitEdit () {
      if (this.editForm.userName === '') {
        this.$toast('请输入用户名称')
        return
      }
      if (this.editForm.userPhone === '') {
        this.$toast('请输入手机号码')
        return
      }
      if (this.editForm.userEmail === '') {
        this.$toast('请输入用户邮箱')
        return
      }

      let obj = {...this.editForm}

      obj.isAllQuery = obj.isAllQuery == true ? 1 : 0
      obj.isPassIssue = obj.isPassIssue == true ? 1 : 0
      obj.isUpdateDown = obj.isUpdateDown == true ? 1 : 0

      this.$http.post('/cri-cms-platform/sysUser/update.monitor', obj).then(
        res => {
          this.getList()
          this.editShow = false
          this.detailShow = false
        }
      )
    },
    auditUser (id) {
      this.$http.post('/cri-cms-platform/sysUser/updateAudit.monitor', { id }).then(
        res => {
          this.$toast('审核成功')
          this.getList()
          this.detailShow = false
        }
      ).catch(
        res => {
          this.$toast(res.msg)
          console.log(res)
        }
      )
    },
    backPassWd (id) {
      let othis = this
      this.$confirm({
        title: '确定要重置用户密码？',
        text: '用户密码将恢复为初始密码',
        btns: ['取消', '重置'],
        color: 'red',
        yes () {
          othis.$http.post('/cri-cms-platform/sysUser/backPassWd.monitor', { id }).then(
            res => {
              console.log(res)
              othis.$toast(res.msg)
              othis.getList()
              othis.detailShow = false
            }
          ).catch(
            res => {
              othis.$toast(res.msg)
              console.log(res)
            }
          )
        },
        no () {

        }
      })
    },
    deleteUser (id) {
      this.$http.post('/cri-cms-platform/sysUser/del.monitor', { id }).then(
        res => {
          this.$toast('删除成功')
          this.getList()
          this.detailShow = false
        }
      ).catch(
        res => {
          this.$toast(res.msg)
          console.log(res)
        }
      )
    },
    restoreUser (id) {
      this.$http.post('/cri-cms-platform/sysUser/userStatusBack.monitor', { id }).then(
        res => {
          this.$toast('恢复成功')
          this.getList()
          this.detailShow = false
        }
      ).catch(
        res => {
          this.$toast(res.msg)
          console.log(res)
        }
      )
    },
    getRole (value) {
      if (value === '') return ''
      return this.rolesList.find(v => {
        return value === v.id
      }).rolesCnName
    },
    selectNewRole (id) {
      let index = this.newRoles.findIndex(v => v === id)
      let tempArr = this.newRoles.map(v => v)
      if (index === -1) {
        tempArr.push(id)
      } else {
        tempArr.splice(index, 1)
      }
      this.newRoles = tempArr
    },
    selectEditRole (id) {
      let index = this.editRoles.findIndex(v => v === id)
      let tempArr = this.editRoles.map(v => v)
      if (index === -1) {
        tempArr.push(id)
      } else {
        tempArr.splice(index, 1)
      }
      this.editRoles = tempArr
    }
  },
  filters: {
    status (value) {
      if (value === '00') {
        return '正常'
      } else {
        return '停用'
      }
    }
  },
  created () {
    Promise.all([
      this.$http.post('/cri-cms-platform/sysUser/queryList.monitor', {
        pageSize: 10,
        toPage: this.page
      }),
      this.$http.post('/cri-cms-platform/sysUser/roles.monitor')
    ]).then(
      res => {
        console.log(res)
        this.list = res[0].pages
        this.total = res[0].totalPage * 10

        this.rolesList = res[1].roles
        this.loading = false
      }
    )
  }
}
</script>

<style lang="less">

</style>
