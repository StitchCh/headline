<template>
<div class="settings-channel">
  <div class="af-topbar">
    settings-channel
  </div>
  <div class="flex-item scroll-y">
    <div class="card">
      <!-- <tree
        class="c-4"
        :data="channels"
        openAll
        :draggable="true"
        pidTxt="channelPartentId"></tree> -->
      <draggable-tree :data="data" draggable>
        <div slot-scope="{data, store}">
          {{data.text}}
        </div>
      </draggable-tree>
    </div>
  </div>
</div>
</template>

<script>
import { DraggableTree } from 'vue-draggable-nested-tree'

export default {
  name: 'settings-channel',
  components: { DraggableTree },
  data () {
    return {
      channels: [],
      data: [
        { text: 'node 1' },
        { text: 'node 2' },
        { text: 'node 3 undraggable', draggable: false },
        { text: 'node 4' },
        { text: 'node 4 undroppable', droppable: false },
        {
          text: 'node 5',
          children: [
            { text: 'node 1' },
            {
              text: 'node 2',
              children: [
                { text: 'node 3' },
                { text: 'node 4' }
              ]
            },
            {
              text: 'node 2 undroppable',
              droppable: false,
              children: [
                { text: 'node 3' },
                { text: 'node 4' }
              ]
            },
            {
              text: 'node 2',
              children: [
                { text: 'node 3' },
                { text: 'node 4 undroppable', droppable: false }
              ]
            },
            { text: 'node 3' },
            { text: 'node 4' },
            { text: 'node 3' },
            { text: 'node 4' },
            { text: 'node 3' },
            { text: 'node 4' },
            { text: 'node 3' },
            { text: 'node 4' }
          ]
        }
      ]
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    getChannels () {
      this.$http.post('/cri-cms-platform/sysRoles/getChannels.monitor').then(res => {
        res.channels.forEach(item => {
          item.name = item.channelName
        })
        this.channels = res.channels
      }).catch(e => {
        this.$toast(e.msg)
      })
    }
  }
}
</script>

<style lang="less">
.settings-channel{
  //
}
</style>
