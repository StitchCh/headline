<template>
  <div class="abs bg-f flex app-audit" style="margin-bottom: 50px;">
    <af-left color="#00897B" vibrant-color="#00897B" bg-color="#E0F2F1" title="操作日志" >
      <navigator-item icon="folder" index="login" @click="$router.replace('/userOperLog?operType=login')">登录</navigator-item>
      <navigator-item icon="folder" index="oper" @click="$router.replace('/userOperLog?operType=oper')">操作</navigator-item>
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

      <div style="background: #eee;padding: 30px 0;" class="flex-item">
        <div class="relative" style="max-width: 1000px;margin: 0 auto;background: #fff;padding: 30px;border-radius: 10px;">
        <div class="setting-card f-14" style="position: relative;">
          <div class="search_navbox" style="margin-bottom: 20px;">
            <div class="flex-v-center">
              <!--<span class="flex-item" style="display: inline-block;width: 70px;">选择类型：</span>-->
              <div v-if="$route.query.operType != 'login'" style="display: inline-block;width: 80px;height: 23px;margin-right: 20px;" class="option-item flex-item relative a" @click="flagShow=!flagShow">
                <span class="flex-item" style="text-align: center;">选择类型</span>
                <i class="icon f-20 c-a" style="position: absolute;right: 0;top: 0;">keyboard_arrow_down</i>
                <bubble v-if="flagShow" pos="bottom" align="center" @close="flagShow=false">
                  <ul style="padding: 6px 0;">
                    <!--<li style="width: 70px;text-align: center;" @click="appChange('all')">全部</li>-->
                    <!--<li style="width: 70px;text-align: center;" v-for="item in appTypeList" @click="appChange(item)">{{item.name}}</li>-->
                    <li class="a flex-v-center" style="width: 50px;padding: 0 10px;" v-for="item in appTypeList" @click="item.state = !item.state;appChange(item)">
                      <span class="flex-item">{{item.name}}</span>
                      <i v-if="item.state" class="icon f-14 blue check-ico">check</i>
                    </li>
                  </ul>
                </bubble>
              </div>

              <div v-if="$route.query.operType != 'login'" style="display: inline-block;width: 80px;height: 23px;" class="option-item flex-item relative a" @click="operFlagShow=!operFlagShow">
                <span class="flex-item" style="text-align: center;">操作类型</span>
                <i class="icon f-20 c-a" style="position: absolute;right: 0;top: 0;">keyboard_arrow_down</i>
                <bubble v-if="operFlagShow" pos="bottom" align="center" @close="operFlagShow=false">
                  <ul style="padding: 6px 0;">
                    <!--<li style="width: 70px;text-align: center;" @click="appChange('all')">全部</li>-->
                    <!--<li style="width: 70px;text-align: center;" v-for="item in appTypeList" @click="flagChange(item)">{{item.name}}</li>-->
                    <li class="a flex-v-center" style="width: 50px;padding: 0 10px;" v-for="item in operFlagList" @click="item.state = !item.state;flagChange(item)">
                      <span class="flex-item">{{item.name}}</span>
                      <i v-if="item.state" class="icon f-14 blue check-ico">check</i>
                    </li>
                  </ul>
                </bubble>
              </div>
            </div>

            <div>
              <vue-datepicker-local v-model="searchTime" format="YYYY-MM-DD" show-buttons></vue-datepicker-local>
              <btn style="margin-left: 10px;" @click="search">搜索</btn>
            </div>
          </div>

          <table>
            <thead>
              <th nowrap>序号</thnowrap>
              <th nowrap>用户名称</th>
              <th nowrap>登录帐号</th>
              <th nowrap>操作时间</th>
              <th nowrap>操作IP</th>
              <th nowrap>操作对象</th>
              <th nowrap>操作说明</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list">
                <td nowrap>{{index + 1}}</tdnowrap>
                <td nowrap>{{item.userName}}</td>
                <td nowrap>{{item.createUser}}</td>
                <td nowrap>{{item.createDate}}</td>
                <td nowrap>{{item.operIp}}</td>
                <td nowrap style="text-overflow: ellipsis;" :title="item.typeDemo">{{item.typeDemo}}</td>
                <td nowrap>{{item.demo}}</td>
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
      operFlagShow: false,
      list: [],
      appTypeList: [],
      filter: {
        toPage: 1
      },
      total: 1,
      totalRowsAmount: '',
      flagShow: false,
      app: [],
      operFlag: [],
      operFlagList: [
        {
          name: '登录',
          app: 'ogin',
          state: false
        },
        {
          name: '发布',
          app: 'issue',
          state: false
        },
        {
          name: '审核',
          app: 'pass',
          state: false
        },
        {
          name: '删除',
          app: 'delete',
          state: false
        },
        {
          name: '新增',
          app: 'add',
          state: false
        },
        {
          name: '驳回',
          app: 'reject',
          state: false
        }
      ],
    }
  },
  methods: {
    flagChange (data) {
      this.operFlag = []
      this.operFlagList.forEach(item => {
        if (item.state) {
          this.operFlag.push(item.app)
        }
      })
      this.getList()
    },
    appChange (data) {
      this.app = []
      this.appTypeList.forEach(item => {
        if (item.state) {
          this.app.push(item.app)
        }
      })
      this.getList()
    },
    search () {
      this.loading = true
      this.$http.post('cri-cms-platform/userOperLog/page.monitor', {
        toPage: 1,
        operType: this.$route.query.operType,
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
      this.$http.post('cri-cms-platform/userOperLog/page.monitor', {
        operType: this.$route.query.operType,
        toPage: this.filter.toPage,
        startTime: this.searchTime[0] ? moment(this.searchTime[0]).format('YYYY-MM-DD') : '',
        endTime: this.searchTime[1] ? moment(this.searchTime[1]).format('YYYY-MM-DD') : '',
        app: this.app.join(','),
        operFlag: this.operFlag.join(',')
      }).then(
        res => {
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
      o.state = false
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
  tr {border-top: 1px solid #e1e1e1;cursor: pointer;}
  tr:hover {background: rgba(0, 0, 0, .05);}
  .search_navbox .datepicker-range .datepicker-popup{
    width: 415px !important;
  }
</style>
<style scoped>
  th,td {padding: 10px 10px;max-width: 300px;overflow: hidden;}
</style>
