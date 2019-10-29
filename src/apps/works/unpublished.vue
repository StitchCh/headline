<template>
<div class="c-6 f-14 works-unpublished">
  <div class="flex" style="width: 100%;height: 100%;">
    <div class="left flex-item" style="width: 50%;">
      <div class="card relative" style="height: 100%;">

        <div class="flex-v-center card-title">
          <div class="flex-item">
            <div class="relative" style="display:inline-block;">
              <span class="a b blue" @click="treeBubbleShow=!treeBubbleShow">
                {{filterChannelName}}
                <i class="icon">keyboard_arrow_down</i>
              </span>
              <bubble v-if="treeBubbleShow" pos="bottom" align="start" @close="treeBubbleShow=false">
                <div style="width: 250px;padding: 10px 0;">
                  <div class="tree-node c-4" @click="filterChannelId = '';treeBubbleShow=false;">
                    <div class="tree-title" style="padding-left: 20px;" :class="{'on': !filterChannelId}">所有频道文章</div>
                  </div>
                  <tree
                    class="c-4"
                    :data="channel"
                    :activeId="filterChannelId"
                    open-all
                    pidTxt="channelPartentId"
                    @select="onTreeSelect">
                  </tree>
                </div>
              </bubble>
            </div>
          </div>

          <div class="relative" style="margin-right: 20px;">
            <div class="relative flex-v-center a item" v-tooltip="'筛选分类'" @click="classShow=true">
              <span>分类</span><i class="icon c-a">keyboard_arrow_down</i>
            </div>
            <bubble v-if="classShow" pos="bottom" align="center" @close="classShow=false">
              <ul class="filter-bubble">
                <li class="a flex-v-center" style="width: 50px;padding: 5px 10px;" v-for="item in classList" @click="searchClass(item)">
                  <span class="flex-item">{{item.name}}</span>
                  <i v-if="item.state" class="icon f-14 blue check-ico">check</i>
                </li>
              </ul>
            </bubble>
          </div>

          <input v-model="searchKey" class="f-14" type="text" placeholder="标题关键字" style="margin: 0;padding: 4px 6px;width: 150px;border:1px solid #eee;border-radius: 4px;"/>
        </div>

        <div v-if="loading" class="abs flex-center"><loading size="30"/></div>
        <div class="f-12 c-a t-center" v-if="!data.length && !loading" style="margin-top: 15px;">暂无数据</div>

        <ul style="height: calc(100% - 70px);overflow: auto;">
          <li class="flex-v-center li-item" v-for="item in data" :key="item.id">
            <span class="flex-item li-title">【{{appTypeList[item.app]}}】{{item.title}}</span>
            <icon-btn small
              @click="checkItem(item)"
              :disabled="checkedId.includes(item.id)"
            >arrow_forward</icon-btn>
          </li>
        </ul>

        <pagination
          v-if="totalPage > 1"
          :page="page"
          :size="size"
          :total="totalPage * size"
          @change="page=$event;getList()"
          style="border-top: 1px solid #eee;padding: 5px 0;"
        />
      </div>
    </div>

    <div class="right" style="width: 50%;">
      <div class="card flex-item" style="margin-left: 5px;" :style="{marginTop: scrollTop + 'px'}">
        <div class="flex-v-center card-title">
          <div class="b blue flex-item">已选择</div>
          <btn @click="confirm" :disabled="!checked.length">确定选取</btn>
        </div>
        <div class="flex">
          <div class="layout-tab">
            <ul style="overflow: hidden;">
              <li class="a" v-for="item in layout"
                :key="item.id"
                :class="{'on': activeLayoutId === item.id, 'disabled': item.type === '3'}"
                @click="activeLayoutId=item.id"
              >{{item.layoutName}}</li>
            </ul>
          </div>
          <transition-group name="slide-x" tag="ul" class="flex-item" style="overflow: hidden;">
            <li class="flex-v-center li-item"
              v-for="item in layoutChecked"
              :key="item.id">
              <span class="flex-item li-title">【{{appTypeList[item.app]}}】{{item.title}}</span>
              <icon-btn small @click="unCheckItem(item)">close</icon-btn>
            </li>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'works-unpublished',
  props: {
    channel: {
      type: Array,
      default: () => []
    },
    childChannel: {
      type: Array,
      default: () => []
    },
    scrollTop: {
      type: Number
    },
    layout: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      classList: [
        {
          app: 'SPECIAL',
          name: '专题',
          state: false
        },
        {
          app: 'VIDEO',
          name: '视频',
          state: false
        },
        {
          app: 'ARTICLE',
          name: '文章',
          state: false
        },
        {
          app: 'AUDIO',
          name: '音频',
          state: false
        },
        {
          app: 'LIVE',
          name: '直播',
          state: false
        },
        {
          app: 'ECOMMERCE',
          name: '电商',
          state: false
        },
        {
          app: 'LINK',
          name: '链接',
          state: false
        },
        {
          app: 'GALLERY',
          name: '图集',
          state: false
        },
        {
          app: 'VOTE',
          name: '投票',
          state: false
        }
      ],
      classShow: false,
      treeBubbleShow: false,
      loading: false,
      size: 30,
      page: 1,
      totalPage: 0,
      filterChannelId: this.$route.query.channelId,
      searchKey: '',
      activeLayoutId: '',
      data: [],
      appTypeList: {},
      checked: [],
      appList: []
    }
  },
  mounted () {
    this.activeLayoutId = this.$route.query.typeId
    this.appTypeList = this.$store.state.account.appTypeList
  },
  created () {
    this.getList()
  },
  watch: {
    '$route.query.typeId' () {
      this.activeLayoutId = this.$route.query.typeId
    },
    '$route.query.channelId' (id) {
      this.filterChannelId = id
    },
    filterChannelId () {
      this.getList()
    },
    searchKey () {
      this.search()
    },
    layout (val) {
      // if (val && val.length) this.activeLayoutId = val[0].id || ''
      this.checked = []
    }
  },
  computed: {
    checkedId () {
      return this.layoutChecked.map(item => item.id)
    },
    filterChannelName () {
      let res = ''
      if (!this.filterChannelId) return '所有频道文章'
      this.channel.forEach(item => {
        if (item.id === this.filterChannelId) res = item.channelName
      })
      return res
    },
    layoutChecked () {
      return this.checked.filter(item => item.layoutId === this.activeLayoutId)
    }
  },
  methods: {
    searchClass (item) {
      item.state = !item.state
      this.appList = []
      this.classList.forEach(item => {
        if (item.state) {
          this.appList.push(item.app)
        }
      })
      this.getList()
    },
    getList () {
      this.loading = true
      let app = ''
      if (this.appList.length > 0) {
        app = this.appList.join(',')
      }
      this.$http.post('/cri-cms-platform/issue/getChannelContentList.monitor', {
        // type: type,
        pageSize: this.size,
        toPage: this.page,
        channelId: this.filterChannelId || this.$route.query.channelId,
        // eslint disable no-unneeded-ternary
        filterChannelId: this.filterChannelId ? true : false,
        title: this.searchKey,
        app
      }).then(res => {
        this.loading = false
        res.data.forEach(item => { item.checked = false })
        this.data = res.data
        console.log(res.data)
        this.totalPage = res.totalPage
      }).catch(e => {
        this.loading = false
        this.$toast(e.msg)
      })
    },
    add () {
      console.log('a')
    },
    checkItem (item) {
      if (!this.activeLayoutId) {
        this.$toast('请选择布局')
        return
      }
      item = JSON.parse(JSON.stringify(item))
      item.layoutId = this.activeLayoutId
      this.checked.push(item)
    },
    unCheckItem (item) {
      let i = this.checked.indexOf(item)
      this.checked.splice(i, 1)
    },
    onTreeSelect (e) {
      this.filterChannelId = e.id
      this.treeBubbleShow = false
      // console.log(this.filterChannelId)
    },
    search: debounce(function () {
      this.getList()
    }, 500),
    confirm () {
      this.$emit('add', this.checked)
    }
  }
}
</script>

<style lang="less">
.works-unpublished{
  height: 100%;
  *{
    max-height: 100%;
  }
  .card{border-radius: 5px;box-shadow: none;margin-bottom: 15px;padding: 15px;white-space: nowrap;}
  .li-item{line-height: 1em;
    &:hover{background: #eee;}
  }
  .li-title{text-overflow: ellipsis;text-overflow: ellipsis;overflow: hidden;padding: 10px;}
  .card-title{padding: 0 10px 10px;border-bottom: 1px solid #eee;}
  .layout-tab{
    width: 80px;border-right: 1px solid #eee;
    li{padding: 10px;line-height: 1em;
      &.disabled{pointer-events: none;opacity: .5;}
      &:hover{background: #eee;}
      &.on{background: #0299ff;color: #fff;}
    }
  }
}
</style>
