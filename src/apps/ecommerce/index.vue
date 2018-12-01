<template>
<div class="abs bg-f flex app-ecommerce">
  <af-left color="#4d7b76" bg-color="#e0f3f1" vibrant-color="#009282" title="电商" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all-all" @click="$router.replace('/ecommerce?scope=all&status=all')">全部</navigator-item>
    <!-- <navigator-item-group defaultExtended index="2" icon="face">
    <span slot="title">我的</span> -->
    <navigator-item icon="check_circle" index="my-all" @click="$router.replace('/ecommerce?scope=my&status=all')">已发</navigator-item>
    <navigator-item icon="hourglass_full" index="my-AUDITING" @click="$router.replace('/ecommerce?scope=my&status=AUDITING')">待审</navigator-item>
    <navigator-item icon="error" index="my-REJECT" @click="$router.replace('/ecommerce?scope=my&status=REJECT')">驳回</navigator-item>
    <navigator-item icon="class" index="my-4" @click="$router.replace('/ecommerce?scope=my&status=4')">草稿</navigator-item>
    <!-- </navigator-item-group> -->
    <navigator-item icon="delete" index="3-1" @click="$router.replace('/ecommerce/recycle')">回收站</navigator-item>
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
      return `${this.$route.query.scope}-${this.$route.query.status}`
    }
  }
}
</script>

<style lang="less">
.app-ecommerce{
  .navigator-item.active{color: #009282;}
}
</style>
