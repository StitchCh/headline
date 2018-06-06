<template>
<div class="abs bg-f flex app-gallery">
  <af-center>
    <div class="list-item a flex-v-center" slot-scope="slotProps">
      <div class="list-cover"></div>
      <div class="flex-item list-ctn">
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
    </div>
  </af-center>
</div>
</template>

<script>
import AfCenter from '@/components/app-frame/afCenter'

export default {
  name: 'app-gallery',
  components: { AfCenter }
}
</script>

<style lang="less">
.app-gallery{
  //
}
</style>
