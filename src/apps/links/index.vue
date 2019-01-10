<template>
<div class="abs bg-f flex app-article">
  <af-left color="#586c8e" vibrant-color="#2559cc" title="链接" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all" @click="$router.replace('/links/list?status=all')">全部</navigator-item>
    <!-- <navigator-item-group defaultExtended index="2" icon="face">
    <span slot="title">我的</span> -->
    <navigator-item icon="check_circle" index="PASS" @click="$router.replace('/links/list?status=PASS')">已审</navigator-item>
    <navigator-item icon="hourglass_full" index="AUDITING" @click="$router.replace('/links/list?status=AUDITING')">待审</navigator-item>
    <navigator-item icon="error" index="LinksReject" @click="$router.replace('/links/reject')">驳回</navigator-item>
    <navigator-item icon="class" index="LinksDraft" @click="$router.replace('/links/draft')">草稿</navigator-item>
    <!-- </navigator-item-group> -->
    <navigator-item icon="delete" index="LinksRecycle" @click="$router.replace('/links/recycle')">回收站</navigator-item>
  </af-left>
  <router-view/>
</div>
</template>

<script>
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-article',
  components: { AfLeft },
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
.app-article{
  .list-item{width: auto;}
  .navigator-item.active{background: #b8ddf3;color: #0059cc;}
}
</style>
