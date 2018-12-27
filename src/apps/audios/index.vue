<template>
<div class="abs bg-f flex app-audios">
  <af-left ref="afLeft" color="#288065" bg-color="#e0f3ed" vibrant-color="#00a773" title="音频" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all-all" @click="$router.replace('/audio/list?scope=all&status=all')">全部</navigator-item>
    <navigator-item icon="album" index="AudioAlbum" @click="$router.replace('/audio/album')">专辑</navigator-item>
    <navigator-item icon="check_circle" index="my-all" @click="$router.replace('/audio/list?scope=my&status=PASS')">已审<</navigator-item>
    <navigator-item icon="hourglass_full" index="my-AUDITING" @click="$router.replace('/audio/list?scope=my&status=AUDITING')">待审</navigator-item>
    <navigator-item icon="error" index="my-REJECT" @click="$router.replace('/audio/list?scope=my&status=REJECT')">驳回</navigator-item>
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
    getChannels () {
      this.$http.post('/cri-cms-platform/audio/getChannels.monitor').then(res => {
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
.app-audios{
  .navigator-item.active{color: #00a773;}
}
</style>
