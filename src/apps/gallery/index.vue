<template>
<div class="abs bg-f flex app-gallery">
  <af-left color="#7b5b4d" bg-color="#f3eee0" vibrant-color="#e45000" title="图集" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all-all" @click="$router.replace('/gallery?scope=all&status=all')">全部</navigator-item>
    <navigator-item icon="check_circle" index="my-all" @click="$router.replace('/gallery?scope=my&status=all')">已发</navigator-item>
    <navigator-item icon="hourglass_full" index="my-AUDITING" @click="$router.replace('/gallery?scope=my&status=AUDITING')">待审</navigator-item>
    <navigator-item icon="error" index="my-REJECT" @click="$router.replace('/gallery?scope=my&status=REJECT')">驳回</navigator-item>
    <navigator-item icon="class" index="GalleryDraft" @click="$router.replace('/gallery/draft')">草稿</navigator-item>
    <navigator-item icon="delete" index="GalleryRecycle" @click="$router.replace('/gallery/recycle')">回收站</navigator-item>
  </af-left>
  <router-view :channels="channels" />
</div>
</template>

<script>
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-gallery',
  components: { AfLeft },
  data () {
    return {
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$http.post('/cri-cms-platform/article/getChannels.monitor').then(res => {
        this.channels = res || []
      }).catch(e => {
        this.$toast(e.msg)
      })
    }
  },
  computed: {
    defaultActive () {
      let { name } = this.$route
      name = name || ''
      let { scope, status } = this.$route.query
      if (scope && status) {
        return `${scope}-${status}`
      }
      return name.replace('Content', '')
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang="less">
.app-gallery{
  .navigator-item.active{color: #e45000;}
}
</style>
