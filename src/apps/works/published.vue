<template>
<div class="works-published">
  <div class="relative f-14 c-6" style="margin-bottom: 10px;line-height: 1em;">
    <div class="bg-f works-layout flex-center a b" @click="addShow=!addShow" :key="'0000000'" style="padding: 10px;">
      <i class="icon" style="margin-right: 10px;">add</i>
      <span>新增布局</span>
    </div>
    <bubble v-if="addShow" @close="addShow=false">
      <ul class="f-14 c-5 add-select" style="padding: 10px 0;width: 200px;">
        <li class="a flex-v-center" @click="addLayout('1', '幻灯片')">
          <i class="icon f-20">view_carousel</i>
          <span class="flex-item">幻灯片</span>
        </li>
        <li class="a flex-v-center" @click="addLayout('2', '列表')">
          <i class="icon f-20">view_list</i>
          <span class="flex-item">列表</span>
        </li>
        <li class="a flex-v-center" @click="addLayout('3', '子频道')"
          :style="!childChannel.length ? {opacity: .5,pointerEvents: 'none'} : ''">
          <i class="icon f-20">radio</i>
          <span class="flex-item">子频道</span>
        </li>
      </ul>
    </bubble>
  </div>
  <draggable v-model="newlayout" @end="onDragEnd" :options="{handle: '.drag-handle'}">
    <transition-group tag="div" name="flip-list">
      <works-layout
        v-for="(item, i) in newlayout"
        ref="layout"
        :key="item.id"
        :item="item"
        :childChannel="childChannel"
        @delete="del(i)"
      />
    </transition-group>
  </draggable>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import WorksLayout from './layout'
import uniqBy from 'lodash/uniqBy'
import moment from 'moment'

export default {
  name: 'works-published',
  components: { draggable, WorksLayout },
  props: {
    channel: {
      type: Array,
      default: () => []
    },
    childChannel: {
      type: Array,
      default: () => []
    },
    layout: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false,
      addShow: false,
      newlayout: this.layout
    }
  },
  watch: {
    layout () {
      this.newlayout = this.layout
    }
  },
  computed: {
  },
  methods: {
    add (checked) {
      this.$refs.layout.forEach(layout => {
        let addItems = checked.filter(item => item.layoutId === layout.item.id)
        addItems.forEach(item => {
          item.new = true
          item.del = false
          item.top = false
          item.changed = false
          item.dateRange = [moment().format('YYYY-MM-DD HH:mm:ss'), moment().add(1, 'year').format('YYYY-MM-DD HH:mm:ss')]
          // item.editSendDate = item.sendDate || moment().format('YYYY-MM-DD HH:mm:ss')
          // item.editEndDate = item.endDate || '9999-12-30 23:59:59'
          item.sortOrder = item.order = 1
          item.key = Math.random().toString(16).replace('0.', '')
          item.newTitle = item.title
          item.newAbstract = item.abstracts || ''
        })
        layout.add = uniqBy(addItems.concat(layout.add), 'id')
      })
    },
    addLayout (type, name) {
      if (!this.childChannel.length && type === '3') return
      this.addShow = false
      this.newlayout.unshift({
        id: Math.random().toString(6).replace('0.', ''),
        new: true,
        layoutName: name,
        orderNum: '1',
        type
      })
      this.newlayout.forEach((item, i) => {
        item.orderNum = (i + 1).toString()
      })
      // console.log(this.newlayout)
    },
    del (i) {
      this.newlayout.splice(i, 1)
    },
    getIssueResult () {
      return this.$refs.layout.map(item => item.getIssueResult())
    },
    getLayoutResult () {
      return this.$refs.layout.map(item => item.getLayoutResult())
    },
    onDragEnd () {
      this.newlayout.forEach((item, i) => {
        item.orderNum = (i + 1)
      })
      this.$emit('dragend', this.newlayout)
    }
  }
}
</script>

<style lang="less">
.works-published{
  .add-select{
    li{padding: 5px 15px;}
    .icon{margin-right: 15px;}
    li:hover{background: #eee;}
  }
}
</style>
