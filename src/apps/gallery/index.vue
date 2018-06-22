<template>
<div class="abs bg-f flex app-gallery">
  <af-left color="#7b5b4d" bg-color="#f3eee0" vibrant-color="#e45000" title="图集" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all-all" @click="$router.replace('/gallery/list?scope=all&status=all')">全部</navigator-item>
    <!-- <navigator-item-group defaultExtended index="2" icon="face">
    <span slot="title">我的</span> -->
    <navigator-item icon="check_circle" index="my-all" @click="$router.replace('/gallery/list?scope=my&status=all')">已发</navigator-item>
    <navigator-item icon="hourglass_full" index="my-AUDITING" @click="$router.replace('/gallery/list?scope=my&status=AUDITING')">待审</navigator-item>
    <navigator-item icon="error" index="my-REJECT" @click="$router.replace('/gallery/tile?scope=my&status=REJECT')">驳回</navigator-item>
    <navigator-item icon="class" index="my-4" @click="$router.replace('/gallery/tile?scope=my&status=4')">草稿</navigator-item>
    <!-- </navigator-item-group> -->
    <navigator-item icon="delete" index="3-1" @click="$router.replace('/gallery/recycle')">回收站</navigator-item>
  </af-left>
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
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-gallery',
  components: { AfCenter, AfLeft },
  computed: {
    defaultActive () {
      return `${this.$route.query.scope}-${this.$route.query.status}`
    }
  }
}
</script>

<style lang="less">
.app-gallery{
  //
}
</style>
