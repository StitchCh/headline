<template>
<div class="abs bg-f flex app-videos">
  <af-left ref="afLeft" color="#4d6d7b" bg-color="#e0eff3" vibrant-color="#0093d4" title="视频" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all" @click="() => {if ($route.query.status != 'all') {$router.replace('/video/list?status=all')}}">全部</navigator-item>
    <navigator-item icon="album" index="VideoAlbum" @click="cons">专辑</navigator-item>
    <!-- <navigator-item-group defaultExtended index="2" icon="face">
    <span slot="title">我的</span> -->
    <navigator-item icon="check_circle" index="PASS" @click="() => {if ($route.query.status != 'PASS') {$router.replace('/video/list?status=PASS')}}">已审</navigator-item>
    <navigator-item icon="hourglass_full" index="AUDITING" @click="() => {if ($route.query.status != 'AUDITING') {$router.replace('/video/list?status=AUDITING')}}">待审</navigator-item>
    <navigator-item icon="error" index="VideoReject" @click="$router.replace('/video/reject')">驳回</navigator-item>
    <navigator-item icon="class" index="VideoDraft" @click="$router.replace('/video/draft')">草稿</navigator-item>
    <!-- </navigator-item-group> -->
    <navigator-item icon="delete" index="VideoRecycle" @click="$router.replace('/video/recycle')">回收站</navigator-item>
  </af-left>
  <router-view :channels="channels" />
</div>
</template>

<script>
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-videos',
  components: { AfLeft },
  data () {
    return {
      channels: []
    }
  },
  methods: {
    cons () {
      if (this.$router.history.current.fullPath.indexOf('/video/album') >= 0) {
        return
      }
      this.$router.replace('/video/album')
    },
    getChannels () {
      this.$http.post('/cri-cms-platform/video/getChannels.monitor').then(res => {
        this.channels = res || []
      }).catch(e => {
        this.$toast(e.msg)
        console.log(e)
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
.app-videos{
  .navigator-item.active{color: #0093d4;}
}
</style>
