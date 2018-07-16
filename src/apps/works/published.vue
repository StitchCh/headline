<template>
<div class="works-published">
  <draggable v-model="layout">
    <transition-group tab="div" name="flip-list" :options="{draggable:'.title'}">
      <works-layout
        v-for="item in layout"
        ref="layout"
        :key="item.id"
        :item="item"
      />
    </transition-group>
  </draggable>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import WorksLayout from './layout'

export default {
  name: 'works-published',
  components: { draggable, WorksLayout },
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
  computed: {
    result () {
      return this.$refs.layout.map(item => item.result)
    }
  },
  methods: {
    getLayout () {
      this.$emit('loading')
      this.$http.post('/cri-cms-platform/issue/getChannelLayoutList.monitor', {
        channelId: this.$route.query.channelId
      }).then(res => {
        this.$emit('endLoading')
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
