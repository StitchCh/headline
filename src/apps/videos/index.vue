<template>
<div class="abs bg-f flex app-videos">
  <af-left color="#4d6d7b" bg-color="#e0eff3" vibrant-color="#0093d4" title="视频" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all-all" @click="$router.replace('/video/list?scope=all&status=all')">全部</navigator-item>
    <navigator-item icon="album" index="album" @click="$router.replace('/video/list?scope=all&status=all')">专辑</navigator-item>
    <!-- <navigator-item-group defaultExtended index="2" icon="face">
    <span slot="title">我的</span> -->
    <navigator-item icon="check_circle" index="my-all" @click="$router.replace('/video/list?scope=my&status=all')">已发</navigator-item>
    <navigator-item icon="hourglass_full" index="my-AUDITING" @click="$router.replace('/video/list?scope=my&status=AUDITING')">待审</navigator-item>
    <navigator-item icon="error" index="my-REJECT" @click="$router.replace('/video/list?scope=my&status=REJECT')">驳回</navigator-item>
    <navigator-item icon="class" index="my-4" @click="$router.replace('/video?scope=my&status=4')">草稿</navigator-item>
    <!-- </navigator-item-group> -->
    <navigator-item icon="delete" index="3-1" @click="$router.replace('/video')">回收站</navigator-item>
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
    getChannels () {
      this.$http.post('/cri-cms-platform/video/getChannels.monitor').then(res => {
        this.channels = res || []
      }).catch(e => {
        this.$toast(e.msg)
      })
    }
  },
  computed: {
    defaultActive () {
      let { scope, status, name } = this.$route.query
      if (scope && status) {
        return `${scope}-${status}`
      }
      return name
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
