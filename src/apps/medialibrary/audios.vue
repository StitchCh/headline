<template>
<div class="abs flex-item flex media-audios">
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
            <vue-datepicker-local v-model="filter.range"></vue-datepicker-local>
          </span>
        </div>
        <icon-btn small @click="resetFilter" v-tooltip:bottom="'重置'">close</icon-btn>
      </div>
    </div>
    <div class="flex-item scroll-y">
      <div class="media-group" v-for="(g, i) in 3" :key="i">
        <div class="media-group-title">今天</div>
        <ul class="flex">
          <li class="audios-item relative a" v-for="(item, i) in 16" :key="i">
            <div class="audios-item-cover flex-v-center">
              <i class="icon c-f">audiotrack</i>
              <span class="flex-item t-right c-f">20:00</span>
            </div>
            <div class="audios-item-name f-14">hello.mp3</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="af-bottombar flex-v-center"></div>
  </div>
</div>
</template>

<script>
import MediaLeftTree from './leftTree'
import VueDatepickerLocal from 'vue-datepicker-local'

export default {
  name: 'media-audios',
  components: { MediaLeftTree, VueDatepickerLocal },
  data () {
    return {
      stateShow: false,
      filter: {
        range: []
      }
    }
  },
  methods: {
    resetFilter () {
      this.filter.range = []
    }
  }
}
</script>

<style lang="less">
.media-audios{
  .audios-item{width: 200px;border-radius: 8px;outline: none;border: 1px solid transparent;}
  .audios-item-cover{height: 60px;background: #79b6ff;padding: 0 15px;border-radius: 5px;}
  .audios-item-name{margin-top: 5px;max-height: 46px;overflow: hidden;}
}
</style>
