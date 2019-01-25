<template>
  <div class="abs bg-f flex app-audit">
    <af-left color="#00897B" vibrant-color="#00897B" bg-color="#E0F2F1" title="操作日志" >
      <navigator-item icon="folder" index="0" @click="$router.replace('/userOperLog?operType=login')">登录</navigator-item>
      <navigator-item icon="folder" index="1" @click="$router.replace('/userOperLog?operType=oper')">操作</navigator-item>
    </af-left>

    <div class="operlog_list scroll-y">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div class="af-topbar">
        <span class="f-18">{{$route.query.operType == 'login' ? '登录' : '操作'}}</span>
      </div>

      <div class="flex-item relative" style="max-width: 1000px;margin: 0 auto;">
        <div class="setting-card f-14" style="position: relative;">
          <div class="search_navbox">
            <div class="option-item flex-v-center relative a" @click="flagShow=!flagShow">
              <span class="flex-item" style="display: inline-block;width: 100px;">选择类型：</span>
              <span class="flex-item">{{appname}}</span>
              <i class="icon f-20 c-a">keyboard_arrow_down</i>
              <bubble v-if="flagShow" pos="bottom" align="center" @close="flagShow=false">
                <ul>
                  <li v-for="item in appTypeList" @click="appChange(item)">{{item.name}}</li>
                </ul>
              </bubble>
            </div>

            <div>
              <vue-datepicker-local v-model="searchTime" format="YYYY-MM-DD" show-buttons></vue-datepicker-local>
              <btn style="margin-left: 10px;" @click="search">搜索</btn>
            </div>
          </div>

          <table>
            <thead>
              <th>序号</th>
              <th>用户名称</th>
              <th>登录帐号</th>
              <th>操作时间</th>
              <th>操作IP</th>
              <th>操作对象</th>
              <th>操作说明</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list">
                <td>{{index + 1}}</td>
                <td>{{item.userName}}</td>
                <td>{{item.createUser}}</td>
                <td>{{item.createDate}}</td>
                <td>{{item.operIp}}</td>
                <td>{{item.typeDemo}}</td>
                <td>{{item.demo}}</td>
              </tr>
            </tbody>
          </table>
          <div class="flex-center">
            <pagination :page="filter.toPage" :total="total" @change="p => { filter.toPage = p;getList(); }"></pagination>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import VueDatepickerLocal from 'vue-datepicker-local'
  import moment from 'moment'
  import AfLeft from '@/components/app-frame/afLeft'

  export default {
    name: 'settings-member',
    components: { VueDatepickerLocal, AfLeft },
    data () {
      return {
        searchTime: [],
        loading: false,
        list: [],
        appTypeList: [],
        filter: {
          toPage: 1
        },
        total: 1,
        totalRowsAmount: '',
        flagShow: false,
        app: '',
        appname: ''
      }
    },
    methods: {
      appChange (data) {
        this.app = data.app
        this.appname = data.name
        this.getList()
      },
      search () {
        this.loading = true
        this.$http.post('cri-cms-platform/userOperLog/page.monitor', {
          toPage: 1,
          startTime: moment(this.searchTime[0]).format('YYYY-MM-DD'),
          endTime: moment(this.searchTime[1]).format('YYYY-MM-DD')
        }).then(
          res => {
            console.log(res)
            this.list = res.data
            this.totalRowsAmount = res.totalRowsAmount
            this.total = res.totalPage * 15
            this.loading = false
          }
        ).catch(
          res => {
            console.log(res)
          }
        )
      },
      getList () {
        this.loading = true
        console.log(this.$route.query)
        this.$http.post('cri-cms-platform/userOperLog/page.monitor', {
          operType: this.$route.query.operType,
          toPage: this.filter.toPage,
          startTime: this.searchTime[0] ? moment(this.searchTime[0]).format('YYYY-MM-DD') : '',
          endTime: this.searchTime[1] ? moment(this.searchTime[1]).format('YYYY-MM-DD') : '',
          app: '',
          operFlag: ''
        }).then(
          res => {
            console.log(res)
            this.list = res.data
            this.filter = {
              toPage: res.current
            }
            this.total = res.totalPage
            this.loading = false
          }
        ).catch(
          res => {
            console.log(res)
          }
        )
      },
    },
    created () {
      this.getList()
      let arr = this.$store.state.account.appTypeList
      for (let i in arr) {
        let o = {}
        o.name = arr[i]
        o.app = i
        console.log(o)
        this.appTypeList.push(o)
      }
    },
    watch: {
      '$route.query.operType' () {
        this.getList()
      }
    }
  }
</script>

<style lang="less">
  .operlog_list{
    width: calc(100% - 200px);
  }
  .search_navbox{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  th,td {padding: 10px 10px;}
  tr {border-top: 1px solid #e1e1e1;cursor: pointer;}
  tr:hover {background: rgba(0, 0, 0, .05);}
</style>
