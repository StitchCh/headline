<template>
<div class="relative list-view">
  <div class="loading-box flex-center" v-if="loadState > 0" :class="{'load-more': loadState === 2}">
    <loading size="30"/>
  </div>
  <div class="abs scroll-y list-scroller" ref="box" @mousewheel="onMousewheel" :class="{
    'load-prev': loadState === 1,
    'load-next': loadState === 2
  }">
    <ul ref="ctn">
      <slot v-for="item in list" :item="item"></slot>
    </ul>
  </div>
  <div v-if="!list.length" class="abs flex-center"><no-data/></div>
  <div v-if="loading" class="abs flex-center"><loading size="30"/></div>
</div>
</template>

<script>
import throttle from 'lodash/throttle'

export default {
  name: 'list-view',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    loading: Boolean
  },
  data () {
    return {
      loadState: 0
    }
  },
  methods: {
    onMousewheel: throttle(function (e) {
      if (this.loadState > 0) return
      let deltaY = e.deltaY
      let top = this.$refs.box.scrollTop
      if (top === 0 && deltaY < 0) {
        this.loadState = 1
        this.$emit('prev')
        return
      }
      let h = this.$refs.box.clientHeight
      let ch = this.$refs.ctn.clientHeight
      if (top + h === ch && deltaY > 0) {
        this.loadState = 2
        this.$emit('next')
      }
    }, 500)
    // onMousewheel (e) {
    //   if (this.loadState > 0) return
    //   let h = this.$refs.box.clientHeight
    //   let ch = this.$refs.ctn.clientHeight
    //   let top = this.$refs.box.scrollTop
    //   let deltaY = e.deltaY
    //   // console.log(deltaY)
    //   if (top === 0 && deltaY < 0) {
    //     this.loadState = 1
    //   }

    //   setTimeout(() => {
    //     this.loadState = 0
    //   }, 1000)
    // }
  }
}
</script>

<style lang="less">
.list-view{
  overflow: hidden;
  .loading-box{position: absolute;left: 0;top: 0;width: 100%;height: 50px;
    &.load-more{top: auto;bottom: 0;}
  }
  li{border-top: 1px solid #eee;}
  li:last-child{border-color: transparent;}
  .list-scroller{transition: all .3s;
    &.load-prev{transform: translateY(50px);}
    &.load-next{transform: translateY(-50px);}
  }
}
</style>
