<template>
  <div class="abs bg-f c-6 flex-col app-collection">
    <div class="af-topbar flex-v-center">
      <dock title="采集" color="#2088ff"/>
      <div class="flex-item"></div>
      <account/>
    </div>
    <div class="flex-item scroll-y bg-e relative collection-content">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div class="setting-card f-14" style="min-height: 400px;">
        <div class="search_box">
          <div class="seaceh_list">来源：</div>
          <div v-for="item in sourceList" class="seaceh_list" :key="item.value">
             <label>
                <check-box v-model="item.state"></check-box><span>{{item.value}}</span>
             </label>
          </div>
        </div>
        <div class="search_box" style="margin-bottom: 30px;">
          <div class="seaceh_list">
            <span>搜索内容：</span>
            <input v-model="title" style="padding: 0 15px;height: 32px;width: 200px;border:1px solid #e5e5e5;" type="text">
          </div>
          <div class="seaceh_list">
            <vue-datepicker-local v-model="searchTime" format="YYYY-MM-DD" show-buttons></vue-datepicker-local>
          </div>
          <div class="seaceh_list">
            <btn @click="search">搜索</btn>
          </div>
        </div>

        <table>
          <thead>
            <th style="width: 100px;"><p>关键词</p></th>
            <th style="width: 100px;"><p>来源</p></th>
            <th style="width: calc(50% - 150px);"><p>标题</p></th>
            <th style="width: calc(50% - 150px);"><p>连接</p></th>
            <th style="width: 100px;"><p>采集日期</p></th>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index"  @click="openUrl(item.url)">
              <td style="width: 100px;"><p>{{item.keyWord}}</p></td>
              <td style="width: 100px;"><p>{{item.source}}</p></td>
              <td style="width: calc(50% - 150px);"><p>{{item.title}}</p></td>
              <td style="width: calc(50% - 150px);"><p>{{item.url}}</p></td>
              <td style="width: 100px;"><p>{{item.createDate}}</p></td>
            </tr>
          </tbody>
        </table>
        <div class="flex-center">
          <pagination :page="page" :size="20" :total="total" @change="p => { page = p;search(); }"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import Dock from '@/components/dock'
import VueDatepickerLocal from 'vue-datepicker-local'
import moment from 'moment'

export default {
  name: 'app-collection',
  components: { Account, Dock, VueDatepickerLocal },
  data () {
    return {
      loading: false,
      searchTime: [],
      list: [],
      page: 1,
      total: 1,
      title: '',
      source: '',
      sourceList: [
        {
          value: '人民网',
          state: false
        },
        {
          value: '卫星网',
          state: false
        },
        {
          value: '中国驻俄罗斯大使馆',
          state: false
        },
        {
          value: '俄罗斯驻华使馆',
          state: false
        },
        {
          value: 'PNA',
          state: false
        },
        {
          value: '俄罗斯报',
          state: false
        },
        {
          value: '俄罗斯外交部',
          state: false
        },
        {
          value: '东北网',
          state: false
        },
        {
          value: '新华网',
          state: false
        }
      ]
    }
  },
  methods: {
    search () {
      this.loading = true
      let source = ''
      this.sourceList.forEach(item => {
        if (item.state) {
          source = source + item.value + ','
        }
      })
      let startTime = ''
      let endTime = ''
      if (this.searchTime.length == 2) {
        startTime = moment(this.searchTime[0]).format('YYYY-MM-DD')
        endTime = moment(this.searchTime[1]).format('YYYY-MM-DD')
      }
      this.$http.post("/cri-cms-platform/collectionNew/queryListCollectionNew.monitor", {
        page: this.page,
        startTime: startTime,
        endTime: endTime,
        source: source,
        title: this.title
      }).then(res => {
        this.list = res.pages
        this.total = res.totalRowsAmount
      }).catch(res => {
        this.$toast(res.msg)
      }).finally(() => {
        this.loading = false
      })
    },
    getList () {
      this.loading = true
      this.$http
        .post(
          '/cri-cms-platform/collectionNew/queryListCollectionNew.monitor',
          {
            page: this.page
          }
        )
        .then(res => {
          console.log(res)
          this.list = res.pages
          this.total = res.totalRowsAmount
        })
        .catch(res => {
          this.$toast(res.msg)
        })
        .finally(() => {
          this.loading = false
        })
    },
    openUrl (url) {
      window.open(url)
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped>
  .search_box{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 10px;
  }
  .seaceh_list{
    margin-right: 20px;
  }
  .seaceh_list .check-box{
    margin: 0;
  }
</style>

<style  lang="less">
  .datepicker-range .datepicker-popup {
    width: 420px!important;
    right: -50px;
    left: auto;
  }
.app-collection {
  .collection-content {
    .setting-card {
      max-width: 1440px;
      margin: 20px auto;
      border-radius: 10px;
      padding: 20px;
      background: #fff;
      th,
      td {
        padding: 5px 10px;
      }
      th>p, td>p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
        max-width: 480px;
      }
      tr {
        border-top: 1px solid #e1e1e1;
        cursor: pointer;
      }
      tr:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }
  .account {
    position: absolute;
    right: 15px;
    top: 8px;
    z-index: 30;
  }
  .navigator-item.active {
    background: #66bb6a;
    color: #fff;
  }
  .navigator-item .icon {
    transition: none;
  }
  .collection-content {
    //background: #fafafa;
    .setting-card {
      max-width: 1440px;
      margin: 20px auto;
      border-radius: 10px;
      padding: 20px;
      background: #fff;
      overflow: auto;
      th,
      td {
        padding: 5px 10px;
      }
      tr {
        border-top: 1px solid #e1e1e1;
        cursor: pointer;
      }
      tr:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
    .add-btn {
      color: #008cff;
      padding: 14px 30px;
      cursor: pointer;
      transition: background 0.2s;
      &:active {
        background: #e1e1e1;
      }
    }
    .layer-text {
      th,
      td {
        padding: 5px 15px;
      }
      th {
        width: 130px;
      }
    }
  }
}
</style>
