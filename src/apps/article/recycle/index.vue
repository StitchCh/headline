<template>
<div class="flex-item flex recycle">
  <div class="flex-col af-center">
    <div class="af-topbar flex-v-center">
      <i class="icon c-a f-20">search</i>
      <input type="text" class="flex-item c-6 f-14 search-input" placeholder="搜索标题">
    </div>
    <div class="filter-bar flex-v-center">
      <label class="relative a" style="display:inline-block;height: 100%;">
        <vue-datepicker-local v-model="filter.range"></vue-datepicker-local>
        <span v-if="!filter.range.length" class="flex-v-center" style="position:absolute;left: 0;top: 7px;">
          <span class="f-14 c-6">全部时间</span>
          <i class="icon f-18 c-8">keyboard_arrow_down</i>
        </span>
      </label>
      <span class="flex-item"></span>
      <icon-btn small v-tooltip:top="'清空'" @click="filter.range=[]">close</icon-btn>
    </div>
    <list-view class="flex-item">
      <li slot-scope="slotProps">
        sss
      </li>
    </list-view>
    <div class="af-bottombar">ss</div>
  </div>
  <div class="af-right flex-item flex-col">
    <div class="af-topbar flex-v-center">
      <icon-btn small v-tooltip:bottom="'还原'" style="margin-right: 10px;">undo</icon-btn>
      <icon-btn small v-tooltip:bottom="'彻底删除'">delete</icon-btn>
      <div class="flex-item"></div>
      <account/>
    </div>
    <div class="flex-item"></div>
  </div>
</div>
</template>

<script>
import Account from '@/components/account'
import ListView from '@/components/listView'
import VueDatepickerLocal from 'vue-datepicker-local'

export default {
  name: 'recycle',
  components: { Account, ListView, VueDatepickerLocal },
  data () {
    return {
      list: [],
      filter: {
        range: []
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      // TO DO
    }
  }
}
</script>

<style lang="less">
.recycle{
  .search-input{height: 30px;border: none;background: transparent;margin-left: 10px;}
  .filter-bar{border-bottom: 1px solid rgba(0, 0, 0, .1);padding: 0 15px;height: 36px;}
  .af-center{width: 400px;border-right: 1px solid rgba(0, 0, 0, .1);background: #f8f8f8;}
  .datepicker{min-width: 180px;
    .datepicker-popup{width: 415px;}
    &::before{content: none;}
    input{border: none;padding: 0;width: 180px;background: transparent;}
  }
}
</style>
