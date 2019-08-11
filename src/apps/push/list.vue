<template>
  <div class="app-sites flex-col c-6">
    <div class="af-topbar">
      <span class="f-18">创建列表</span>
    </div>

    <div class="flex-item scroll-y bg-e relative">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div class="setting-card f-14">
        <table>
          <thead>
          <th>序列</th>
          <th>创建人</th>
          <th>推送内容</th>
          <th>创建时间</th>
          </thead>
          <tbody>
          <tr v-for="(item, index) in list" :key="item.id">
            <td>{{index + 1}}</td>
            <td>{{item.createUser}}</td>
            <td>{{item.content}}</td>
            <td>{{item.createTime}}</td>
          </tr>
          </tbody>
        </table>

        <div class="flex-center">
          <pagination :page="filter.toPage" :size="filter.pageSize" :total="total" @change="p => { filter.toPage = p;getList(); }"></pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [],
        loading: false,
        filter: {
          pageSize: 15,
          toPage: 1
        },
        total: 1,
      }
    },
    methods: {
      getList () {
        this.$http.post('/cri-cms-platform/appPush/list.monitor', this.filter).then(res => {
          console.log(res)
          res.pages.forEach(v => {
            v.stateShow = false
          })
          this.list = res.pages
          this.total = res.totalPage * 15
          this.loading = false
        })
      }
    },
    beforeMount () {
      this.getList()
    }
  }
</script>

<style lang="less">
  .app-sites {
    background: #fafafa;
    .setting-card {
      max-width: 1440px;
      margin: 20px auto;
      border-radius: 10px;
      padding: 20px;
      background: #fff;
      th, td {
        padding: 5px 10px;
      }
      tr {
        border-top: 1px solid #e1e1e1;
      }
      tr:hover {
        background: rgba(0, 0, 0, .05);
      }
    }
    .add-site-btn {
      color: #008cff;
      padding: 14px 30px;
      cursor: pointer;
      transition: background .2s;
      &:active {
        background: #e1e1e1;
      }
    }
  }
</style>
