<template>
<div class="af-center flex-col">
  <div class="af-topbar flex-center">
    <icon-btn v-if="!$route.query.article_theme" class="add-btn" v-tooltip:bottom="'添加'" @click="$emit('add')">add</icon-btn>
  </div>
  <div class="flex-v-center filter-bar c-6 f-13">
    <i class="icon c-a a item" :class="{ active: filter.recommend }" v-tooltip:top="'推荐'" @click="filter.recommend = ~~!filter.recommend || '';getList(true)">thumb_up</i>
    <span class="flex-item"></span>
    <i class="icon c-a a item" style="font-size:18px;" v-tooltip:top="'搜索'" @click="ui.searchShow=!ui.searchShow">search</i>
    <!-- <div class="relative">
      <div class="relative flex-v-center a item" v-tooltip:top="'筛选栏目'" @click="ui.channelShow=true">
        <span>{{channelName}}</span><i class="icon c-a">keyboard_arrow_down</i>
      </div>
      <bubble v-if="ui.channelShow" pos="bottom" align="center" @close="ui.channelShow=false">
        <ul class="filter-bubble">
          <li @click="filter.channelIds=''" class="a flex-v-center">
            <span class="flex-item">全部频道</span>
            <i class="icon f-14 blue check-ico" v-if="!filter.channelIds">check</i>
          </li>
          <li v-for="channel in ui.channels" :key="channel.id" @click="filter.channelIds=channel.id" class="a flex-v-center">
            <span class="flex-item">{{channel.channelName}}</span>
            <i class="icon f-14 blue check-ico" v-if="filter.channelIds === channel.id">check</i>
          </li>
        </ul>
      </bubble>
    </div> -->
    <div class="relative">
      <div class="relative flex-v-center a item" v-tooltip:top="'筛选栏目'" @click="ui.channelShow=true">
        <span>筛选</span><i class="icon c-a">keyboard_arrow_down</i>
      </div>
      <bubble v-if="ui.channelShow" pos="bottom" align="center" @close="ui.channelShow=false">
        <div style="padding: 10px 0;width: 280px;">
          <tree :data="ui.channels" pid-txt="channelPartentId" nameTxt="channelName" show-checkbox :checked-list.sync="channels"></tree>
        </div>
      </bubble>
    </div>
    <div class="relative">
      <div class="relative flex-v-center a item" v-tooltip:top="'排序'" @click="ui.orderShow=true">
        <span>排序</span><i class="icon c-a">keyboard_arrow_down</i>
      </div>
      <bubble v-if="ui.orderShow" pos="bottom" align="center" @close="ui.orderShow=false">
        <ul class="filter-bubble">
          <li class="a flex-v-center" v-for="by in ui.orderby" :key="by.id" @click="filter.orderby=by.id">
            <span class="flex-item">{{by.name}}</span>
            <i v-if="filter.orderby === by.id" class="icon f-14 blue check-ico">check</i>
          </li>
          <li class="split-line"></li>
          <li class="a flex-v-center" @click="filter.order='asc'"><span class="flex-item">升序</span><i class="icon f-14 blue check-ico" v-if="filter.order === 'asc'">check</i></li>
          <li class="a flex-v-center" @click="filter.order='desc'"><span class="flex-item">降序</span><i class="icon f-14 blue check-ico" v-if="filter.order === 'desc'">check</i></li>
        </ul>
      </bubble>
    </div>
    <!--<i class="icon c-a a item" v-tooltip:top="'显示移动采编内容'">directions_walk</i>-->
    <!--<i class="icon c-a a item" v-tooltip:top="'发布到 PC 网站'" :class="{ active: filter.terminalPc }" @click="filter.terminalPc = ~~!filter.terminalPc || '';getList(true)">computer</i>-->
    <i class="icon c-a a item" v-tooltip:top="'移动发稿'" :class="{ active: filter.mdFlage }" @click="filter.mdFlage = ~~!filter.mdFlage || '';getList(true)">phone_iphone</i>
    <!--<i class="icon c-a a item" v-tooltip:top="'发布到手机网站'" :class="{ active: filter.terminalWeb }" @click="filter.terminalWeb = ~~!filter.terminalWeb || '';getList(true)">public</i>-->
  </div>
  <div v-if="ui.searchShow" class="flex-v-center search-bar c-6 f-13">
    <i class="icon f-18 c-8">search</i>
    <div class="relative" style="margin: 0 10px;">
      <div class="relative flex-v-center a item" @click="ui.searchOptionShow=true">
        <span>{{searchByName}}</span><i class="icon c-a f-16">keyboard_arrow_down</i>
      </div>
      <bubble v-if="ui.searchOptionShow" pos="bottom" align="start" @close="ui.searchOptionShow=false">
        <ul class="filter-bubble">
          <li v-for="item in ui.searchby" :key="item.id" @click="filter.searchby = item.id" class="a">{{item.name}}</li>
        </ul>
      </bubble>
    </div>
    <input type="text"
      v-model="filter.search"
      class="flex-item c-4 f-13 search-input"
      :placeholder="`搜索${searchByName} 回车`"
      @keydown.esc="cancelSearch"
      @keydown.enter="getList(true)">
    <i class="icon f-20 c-a a" @click="cancelSearch">close</i>
  </div>
  <list-view :list="list" class="flex-item relative" @prev="onPrev" @next="onNext" :page="filter.toPage" :totalPage="totalPage" ref="listView">
    <li slot-scope="slotProps">
      <slot :index="slotProps.index" :item="slotProps.item"></slot>
    </li>
  </list-view>
  <div class="af-bottombar flex-center relative">
    <icon-btn small class="a" @click="onPrev" :disabled="filter.toPage <= 1">keyboard_arrow_left</icon-btn>
    <span class="f-14 c-6" style="margin: 0 10px;line-height: 1em;">第 {{filter.toPage}} / {{totalPage}} 页</span>
    <icon-btn small class="a" @click="onNext" :disabled="filter.toPage >= totalPage">keyboard_arrow_right</icon-btn>
    <span v-if="totalRowsAmount" style="position:absolute; right: 10px;bottom: 8px;font-size: 12px;color: #999;">共 {{totalRowsAmount}} 项</span>
  </div>
</div>
</template>

<script>
import ListView from '../listView'
// import debounce from 'lodash/debounce'

export default {
  name: 'af-center',
  components: { ListView },
  props: {
    url: String,
    status: String
  },
  data () {
    return {
      list: [],
      totalPage: 1,
      ui: {
        searchShow: false,
        searchOptionShow: false,
        channelShow: false, // 栏目
        orderShow: false, // 排序
        channels: [],
        orderby: [
          {id: 'create_date', name: '日期'},
          {id: 'pv', name: '阅读'},
          {id: 'comment_count', name: '评论'},
          {id: 'share_count', name: '分享'},
          {id: 'digg_count', name: '点赞'}
        ],
        searchby: [
          {id: 'title', name: '标题'},
          {id: 'keywords', name: '关键字'},
          {id: 'abstracts', name: '摘要'},
          {id: 'author', name: '作者'}
        ]
      },
      filter: {
        status: 'all',
        toPage: 1,
        pageSize: 30,
        orderby: 'create_date',
        order: 'desc',
        searchby: 'title',
        search: '',
        terminalPc: '',
        terminalApp: '',
        terminalWeb: '',
        publishChannelId: '',
        recommend: ''
      },
      totalRowsAmount: false,
      channels: []
    }
  },
  watch: {
    'filter.toPage' () {
      sessionStorage.setItem("toPage", this.filter.toPage)
    },
    '$route.query.status' (query) {
      this.getList(true)
    },
    'channels' () {
      this.filter.publishChannelId = this.channels.join(',')
      this.getList(true)
    },
    'filter.orderby' () {
      this.ui.orderShow = false
      this.getList(true)
    },
    'filter.order' () {
      this.ui.orderShow = false
      this.getList(true)
    },
    'filter.searchby' () {
      this.ui.searchOptionShow = false
      if (this.filter.search) this.getList(true)
    }
    // 'filter.search' () {
    //   this.search()
    // }
  },
  computed: {
    // channelName () {
    //   let arr = this.ui.channels.filter(item => item.id === this.filter.channelIds)
    //   if (arr.length) return arr[0].channelName
    //   return '全部频道'
    // },
    searchByName () {
      let arr = this.ui.searchby.filter(item => item.id === this.filter.searchby)
      if (arr.length) return arr[0].name
      return '---'
    }
  },
  created () {
    this.getChannels()
  },
  mounted () {
    let { filter } = this
    let query = this.$route.query
    if (query.status !== filter.status) {
      filter.status = query.status
    }
    if (sessionStorage.getItem("toPage")) {
      this.filter.toPage = Number(sessionStorage.getItem("toPage"))
    }
    this.getList()
  },
  methods: {
    getList (refresh) {
      if (!this.url) return
      let { filter } = this
      if (refresh) filter.toPage = 1

      if (this.$route.query.article_theme) {
        filter.appType = 'article_theme'
        filter.status = 'all'
      } else {
        filter.appType = ''
        filter.status = this.$route.query.status
      }
      console.log('filter-----------')
      console.log(filter)
      this.$refs.listView.loading = true
      this.$http.post(this.url, filter).then(res => {
        if (res.totalRowsAmount) {
          this.totalRowsAmount = res.totalRowsAmount
        }
        this.$refs.listView.loading = false
        this.totalPage = res.totalPage || 1
        this.list = res.pages || []
        if (this.list.length > 0 && !this.$route.params.id) {
          this.$emit('getListEnd', this.list[0])
        }
      }).catch(e => {
        this.$refs.listView.loading = false
      })
    },
    onPrev () {
      if (!this.url) return
      let { filter } = this
      if (filter.toPage === 1) return
      filter.toPage = filter.toPage <= 1 ? 1 : filter.toPage - 1
      this.getList()
    },
    onNext () {
      if (!this.url) return
      let { filter, totalPage } = this
      if (filter.toPage === totalPage) return
      filter.toPage = filter.toPage >= totalPage ? totalPage : filter.toPage + 1
      this.getList()
    },
    getChannels () {
      this.$http.post('/cri-cms-platform/common/getChannels.monitor').then(res => {
        this.ui.channels = res || []
      }).catch(e => {
        this.$toast(e.msg)
      })
    },
    cancelSearch () {
      this.ui.searchShow = false
      this.filter.search = ''
      this.getList(true)
    }
    // search: debounce(function () {
    //   this.getList(true)
    // }, 400)
  }
}
</script>

<style lang="less">
.af-center{
  width: 400px;border-right: 1px solid rgba(0, 0, 0, .1);background: #f8f8f8;
  .af-topbar{display: flex;align-items: center;height: 50px;border-bottom: 1px solid rgba(0, 0, 0, .1);padding: 0 15px;}
  .af-bottombar{display: flex;align-items: center;height: 40px;border-top: 1px solid rgba(0, 0, 0, .1);padding: 0 15px;}
  .filter-bar{border-bottom: 1px solid #ddd;height: 36px;padding: 0 10px;line-height: 1em;
    .item{padding: 5px;line-height: 16px;}
    .icon{font-size: 16px;}
    .item:hover{color: #666;}
    .item.active {color: #018be6;}
  }
  .search-bar{border-bottom: 1px solid #ddd;height: 36px;padding: 0 15px;line-height: 1em;}
  .filter-bubble{
    padding: 10px 0;white-space: nowrap;
    li{padding: 5px 10px;
      &:hover{background: #eee;}
      &.split-line{height: 1px;background: #eee;padding: 0;margin: 5px;}
    }
    .check-ico{margin-left: 10px;}
  }
  .search-input{height: 30px;border: none;background: transparent;
    &::-webkit-input-placeholder{color: #aaa;}
  }
}
</style>
