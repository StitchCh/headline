<template>
<div class="abs bg-f flex app-article">
  <af-center>
    <div class="list-item a" slot-scope="slotProps">
      <div class="list-title flex-v-center">
        <i class="icon f-16 blue">thumb_up</i>
        <i class="icon f-16 orange">image</i>
        <span class="flex-item c-6 f-14 b">俄加里宁格勒今年将向中国出口360吨琥珀俄加里宁格勒今年将向中国出口360吨琥珀</span>
      </div>
      <div class="list-info f-12 c-8 flex-v-center">
        <span>2018-09-09</span>
        <span>超级管理员</span>
        <span class="list-info-num">
          <i v-tooltip:top="'阅读'">6</i>/<i v-tooltip:top="'评论'">0</i>/<i v-tooltip:top="'分享'">0</i>
        </span>
        <span class="flex-item"></span>
        <i class="icon f-14 c-a">computer</i>
        <i class="icon f-14 c-a">phone_iphone</i>
        <i class="icon f-14 c-a">public</i>
      </div>
    </div>
  </af-center>
</div>
</template>

<script>
import Account from '@/components/account'
import Dock from '@/components/dock'
import AfCenter from '@/components/app-frame/afCenter'

export default {
  name: 'app-article',
  components: { Account, AfCenter, Dock },
  data () {
    return {
      list: []
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
.app-article{
  .list-item{width: auto;}
}
</style>
