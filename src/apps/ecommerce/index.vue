<template>
<div class="abs bg-f flex app-ecommerce">
  <af-left color="#4d7b76" bg-color="#e0f3f1" vibrant-color="#009282" title="电商" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all" @click="$router.replace('/ecommerce?status=all')">全部</navigator-item>
    <!-- <navigator-item-group defaultExtended index="2" icon="face">
    <span slot="title">我的</span> -->
    <navigator-item icon="check_circle" index="PASS" @click="$router.replace('/ecommerce?status=PASS')">已审</navigator-item>
    <navigator-item icon="hourglass_full" index="AUDITING" @click="$router.replace('/ecommerce?status=AUDITING')">待审</navigator-item>
    <navigator-item icon="error" index="EcommerceReject" @click="$router.replace('/ecommerce/reject')">驳回</navigator-item>
    <navigator-item icon="class" index="EcommerceDraft" @click="$router.replace('/ecommerce/draft')">草稿</navigator-item>
    <!-- </navigator-item-group> -->
    <navigator-item icon="delete" index="EcommerceRecycle" @click="$router.replace('/ecommerce/recycle')">回收站</navigator-item>
  </af-left>
  <router-view></router-view>
</div>
</template>

<script>
import AfCenter from '@/components/app-frame/afCenter'
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-ecommerce',
  components: { AfCenter, AfLeft },
  computed: {
    defaultActive () {
      let { name } = this.$route
      name = name || ''
      let { status } = this.$route.query
      if (status) {
        return status
      }
      return name.replace('Content', '')
    }
  }
}
</script>

<style lang="less">
.app-ecommerce{
  .navigator-item.active{color: #009282;}
}
</style>
