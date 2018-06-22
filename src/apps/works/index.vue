<template>
<div class="abs bg-f flex app-work">
  <af-left bg-color="#fafafa" vibrant-color="#008cff" title="工作台" style="width: 220px;">
    <div class="f-12 c-8" style="padding: 3px 20px;">频道列表</div>
    <tree class="c-4" :data="channels" auto-open pidTxt="channelPartentId"></tree>
  </af-left>
  <div class="flex-item flex-col">
    <div class="af-topbar flex-v-center">
      <div class="flex-item"></div>
      <account/>
    </div>
  </div>
</div>
</template>

<script>
import Account from '@/components/account'
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-work',
  components: { Account, AfLeft },
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.post('/cri-cms-platform/sysRoles/getChannels.monitor').then(res => {
        res.forEach(item => {
          item.name = item.channelName
        })
        this.channels = res
      }).catch(e => {
        this.$toast(e.message)
      })
    }
  }
}
</script>

<style lang="less">
.app-work{
  //
}
</style>
