<template>
<div class="abs bg-f flex app-article">
  <af-left color="#586c8e" vibrant-color="#2559cc" title="文章" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all" @click="() => {if ($route.query.status != 'all') {$router.replace('/article/list?status=all')}}">全部</navigator-item>
    <!-- <navigator-item-group defaultExtended index="2" icon="face">
    <span slot="title">我的</span> -->
    <navigator-item v-if="roleName.indexOf('SUPER_ADMIN') >= 0" icon="folder" index="article_theme" @click="$router.replace('/article/list?article_theme=true&status=article_theme')">专题</navigator-item>
    <navigator-item icon="check_circle" index="PASS" @click="() => {if ($route.query.status != 'PASS') {$router.replace('/article/list?status=PASS')}}">已审</navigator-item>
    <navigator-item icon="hourglass_full" index="AUDITING" @click="() => {if ($route.query.status != 'AUDITING') {$router.replace('/article/list?status=AUDITING')}}">待审</navigator-item>
    <navigator-item icon="error" index="ArticleReject" @click="$router.replace('/article/reject')">驳回</navigator-item>
    <navigator-item icon="class" index="ArticleDraft" @click="$router.replace('/article/draft')">草稿</navigator-item>
    <!-- </navigator-item-group> -->
    <navigator-item icon="delete" index="ArticleRecycle" @click="$router.replace('/article/recycle')">回收站</navigator-item>
  </af-left>
  <router-view></router-view>
</div>
</template>

<script>
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-article',
  components: { AfLeft },
  data () {
    return {
      roleName: ''
    }
  },
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
  },
  beforeMount () {
    this.roleName = sessionStorage.getItem('roleName')
    console.log(this.roleName)
  }
}
</script>

<style lang="less">
.app-article{
  .list-item{width: auto;}
  .navigator-item.active{background: #b8ddf3;color: #0059cc;}
}
</style>
