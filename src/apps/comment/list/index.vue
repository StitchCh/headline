<template>
  <div class="app-comments-list flex-col c-6">
    <div class="af-topbar">
      会员
    </div>
    <div class="flex-item scroll-y">
      <div class="card">
        <table>
          <thead>
          <th>会员昵称</th>
          <th>IP</th>
          <th>标题</th>
          <th>评论内容</th>
          <th>时间</th>
          <th>状态</th>
          <th colspan="3">操作</th>
          </thead>
          <tbody>
          <tr v-for="item in list" :key="item.id" @click="openDetail(item.id)">
            <td>{{item.memberName?item.memberName:'-'}}</td>
            <td>{{item.clientIp?item.clientIp:'-'}}</td>
            <td>{{item.contentTitle?item.contentTitle:'-'}}</td>
            <td>{{item.content}}</td>
            <td>{{item.createTime}}</td>
            <td>{{item.auditStatus == '1'?'通过':'未通过' }}</td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'编辑'" small @click.stop.native="openEdit(item.id)">edit</icon-btn>
            </td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'查看'" small @click.stop.native="openDetail(item.id)">
                info
              </icon-btn>
            </td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'审核'" v-if="item.userStatus === '01'" small @click.stop.native="auditUser(item.id)">
                find_in_page
              </icon-btn>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="flex-center">
          <pagination :page="page" :size="10" :total="total" @change="p => { page = p;getList(); }"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-comment',
    data () {
      return {
        list: [],
        total: 1,
        page: 1,
        detail: {},
        detailShow: false,
        editShow: false,
        detail: {}
      }
    },
    methods: {
      getList () {
        this.$http.post('/cri-cms-platform/comment/list.monitor', {
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
        this.$http.post('/cri-cms-platform/comment/get.monitor', {
          id: id
        }).then(
          res => {
            this.detailShow = true
            this.detail = res
          }
        ).catch(
          res => {
            console.log(res)
          }
        )
      },
      openEdit (id) {
        this.$http.post('/cri-cms-platform/member/view.monitor', {
          id: id
        }).then(
          res => {
          }
        ).catch(
          res => {
            console.log(res)
          }
        )
      }
    },
    created () {
      Promise.all([
        this.$http.post('/cri-cms-platform/comment/list.monitor', {
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
  .app-comments-list {
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
    .layer-text {
      th, td {
        padding: 5px 15px;
      }
      th {
        width: 130px;
      }
    }
  }
</style>
