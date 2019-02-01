<template>
<div class="abs bg-f flex app-audios">
  <af-left ref="afLeft" color="#288065" bg-color="#e0f3ed" vibrant-color="#00a773" title="音频" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all" @click="() => {if ($route.query.status != 'all') {$router.replace('/audio/list?status=all')}}">全部</navigator-item>
    <navigator-item icon="album" index="AudioAlbum" @click="cons">专辑</navigator-item>
    <navigator-item icon="check_circle" index="PASS" @click="() => {if ($route.query.status != 'PASS') {$router.replace('/audio/list?status=PASS')}}">已审</navigator-item>
    <navigator-item icon="hourglass_full" index="AUDITING" @click="() => {if ($route.query.status != 'AUDITING') {$router.replace('/audio/list?status=AUDITING')}}">待审</navigator-item>
    <navigator-item icon="error" index="AudioReject" @click="$router.replace('/audio/reject')">驳回</navigator-item>
    <navigator-item icon="class" index="AudioDraft" @click="$router.replace('/audio/draft')">草稿</navigator-item>
    <navigator-item icon="delete" index="AudioRecycle" @click="$router.replace('/audio/recycle')">回收站</navigator-item>
  </af-left>
  <router-view :channels="channels" />
</div>
</template>

<script>
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-audios',
  components: { AfLeft },
  data () {
    return {
      channels: []
    }
  },
  methods: {
    cons () {
      if (this.$router.history.current.fullPath.indexOf('/audio/album') >= 0) {
        return
      }
      this.$router.replace('/audio/album')
    },
    getChannels () {
      this.$http.post('/cri-cms-platform/audio/getChannels.monitor').then(res => {
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
.app-audios{
  .navigator-item.active{color: #00a773;}
}
</style>
