<template>
  <div class="abs bg-f flex app-special">
    <af-left color="#66637b" bg-color="#e9e7f7" vibrant-color="#4131b5" title="直播" :defaultActive="defaultActive">
      <navigator-item icon="folder" index="all-all" @click="$router.replace('/live?scope=all&status=all')">全部</navigator-item>
      <!-- <navigator-item-group defaultExtended index="2" icon="face">
      <span slot="title">我的</span> -->
      <navigator-item icon="check_circle" index="my-all" @click="$router.replace('/live?scope=my&status=PASS')">已审</navigator-item>
      <!--<navigator-item icon="hourglass_full" index="my-AUDITING" @click="$router.replace('/special?scope=my&status=AUDITING')">待审</navigator-item>-->
      <!--<navigator-item icon="error" index="my-REJECT" @click="$router.replace('/special?scope=my&status=REJECT')">驳回</navigator-item>-->
      <!--<navigator-item icon="class" index="my-4" @click="$router.replace('/special?scope=my&status=4')">草稿</navigator-item>-->
      <!-- </navigator-item-group> -->
      <navigator-item icon="delete" index="3-1" @click="$router.replace('/live/recycle')">回收站</navigator-item>
    </af-left>

    <router-view></router-view>
  </div>
</template>

<script>
import AfCenter from '@/components/app-frame/afCenter'
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-special',
  components: { AfCenter, AfLeft },
  computed: {
    defaultActive () {
      return `${this.$route.query.scope}-${this.$route.query.status}`
    }
  }
}
</script>

<style lang="less">
  .app-special{
    .navigator-item.active{color: #4131b5;}
  }
</style>
