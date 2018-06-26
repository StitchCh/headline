<template>
<div class="af-center flex-col">
  <div class="af-topbar flex-center">
    <icon-btn class="add-btn" v-tooltip:bottom="'添加'" @click="$emit('add')">add</icon-btn>
  </div>
  <div class="flex-v-center filter-bar c-6 f-13">
    <i class="icon c-a a item" v-tooltip:top="'推荐'">thumb_up</i>
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
    <i class="icon c-a a item" v-tooltip:top="'显示移动采编内容'">directions_walk</i>
    <i class="icon c-a a item" v-tooltip:top="'发布到 PC 网站'">computer</i>
    <i class="icon c-a a item" v-tooltip:top="'发布到手机客户端'">phone_iphone</i>
    <i class="icon c-a a item" v-tooltip:top="'发布到手机网站'">public</i>
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
      placeholder="搜索标题 回车"
      @keydown.esc="ui.searchOptionShow=false">
    <i class="icon f-20 c-a a" @click="ui.searchShow=false;filter.search=''">close</i>
  </div>
  <list-view :list="list" class="flex-item relative" @prev="onPrev" @next="onNext" :page="filter.toPage" :totalPage="totalPage" ref="listView">
    <li slot-scope="slotProps">
      <slot :item="slotProps.item"></slot>
    </li>
  </list-view>
  <div class="af-bottombar flex-v-center">
    <icon-btn small class="a" @click="onPrev" :disabled="filter.toPage <= 1">keyboard_arrow_left</icon-btn>
    <span class="f-14 c-6" style="margin: 0 10px;line-height: 1em;">第 {{filter.toPage}} / {{totalPage}} 页</span>
    <icon-btn small class="a" @click="onNext" :disabled="filter.toPage >= totalPage">keyboard_arrow_right</icon-btn>
  </div>
</div>
</template>

<script>
import ListView from '../listView'
import debounce from 'lodash/debounce'

export default {
  name: 'af-center',
  components: { ListView },
  props: {
    url: String,
    scope: String,
    status: String
  },
  data () {
    return {
      list: [],
      totalPage: 0,
      ui: {
        searchShow: false,
        searchOptionShow: false,
        channelShow: false, // 栏目
        orderShow: false, // 排序
        channels: [],
        orderby: [{id: 'create_date', name: '日期'}, {id: 'readnum', name: '阅读'}],
        searchby: [{id: 'title', name: '标题'}, {id: 'keywoards', name: '关键字'}, {id: 'abstracts', name: '摘要'}, {id: 'author', name: '作者'}]
      },
      filter: {
        scope: '1',
        status: 'all',
        toPage: 1,
        pageSize: 30,
        // channelIds: '',
        orderby: 'create_date',
        order: 'asc',
        searchby: 'title',
        search: ''
      }
    }
  },
  watch: {
    '$route.query' (query) {
      let { filter } = this
      if (query.scope !== filter.scope || query.status !== filter.status) {
        filter.scope = query.scope
        filter.status = query.status
        this.getList(true)
      }
    },
    // 'filter.channelIds' () {
    //   this.ui.channelShow = false
    //   this.getList(true)
    // },
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
    },
    'filter.search' () {
      this.search()
    }
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
    this.getList()
  },
  methods: {
    getList (refresh) {
      if (!this.url) return
      let { filter } = this
      if (refresh) filter.toPage = 1
      this.$refs.listView.loading = true
      this.$http.post(this.url, filter).then(res => {
        this.$refs.listView.loading = false
        this.totalPage = res.totalPage || 0
        this.list = res.pages || []
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
      this.$http.post('/cri-cms-platform/sysRoles/getChannels.monitor').then(res => {
        this.ui.channels = res || []
      }).catch(e => {
        this.$toast(e.message)
      })
    },
    search: debounce(function () {
      this.getList(true)
    }, 400)
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
