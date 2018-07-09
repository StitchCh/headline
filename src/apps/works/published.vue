<template>
<div class="works-published">
  <works-layout
    v-for="item in layout"
    :key="item.id"
    :item="item"
  />
</div>
</template>

<script>
import WorksLayout from './layout'

export default {
  name: 'works-published',
  components: { WorksLayout },
  data () {
    return {
      loading: false,
      layout: []
    }
  },
  created () {
    this.getLayout()
  },
  watch: {
    '$route.query.channelId' () {
      this.getLayout()
    }
  },
  methods: {
    getLayout () {
      this.$emit('loading')
      this.$http.post('/cri-cms-platform/issue/getChannelLayoutList.monitor', {
        channelId: this.$route.query.channelId
      }).then(res => {
        this.$emit('endLoading')
        res.forEach(item => {
          if (item.type === '1') item.typeStr = 'list'
          if (item.type === '2') item.typeStr = 'ppt'
        })
        this.layout = res
      }).catch(e => {
        this.$emit('endLoading')
        this.$toast(e.message)
      })
    }
  }
}
</script>

<style lang="less">
.works-published{
  //
}
</style>
