<template>
<div class="flex-item flex recycle">
  <div class="flex-col recycle-center">
    <div class="af-topbar flex-v-center">
      <i class="icon c-a f-20">search</i>
      <input v-model="filter.search" type="text" class="flex-item c-6 f-14 search-input" placeholder="搜索标题">
      <icon-btn small @click="filter.search=''">close</icon-btn>
    </div>
    <!-- <div class="filter-bar flex-v-center">
      <label class="relative a" style="display:inline-block;height: 100%;">
        <vue-datepicker-local v-model="filter.range" show-buttons></vue-datepicker-local>
        <span v-if="!filter.range.length" class="flex-v-center" style="position:absolute;left: 0;top: 6px;">
          <span class="f-14 c-6">全部时间</span>
          <i class="icon f-18 c-8">keyboard_arrow_down</i>
        </span>
      </label>
      <span class="flex-item"></span>
      <icon-btn small v-tooltip:top="'清空'" @click="filter.range=[]">close</icon-btn>
    </div> -->
    <list-view :list="list" class="flex-item"
      @prev="filter.toPage = filter.toPage <= 1 ? 1 : filter.toPage - 1"
      @next="filter.toPage = filter.toPage >= totalPage ? totalPage : filter.toPage + 1"
      >
      <li slot-scope="slotProps">
        <div class="list-item c-6 f-14 a" :class="{ on: slotProps.item.id === id }" @click="$router.push('/article/recycle/' + slotProps.item.id)">
          <div class="b" style="white-space: nowrap;overflow:hidden;text-overflow:ellipsis">{{slotProps.item.title}}</div>
          <div class="c-8 f-12" style="margin-top: 5px;">
            <span>{{slotProps.item.createDate}}</span>
          </div>
        </div>
      </li>
    </list-view>
    <div class="af-bottombar flex-center">
      <icon-btn small class="a" @click="onPrev" :disabled="filter.toPage <= 1">keyboard_arrow_left</icon-btn>
      <span class="f-14 c-6" style="margin: 0 10px;line-height: 1em;">第 {{filter.toPage}} / {{totalPage}} 页</span>
      <icon-btn small class="a" @click="onNext" :disabled="filter.toPage >= totalPage">keyboard_arrow_right</icon-btn>
    </div>
  </div>
  <div class="af-right flex-item flex-col">
    <div class="af-topbar flex-v-center">
      <div class="flex-v-center" v-if="$route.params.id">
        <icon-btn small v-tooltip:bottom="'还原'" style="margin-right: 10px;" @click="recover">undo</icon-btn>
        <!-- <icon-btn small v-tooltip:bottom="'彻底删除'">delete</icon-btn> -->
      </div>
      <div class="flex-item"></div>
      <account/>
    </div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Account from '@/components/account'
import ListView from '@/components/listView'
import VueDatepickerLocal from 'vue-datepicker-local'
import debounce from 'lodash/debounce'

export default {
  name: 'recycle',
  components: { Account, ListView, VueDatepickerLocal },
  props: [ 'id' ],
  data () {
    return {
      list: [],
      totalPage: 1,
      filter: {
        // range: []
        toPage: 1,
        pageSize: 30,
        order: 'desc',
        searchby: 'title',
        search: ''
      }
    }
  },
  created () {
    this.getList()
  },
  watch: {
    'filter.search' () {
      this.search()
    },
    'filter.toPage' () {
      this.getList()
    }
  },
  methods: {
    getList (refresh) {
      if (refresh) this.filter.toPage = 1
      this.$http.post('/cri-cms-platform/article/getRecycle.monitor', this.filter).then(res => {
        this.list = res.pages || []
        this.totalPage = res.totalPage || 1
      }).catch(e => {
        console.log(e)
      })
    },
    onPrev () {
      let { filter } = this
      if (filter.toPage === 1) return
      filter.toPage = filter.toPage <= 1 ? 1 : filter.toPage - 1
    },
    onNext () {
      let { filter, totalPage } = this
      if (filter.toPage === totalPage) return
      filter.toPage = filter.toPage >= totalPage ? totalPage : filter.toPage + 1
    },
    search: debounce(function () {
      this.getList(true)
    }, 400),
    recover () {
      this.$confirm({
        title: '您确定要恢复此文章吗？',
        text: '恢复后文章需要重新审核',
        btns: ['取消', '恢复'],
        color: 'green',
        yes: () => {
          this.$http.post('/cri-cms-platform/article/reduction.monitor', {
            selectedIds: this.id
          }).then(res => {
            this.getList()
            this.$router.replace('/article/recycle')
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.recycle{
  .search-input{height: 30px;border: none;background: transparent;margin-left: 10px;}
  .filter-bar{border-bottom: 1px solid rgba(0, 0, 0, .1);padding: 0 15px;}
  .recycle-center{width: 400px;border-right: 1px solid rgba(0, 0, 0, .1);background: #f8f8f8;}
  .datepicker{min-width: 180px;
    .datepicker-popup{width: 415px;}
    &::before{content: none;}
    input{border: none;padding: 0;width: 180px;background: transparent;}
  }
  .list-item.on{background: #73a9ea;color: #fff;
    span{color: rgba(255, 255, 255, .8);}
  }
}
</style>
