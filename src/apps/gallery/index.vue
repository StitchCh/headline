<template>
<div class="abs bg-f flex app-gallery">
  <af-left color="#7b5b4d" bg-color="#f3eee0" vibrant-color="#e45000" title="图集" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all" @click="$router.replace('/gallery?status=all')">全部</navigator-item>
    <navigator-item icon="check_circle" index="PASS" @click="$router.replace('/gallery?status=PASS')">已审</navigator-item>
    <navigator-item icon="hourglass_full" index="AUDITING" @click="$router.replace('/gallery?status=AUDITING')">待审</navigator-item>
    <navigator-item icon="error" index="GalleryReject" @click="$router.replace('/gallery/reject')">驳回</navigator-item>
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
      this.$http.post('/cri-cms-platform/gallery/getChannels.monitor').then(res => {
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
      let { status } = this.$route.query
      if (status) {
        return status
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
