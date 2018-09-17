<template>
  <div>123</div>
</template>

<script>
export default {
  name: 'app-gallery-content',
  props: {
    id: String,
    channels: {
      type: Array,
      default: () => []
    },
    getUrl: {
      type: String,
      default: '/cri-cms-platform/gallery/get.monitor'
    }
  },
  data () {
    return {
      content: {},
      channelIds: '',
      thumbItem: {
        show: false,
        url: ''
      },
      loading: false
    }
  },
  methods: {
    getGallery () {
      this.loading = true
      this.$http.post(this.getUrl, {
        id: this.id
      }).then(
        res => {
          console.log(res)
          // this.content = res.content || {}
          // if (res.video) {
          //   this.playerOptions.sources[0].src = res.video.video
          //   this.playerOptions.poster = res.video.thumb ? res.video.thumb[0].url || '' : ''
          // } else {
          //   this.playerOptions.sources[0].src = this.playerOptions.poster = ''
          // }
          // this.channelIds = res.channelIds || ''
          this.loading = false
        }
      )
    }
  },
  created () {
    this.getGallery()
  },
  watch: {
    id () {
      this.getGallery()
    }
  }
}
</script>

<style lang="less">
.gallery-content {
}
</style>
