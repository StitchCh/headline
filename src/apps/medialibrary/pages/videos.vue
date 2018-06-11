<template>
<div class="abs flex-item flex media-videos">
  <media-left-tree/>
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
        <div class="relative">
          <span class="a relative">
            <span v-if="!filter.range.length" class="abs flex-v-center" style="padding: 0 15px;top: 0;">
              <span>全部时间</span>
              <i class="icon c-a f-18">keyboard_arrow_down</i>
            </span>
            <vue-datepicker-local v-model="filter.range" show-buttons></vue-datepicker-local>
          </span>
        </div>
        <icon-btn small @click="resetFilter" v-tooltip:bottom="'重置'">close</icon-btn>
      </div>
    </div>
    <div class="flex-item relative scroll-y">
      <div v-if="!list.length" class="abs flex-center"><no-data/></div>
      <div class="media-group" v-for="group in list" :key="group.date">
        <div class="media-group-title">{{group.date}}</div>
        <ul class="flex">
          <li class="videos-item relative" v-for="item in group.data" :key="item.id">
            <div class="videos-item-cover"></div>
            <div class="videos-item-name f-14">李小璐曝贾乃亮陪伴少, 坦言婚前婚后反差大</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="af-bottombar"></div>
  </div>
</div>
</template>

<script>
import MediaLeftTree from '../components/leftTree'
import VueDatepickerLocal from 'vue-datepicker-local'

export default {
  name: 'media-videos',
  components: { MediaLeftTree, VueDatepickerLocal },
  data () {
    return {
      stateShow: false,
      list: [],
      filter: {
        range: []
      }
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
    resetFilter () {
      this.filter.range = []
    },
    getList () {
      let type = this.$route.meta.type
      let folderId = this.$route.query.folderId || ''
      this.$http.post('/cri-cms-platform/media/list.monitor', {
        type,
        folderId,
        toPage: 1,
        pageSize: 30
      }).then(res => {
        this.list = res.data || []
      })
    }
  }
}
</script>

<style lang="less">
.media-videos{
  .videos-item{width: 200px;}
  .videos-item-cover{height: 150px;background: #eee;border-radius: 5px;overflow: hidden;}
  .videos-item-name{margin-top: 5px;max-height: 46px;overflow: hidden;}
}
</style>
