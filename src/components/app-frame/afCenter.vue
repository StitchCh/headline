<template>
<div class="af-center flex-col">
  <div class="af-topbar flex-center">
    <icon-btn color="#0060ff" v-tooltip:bottom="'添加'" @click="$emit('add')">add</icon-btn>
  </div>
  <div class="flex-v-center filter-bar c-6 f-13">
    <i class="icon c-a a item" v-tooltip:top="'推荐'">thumb_up</i>
    <span class="flex-item"></span>
    <i class="icon c-a a item" style="font-size:18px;" v-tooltip:top="'搜索'" @click="ui.searchShow=!ui.searchShow">search</i>
    <div class="relative">
      <div class="relative flex-v-center a item" v-tooltip:top="'筛选栏目'" @click="ui.sectionShow=true">
        <span>栏目</span><i class="icon c-a">keyboard_arrow_down</i>
      </div>
      <bubble v-if="ui.sectionShow" pos="bottom" align="center" @close="ui.sectionShow=false">
        <ul class="filter-bubble">
          <li class="a">外编</li>
          <li class="a">旅游分类</li>
        </ul>
      </bubble>
    </div>
    <div class="relative">
      <div class="relative flex-v-center a item" v-tooltip:top="'排序'" @click="ui.sortShow=true">
        <span>排序</span><i class="icon c-a">keyboard_arrow_down</i>
      </div>
      <bubble v-if="ui.sortShow" pos="bottom" align="center" @close="ui.sortShow=false">
        <ul class="filter-bubble">
          <li class="a flex-v-center"><span class="flex-item">日期</span><i class="icon f-14 blue check-ico">check</i></li>
          <li class="a flex-v-center"><span class="flex-item">阅读</span><i class="icon f-14 blue check-ico">check</i></li>
          <li class="a flex-v-center"><span class="flex-item">分享</span><i class="icon f-14 blue check-ico">check</i></li>
          <li class="a flex-v-center"><span class="flex-item">评论</span><i class="icon f-14 blue check-ico">check</i></li>
          <li class="split-line"></li>
          <li class="a flex-v-center"><span class="flex-item">升序</span><i class="icon f-14 blue check-ico">check</i></li>
          <li class="a flex-v-center"><span class="flex-item">降序</span><i class="icon f-14 blue check-ico">check</i></li>
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
        <span>标题</span><i class="icon c-a f-16">keyboard_arrow_down</i>
      </div>
      <bubble v-if="ui.searchOptionShow" pos="bottom" align="start" @close="ui.searchOptionShow=false">
        <ul class="filter-bubble">
          <li class="a">标题</li>
          <li class="a">内容</li>
          <li class="a">摘要</li>
          <li class="a">关键字</li>
          <li class="a">作者</li>
          <li class="a">管理员/编辑</li>
        </ul>
      </bubble>
    </div>
    <input type="text" class="flex-item c-4 f-13 search-input" placeholder="搜索标题 回车" @keydown.esc="ui.searchOptionShow=false">
    <i class="icon f-20 c-a a" @click="ui.searchShow=false">close</i>
  </div>
  <list-view :list="list" class="flex-item">
    <li slot-scope="slotProps">
      <slot :item="slotProps.item"></slot>
    </li>
  </list-view>
  <div class="af-bottombar"></div>
</div>
</template>

<script>
import ListView from '../listView'

export default {
  name: 'af-center',
  components: { ListView },
  props: {
    url: String
  },
  data () {
    return {
      list: [{id: 1}, {id: 2}],
      ui: {
        searchShow: false,
        searchOptionShow: false,
        sectionShow: false, // 栏目
        sortShow: false // 排序
      },
      filter: {}
    }
  },
  methods: {
    getList () {}
  }
}
</script>

<style lang="less">
.af-center{
  width: 400px;border-right: 1px solid rgba(0, 0, 0, .1);background: #f8f8f8;
  .af-topbar{display: flex;align-items: center;height: 50px;border-bottom: 1px solid rgba(0, 0, 0, .1);padding: 0 15px;}
  .af-bottombar{display: flex;align-items: center;height: 40px;border-top: 1px solid rgba(0, 0, 0, .1);padding: 0 15px;}
  .filter-bar{border-bottom: 1px solid #ddd;height: 36px;padding: 0 10px;line-height: 1em;
    .item{padding: 5px;}
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
