<template>
  <div class="app-members-list flex-col c-6">
    <div class="af-topbar">
      会员
    </div>
    <div class="flex-item scroll-y">
      <div class="card">
        <table>
          <thead>
          <th>昵称</th>
          <th>手机</th>
          <th>邮箱</th>
          <th>最后登录</th>
          <th colspan="3">操作</th>
          </thead>
          <tbody>
          <tr v-for="item in list" :key="item.id" @click="openDetail(item.id)">
            <td>{{item.nickname}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.thisTimeLoginTime}}</td>
            <td>{{item.thisTimeLoginTime}}</td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'编辑'" small @click.stop.native="openEdit(item.id)">edit</icon-btn>
            </td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'查看'" small @click.stop.native="openDetail(item.id)">
                info
              </icon-btn>
            </td>
            <td style="width: 30px;"><icon-btn v-tooltip="'审核'" v-if="item.userStatus === '01'" small @click.stop.native="auditUser(item.id)">find_in_page</icon-btn></td>
          </tr>
          </tbody>
        </table>
        <div class="flex-center">
          <pagination :page="page" :size="10" :total="total" @change="p => { page = p;getList(); }"></pagination>
        </div>
      </div>
    </div>

    <layer v-if="detailShow" title="会员信息" width="600px" maskClick @close="detailShow = false">
      <div class="layer-text">
        <table>
          <tbody>
          </tbody>
        </table>
      </div>
      <div class="layer-btns">
        <btn flat color="#66BB6A" @click="detailShow = false">关闭</btn>
      </div>
    </layer>

    <layer v-if="editShow" title="会员信息" width="600px">
      <div class="layer-text">
        asdsa
      </div>
      <div class="layer-btns">
        <btn flat @click="editShow = false">取消</btn>
        <btn flat color="#66BB6A" @click="submitEdit">提交</btn>
      </div>
    </layer>
  </div>
</template>

<script>
export default {
  name: 'settings-user',
  data () {
    return {
      list: [],
      total: 1,
      page: 1,
      detail: {},
      detailShow: false,
      editShow: false
    }
  },
  methods: {
    getList () {
      this.$http.post('/cri-cms-platform/member/list.monitor', {
        pageSize: 10,
        toPage: this.page
      }).then(
        res => {
          this.list = res.pages
          this.total = res.totalPage * 10
          this.loading = false
        }
      ).catch(
        res => {
          console.log(res)
        }
      )
    },
    openDetail (id) {
      this.detailShow = true
    },
    openEdit () {

    }
  },
  created () {
    Promise.all([
      this.$http.post('/cri-cms-platform/member/list.monitor', {
        pageSize: 10,
        toPage: this.page
      })
    ]).then(
      res => {
        this.list = res[0].pages
        this.total = res[0].totalPage * 10
        this.loading = false
      }
    )
  }
}
</script>

<style lang="less">
  .app-members-list {
    background: #fafafa;
    color: #666;
    .card {
      max-width: 1440px;
      margin: 20px auto;
      border-radius: 6px;
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, .15);
      padding: 20px;
      th, td {
        padding: 5px 10px;
        font-size: 14px;
      }
      tr {
        border-top: 1px solid #e1e1e1;
      }
      tr:hover {
        background: rgba(0, 0, 0, .07);
      }
    }
  }
</style>
