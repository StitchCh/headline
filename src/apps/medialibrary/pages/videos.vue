<template>
<div class="abs flex-item flex media-videos">
  <media-left-tree :select-mode="selectMode" @changeFolder="getList" type="2"/>
  <div class="flex-item flex-col">
    <div class="af-topbar flex-v-center" style="height:36px;">
      <div class="search-bar flex-v-center">
        <i class="icon f-20 c-a">search</i>
        <input type="text" class="f-14 c-6" placeholder="搜索">
      </div>
      <div class="flex-item"></div>
      <div class="flex-v-center opera-btns">
        <div class="relative">
          <span class="a flex-v-center" @click="stateShow=true">
            <span>全部状态</span>
            <i class="icon f-18 c-a">keyboard_arrow_down</i>
          </span>
          <bubble v-if="stateShow" @close="stateShow=false">
            <div style="padding: 10px 0;">
              <div class="bubble-item">已转码</div>
              <div class="bubble-item">转码中</div>
              <div class="bubble-item">转码失败</div>
            </div>
          </bubble>
        </div>
        <!--<div class="relative">-->
          <!--<span class="a relative">-->
            <!--<span v-if="!filter.range.length" class="abs flex-v-center" style="padding: 0 15px;top: 0;">-->
              <!--<span>全部时间</span>-->
              <!--<i class="icon c-a f-18">keyboard_arrow_down</i>-->
            <!--</span>-->
            <!--<vue-datepicker-local v-model="filter.range" show-buttons></vue-datepicker-local>-->
          <!--</span>-->
        <!--</div>-->
        <!--<icon-btn small @click="resetFilter" v-tooltip:bottom="'重置'">close</icon-btn>-->
      </div>
      <span class="f-14" v-if="selected.length" style="margin-right: 10px;">已选择 {{selected.length}} 项</span>
      <btn flat v-if="selected.length" color="#008eff" @click="cancelSelect">取消选择</btn>
      <div class="flex-v-center opera-btns">
        <btn flat :disabled="!selected.length" color="#008eff" @click="del">批量删除</btn>
        <media-upload :type="2" @uploaded="onUploaded" :folder-id="$route.query.folderId || 0"/>
      </div>
    </div>
    <div class="flex-item relative scroll-y">
      <div v-if="loading" class="abs flex-center bg-light-rgb-2" style="z-index: 20;"><loading/></div>
      <div v-if="!list.length && !loading" class="abs flex-center"><no-data/></div>
      <div class="media-group" v-for="group in list" :key="group.date">
        <div class="media-group-title">{{group.date}}</div>
        <ul class="flex">
          <li class="videos-item relative" v-for="item in group.data" :key="item.id" :class="{'checked': item.checked}" v-if="!selectMode || item.state === 'success'">
            <i class="icon item-check a" @click="selectItem(item)">check_circle</i>
            <div class="relative hidden">
              <div class="videos-item-cover flex-center">
                <img :src="origin + item.thumb">
              </div>
              <div class="videos-item-play abs flex-center"><i class="icon a c-f" @click="onItemClick(item)">play_circle_outline</i></div>
              <div class="videos-item-info flex-v-center f-12 c-f">{{item.duration * 1000 | time}}<span class="flex-item"></span><i class="status" :style="{ backgroundColor: states[item.state].color }"></i>{{states[item.state].text}}</div>
            </div>
            <div class="videos-item-name f-14">{{item.alias}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="af-bottombar flex-center">
      <pagination :page="page" :size="size" :total="total" @change="onPageChange"></pagination>
    </div>
  </div>
</div>
</template>

<script>
import MediaLeftTree from '../components/leftTree'
import MediaUpload from '../components/upload'
import debounce from 'lodash/debounce'

const origin = 'http://60.247.77.208:58088'

const states = {
  'success': { color: '#4caf50 ', text: '转码成功' },
  'coding': { color: '#ffc107 ', text: '转码中' },
  'fail': { color: '#ff5252 ', text: '转码失败' }
}

export default {
  name: 'media-videos',
  components: { MediaLeftTree, MediaUpload },
  props: {
    selectMode: {
      type: Boolean,
      default: false
    },
    singleSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      origin,
      states,
      loading: true,
      stateShow: false,
      page: 1,
      size: 50,
      total: 0,
      list: []
      // filter: {
      //   range: []
      // }
    }
  },
  computed: {
    selected () {
      let res = []
      this.list.forEach(li => {
        li.data.forEach(item => {
          if (item.checked) res.push(item)
        })
      })
      return res
    },
    allList () {
      let res = []
      let { list } = this
      list.forEach(li => {
        li.data.forEach(item => {
          res.push(item)
        })
      })
      return res
    }
  },
  created () {
    this.getList()
  },
  watch: {
    '$route.query' () {
      this.getList()
    }
  },
  methods: {
    // resetFilter () {
    //   this.filter.range = []
    // },
    getList (id) {
      this.loading = true
      let type = this.selectMode ? '2' : this.$route.meta.type
      let folderId = this.$route.query.folderId || ''
      if (this.selectMode) folderId = id || ''
      this.$http.post('/cri-cms-platform/media/list.monitor', {
        type,
        folderId,
        toPage: this.page,
        pageSize: this.size
      }).then(res => {
        res.data.forEach(data => {
          data.data.forEach(item => {
            item.checked = false
          })
        })
        console.log(res)
        this.total = res.totalPage * this.size
        this.list = res.data || []
        console.log(this.list)
        this.loading = false
      })
    },
    onItemClick (item) {
      this.$emit('preview', {
        type: 2,
        list: this.allList,
        index: this.allList.indexOf(item)
      })
    },
    selectItem (item) {
      if (this.singleSelect) this.cancelSelect()
      item.checked = !item.checked
    },
    cancelSelect () {
      this.list.forEach(li => {
        li.data.forEach(item => {
          item.checked = false
        })
      })
    },
    del () {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除这 ${this.selected.length} 项吗？`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http.post('/cri-cms-platform/media/del.monitor', {
            id: this.selected.map(item => item.id).toString(),
            type: '2'
          }).then(res => {
            this.getList()
          }).catch(e => {
            this.$toast(e.msg)
          })
        }
      })
    },
    onUploaded: debounce(function () {
      if (this.page === 1) this.getList()
    }, 1000),
    onPageChange (e) {
      this.page = parseInt(e)
      this.getList()
    }
  }
}
</script>

<style lang="less">
.media-videos{
  .videos-item{width: 200px;
    &:hover{
      .item-check{visibility: visible;}
      .videos-item-play i{opacity: 1;}
      .videos-item-info {transform: translateY(0)}
    }
    &.checked{
      .item-check{visibility: visible;color: #008eff;}
      .videos-item-cover{transform: scale(.85);}
    }
  }
  .videos-item-cover{height: 150px;background: #000;border-radius: 5px;overflow: hidden;transition: transform .2s;will-change: transform;
    img {max-width: 100%;max-height: 100%}
  }
  .videos-item-play i {opacity: 0;transition: opacity .2s;will-change: opacity;font-size: 40px;text-shadow: #000 0 0 8px;}
  .videos-item-info {position: absolute;left: 0;bottom: 0;background: rgba(0, 0, 0, .7);width: 100%;line-height: 1em;padding: 6px;transform: translateY(24px);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;transition: all .2s;
    .status {width: 10px;height: 10px;border-radius: 5px;margin-right: 5px;}
  }
  .videos-item-name{margin-top: 5px;max-height: 46px;overflow: hidden;}
  .item-check{position: absolute;right: 0;top: 0;z-index: 2;visibility: hidden;color: rgba(173, 173, 173, 0.8);padding: 3px;}
}
</style>
