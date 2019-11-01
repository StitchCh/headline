<template>
<div class="relative list-view">
  <div class="abs scroll-y list-scroller" id="scscscsc" ref="box">
    <ul>
      <li class="c-6 t-center a page-btn f-14" v-if="page > 1" @click="$emit('prev')">上一页</li>
      <slot v-for="(item, index) in list" :index="index" :item="item"></slot>
      <li class="c-6 t-center a page-btn f-14" v-if="page < totalPage" @click="$emit('next')">下一页</li>
      <!--<li v-if="page >= totalPage && list.length" class="c-a f-12 t-center">没有更多了</li>-->
    </ul>
  </div>
  <div v-if="!list.length" class="abs flex-center"><no-data/></div>
  <div v-if="loading" class="abs bg-light-rgb-2 flex-center"><loading size="30"/></div>
</div>
</template>

<script>
// import debounce from 'lodash/debounce'

export default {
  name: 'list-view',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    page: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      loading: false,
      firstload: true
    }
  },
  watch: {
    page () {
      if (!this.firstload) {
        this.$refs.box.scrollTop = 0
      }
    },
    'list' () {
      if (this.firstload) {
        this.$nextTick( () => {
          this.$refs.box.scrollTop = sessionStorage.getItem("viewScroll")
        })
        this.firstload = false
      }
    }
  }
}
</script>

<style lang="less">
.list-view{
  overflow: hidden;
  li{border-top: 1px solid #eee;line-height: 1em;}
  li:last-child{border-color: transparent;}
  .list-scroller{transition: all .3s;
    &.load-prev{transform: translateY(50px);}
    &.load-next{transform: translateY(-50px);}
  }
  .page-btn{padding: 10px 0;
    &:hover{background: rgba(0, 0, 0, .1)}
  }
}
</style>
