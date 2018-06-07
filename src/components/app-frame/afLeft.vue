<template>
<div class="af-left flex-col" :style="{ color, backgroundColor: bgColor }">
  <div class="af-dock flex-v-center"><dock :title="title" :color="color"></dock></div>
  <div class="flex-item">
    <ul>
      <!--<navigator-item icon="delete" @click="lll(666)">111</navigator-item>-->
      <!--<navigator-item>222</navigator-item>-->
      <!--<navigator-item>333</navigator-item>-->
      <!--<navigator-item-group>-->
        <!--<navigator-item slot="title" icon="list">菜单1</navigator-item>-->
        <!--<navigator-item style="padding-left: 40px;" status="done" @click="lll(123)">444</navigator-item>-->
        <!--<navigator-item style="padding-left: 40px;" status="warning">555</navigator-item>-->
        <!--<navigator-item style="padding-left: 40px;" status="error">666</navigator-item>-->
        <!--<navigator-item style="padding-left: 40px;" status="disabled">666</navigator-item>-->
      <!--</navigator-item-group>-->
      <!--<navigator-item>777</navigator-item>-->
      <!--<navigator-item-group>-->
        <!--<navigator-item slot="title">菜单2</navigator-item>-->
        <!--<navigator-item style="padding-left: 40px;">888</navigator-item>-->
        <!--<navigator-item style="padding-left: 40px;">999</navigator-item>-->
      <!--</navigator-item-group>-->
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
      this.activeIndex = index
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
