<template>
<div class="abs bg-f flex app-article">
  <div class="af-left">
    <div class="af-topbar">
      <dock title="文章"/>
    </div>
  </div>
  <div class="af-center flex-col">
    <div class="af-topbar"></div>
    <div class="flex-item"></div>
    <div class="af-bottombar"></div>
  </div>
  <div class="af-right flex-col">
    <div class="af-topbar"></div>
    <div class="flex-item"></div>
    <div class="af-bottombar"></div>
  </div>
</div>
</template>

<script>
import Dock from '@/components/dock'

export default {
  name: 'app-article',
  components: { Dock },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      // TO DO
    }
  }
}
</script>

<style lang="less">
.app-article{
  //
}
</style>
