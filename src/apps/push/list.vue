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
          <th style="text-align: center;">序列</th>
          <th style="text-align: center;">创建人</th>
          <th style="text-align: center;">推送内容</th>
          <th style="text-align: center;">创建时间</th>
          <th style="text-align: center;">状态</th>
          </thead>
          <tbody>
          <tr v-for="(item, index) in list" :key="item.id">
            <td>{{index + 1}}</td>
            <td>{{item.createUser}}</td>
            <td>
              <div style="max-width: 700px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                {{item.content}}
              </div>
            </td>
            <td>{{item.createTime}}</td>
            <td :style="{'color': returnState(item.status).color}">{{returnState(item.status).value}}</td>
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
      },
      returnState (data) {
        if (data == '01') {
          return {
            value: '已推送',
            color: '#12a71a'
          }
        } else if (data == '02') {
          return {
            value: '待推送',
            color: '#3e50ff'
          }
        } else if (data == '00') {
          return {
            value: '推送失败',
            color: '#f00'
          }
        }
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
