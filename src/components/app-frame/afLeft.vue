<template>
<div class="af-left flex-col" :style="{ color, backgroundColor: bgColor }">
  <div class="af-dock flex-v-center"><dock :title="title" :color="vibrantColor"></dock></div>
  <div class="flex-item scroll-y">
    <ul>
      <slot></slot>
    </ul>
  </div>
</div>
</template>

<script>
import Dock from '@/components/dock'

export default {
  name: 'af-left',
  components: { Dock },
  data () {
    return {
      activeIndex: ''
    }
  },
  props: {
    color: {
      type: String,
      default: ''
    },
    vibrantColor: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 200
    },
    title: {
      type: String,
      default: 'CCPT'
    },
    defaultActive: String
  },
  methods: {
    setActiveIndex (index) {
      if (index) this.activeIndex = index
    }
  },
  created () {
    if (this.defaultActive) {
      this.activeIndex = this.defaultActive
    }
  }
}
</script>

<style lang="less">
.af-left{width: 200px;border-right: 1px solid rgba(0, 0, 0, .1);background: #e2f1fa;
  //
  .af-dock {height: 50px;border-bottom: 1px solid rgba(0, 0, 0, .1);padding-left: 20px;}
}
</style>
