<template>
  <div class="abs bg-f flex app-audit">
    <af-left color="#00897B" vibrant-color="#00897B" bg-color="#E0F2F1" title="审核" :defaultActive="defaultActive">
      <navigator-item icon="folder" index="all-all" @click="$router.replace('/audit?scope=all&status=all')">全部</navigator-item>
      <!-- <navigator-item-group defaultExtended index="2" icon="face">
      <span slot="title">我的</span> -->
      <navigator-item icon="class" index="my-all" @click="$router.replace('/audit?scope=my&status=all')">已发</navigator-item>
      <navigator-item icon="hourglass_full" index="my-AUDITING" @click="$router.replace('/audit?scope=my&status=AUDITING')">待审</navigator-item>
      <navigator-item icon="error" index="my-REJECT" @click="$router.replace('/audit?scope=my&status=REJECT')">驳回</navigator-item>
      <navigator-item icon="check_circle" index="my-PASS" @click="$router.replace('/audit?scope=my&status=PASS')">通过</navigator-item>
      <!-- </navigator-item-group> -->
      <navigator-item icon="delete" index="ArticleRecycle" @click="$router.replace('/audit?scope=all&status=DELETE')">已删除</navigator-item>
    </af-left>
    <div class="flex">
      <div class="flex-col audit-center">
        <div class="af-topbar flex-v-center f-14 c-6">
          <i class="icon c-a f-20">search</i>
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
          <input v-model="filter.search" type="text" class="flex-item c-6 f-14 search-input" :placeholder="`搜索${searchByName} 回车`" @keyup.enter="getList(true)">
          <icon-btn small @click="filter.search='';getList(true)">close</icon-btn>
        </div>
        <div class="flex-v-center filter-bar c-6 f-13">
          <i class="icon c-a a item" :class="{ active: filter.recommend }" v-tooltip:top="'推荐'" @click="filter.recommend = ~~!filter.recommend || '';getList(true)">thumb_up</i>
          <span class="flex-item"></span>
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
          <i class="icon c-a a item" v-tooltip:top="'发布到 PC 网站'" :class="{ active: filter.terminalPc }" @click="filter.terminalPc = ~~!filter.terminalPc || '';getList(true)">computer</i>
          <i class="icon c-a a item" v-tooltip:top="'发布到手机客户端'" :class="{ active: filter.terminalApp }" @click="filter.terminalApp = ~~!filter.terminalApp || '';getList(true)">phone_iphone</i>
          <i class="icon c-a a item" v-tooltip:top="'发布到手机网站'" :class="{ active: filter.terminalWeb }" @click="filter.terminalWeb = ~~!filter.terminalWeb || '';getList(true)">public</i>
        </div>
        <list-view :list="list" class="flex-item relative" @prev="onPrev" @next="onNext" :page="filter.toPage" :totalPage="ui.totalPage" ref="listView">
          <li slot-scope="slotProps">
            <div class="list-item flex-v-center a" @click="onItemClick(slotProps.item)" :class="{'on': slotProps.item.id == $route.params.id}">
              <div class="list-thumb flex-center relative">
                <img v-if="slotProps.item.thumb.length" :src="slotProps.item.thumb[0].url" alt="">
              </div>
              <div class="flex-item">
                <div class="list-title flex-center">
                  <i v-if="~~(slotProps.item.isRecommnd)" class="icon f-16 blue">thumb_up</i>
                  <i v-if="~~(slotProps.item.hasThumb)" class="icon f-16 orange">image</i>
                  <i v-if="~~(slotProps.item.isOriginal)" class="icon f-16 green">copyright</i>
                  <span class="flex-item c-6 f-14 b" :title="slotProps.item.title">{{slotProps.item.title}}</span>
                  <i class="icon f-16" :style="{ color: ui.status[slotProps.item.auditStatus].color}">{{ui.status[slotProps.item.auditStatus].icon}}</i>
                </div>
                <div class="list-info f-12 c-8 flex-v-center">
                  <span>{{slotProps.item.createDate}}</span>
                  <span>{{slotProps.item.createUser}}</span>
                </div>
                <div class="list-info f-12 c-8 flex-v-center">
                  <span class="list-info-num">
                    <i v-tooltip:top="'阅读'">{{slotProps.item.pv}}</i>/<i v-tooltip:top="'评论'">{{slotProps.item.commentCount}}</i>/<i v-tooltip:top="'分享'">{{slotProps.item.shareCount}}</i>/<i v-tooltip:top="'点赞'">{{slotProps.item.diggCount}}</i>
                  </span>
                  <span class="flex-item"></span>
                  <i class="icon f-14 tg-icon c-a" :class="{ active: ~~slotProps.item.terminalPc }">computer</i>
                  <i class="icon f-14 tg-icon c-a" :class="{ active: ~~slotProps.item.terminalApp }">phone_iphone</i>
                  <i class="icon f-14 tg-icon c-a" :class="{ active: ~~slotProps.item.terminalWeb }">public</i>
                </div>
              </div>
            </div>
          </li>
        </list-view>
        <div class="af-bottombar flex-center">
          <icon-btn small class="a" @click="onPrev" :disabled="filter.toPage <= 1">keyboard_arrow_left</icon-btn>
          <span class="f-14 c-6" style="margin: 0 10px;line-height: 1em;">第 {{filter.toPage}} / {{ui.totalPage}} 页</span>
          <icon-btn small class="a" @click="onNext" :disabled="filter.toPage >= ui.totalPage">keyboard_arrow_right</icon-btn>
        </div>
      </div>
    </div>
    <div class="af-right flex-item flex-col">
      <div class="af-topbar flex-v-center">
        <div class="flex-v-center" v-if="id">
          <icon-btn v-tooltip:bottom="'审核通过'" style="margin-right: 10px;" color="#4caf50" @click="audit('PASS')">check_circle_outline</icon-btn>
          <icon-btn v-tooltip:bottom="'审核驳回'" color="#ff5252" @click="audit('REJECT')">error_outline</icon-btn>
        </div>
        <div class="flex-item"></div>
        <account/>
      </div>
      <router-view :channels="ui.channels"></router-view>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import AfLeft from '@/components/app-frame/afLeft'
import ListView from '@/components/listView'

const status = {
  'AUDITING': { text: '待审', icon: 'hourglass_full', color: '#ffc107' },
  'REJECT': { text: '驳回', icon: 'error', color: '#ff5252' },
  'PASS': { text: '通过', icon: 'check_circle', color: '#4caf50' }
}

export default {
  name: 'app-audit',
  components: { Account, AfLeft, ListView },
  props: [ 'id' ],
  data () {
    return {
      ui: {
        status,
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
        ],
        totalPage: 1
      },
      filter: {
        scope: 'all',
        status: 'all',
        pageSize: 30,
        toPage: 1,
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
      list: [],
      channels: []
    }
  },
  computed: {
    defaultActive () {
      let { name } = this.$route
      name = name || ''
      let { scope, status } = this.$route.query
      if (scope && status) {
        return `${scope}-${status}`
      }
      return name.replace('Content', '')
    },
    searchByName () {
      let item = this.ui.searchby.find(item => item.id === this.filter.searchby)
      if (item) return item.name
      return '---'
    }
  },
  methods: {
    getList (refresh) {
      let { filter } = this
      if (refresh) filter.toPage = 1
      this.$refs.listView.loading = true
      this.$http.post('/cri-cms-platform/audit/list.monitor', filter).then(res => {
        console.log(res)
        this.list = res.pages || []
        this.ui.totalPage = res.totalPage || 1
        this.$refs.listView.loading = false
      }).catch(e => {
        this.$refs.listView.loading = false
      })
    },
    getChannels () {
      return this.$http.post('/cri-cms-platform/audit/getChannels.monitor').then(res => {
        this.ui.channels = res || []
      }).catch(e => {
        this.$toast(e.msg)
      })
    },
    onPrev () {
      let { filter } = this
      if (filter.toPage === 1) return
      filter.toPage = filter.toPage <= 1 ? 1 : filter.toPage - 1
      this.getList()
    },
    onNext () {
      let { filter } = this
      let { totalPage } = this.ui
      if (filter.toPage === totalPage) return
      filter.toPage = filter.toPage >= totalPage ? totalPage : filter.toPage + 1
      this.getList()
    },
    onItemClick (item) {
      this.$router.replace({
        path: `/audit/${item.app}/${item.id}`,
        query: this.$route.query
      })
    },
    audit (status) {
      this.$http.post('/cri-cms-platform/audit/audit.monitor', {
        id: this.id,
        auditStatus: status
      }).then(res => {
        this.getList()
        this.$router.replace({path: '/audit', query: this.$route.query})
        this.$toast(`审核${this.ui.status[status].text}`)
      }).catch(e => {
        this.$toast(e.msg)
      })
    }
  },
  created () {
    let { filter } = this
    let query = this.$route.query
    if (query.scope !== filter.scope || query.status !== filter.status) {
      filter.scope = query.scope
      filter.status = query.status
    }
    this.getChannels().then(() => this.getList())
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
  }
}
</script>

<style lang="less">
.app-audit {
  .list-item{width: auto;
    .list-title{max-width: 269px;}
  }
  .navigator-item .icon{transition: none;}
  .navigator-item.active{background: #4DB6AC;color: #fff;}
  .af-topbar {line-height: 1em;}
  .search-input{height: 30px;border: none;background: transparent;margin-left: 10px;line-height: 1em;
    &::-webkit-input-placeholder{color: #aaa;}
  }
  .filter-bar{border-bottom: 1px solid rgba(0, 0, 0, .1);padding: 0 15px;height: 36px;line-height: 1em;
    .item{padding: 5px;line-height: 16px;}
    .icon{font-size: 16px;}
    .item:hover{color: #666;}
    .item.active {color: #018be6;}
  }
  .filter-bubble{padding: 10px 0;white-space: nowrap;
    li{padding: 5px 10px;
      &:hover{background: #eee;}
      &.split-line{height: 1px;background: #eee;padding: 0;margin: 5px;}
    }
    .check-ico{margin-left: 10px;}
  }
  .audit-center{width: 400px;border-right: 1px solid rgba(0, 0, 0, .1);background: #f8f8f8;}
  .list-item.on{background: #42aad8;color: #fff;
    .list-title span{color: #fff;}
    .list-info{color: rgba(255, 255, 255, .8)}
    .tg-icon{color: rgba(255, 255, 255, .8);}
  }
  .list-thumb {width: 80px;min-width: 80px;height: 60px;background: rgba(0, 0, 0, .07);margin-right: 10px;
    img {max-width: 100%;max-height: 100%;}
  }
  .active {color: #018be6;}
}
</style>
