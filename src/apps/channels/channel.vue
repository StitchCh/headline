<template>
<div class="left bg-f flex-col channel-editor">
  <div class="flex-v-center" style="padding: 15px;border-bottom: 1px solid #ddd;">
    <span class="flex-item b">频道编辑</span>
    <btn flat style="margin-right: 5px;">撤销修改</btn>
    <btn>保存</btn>
  </div>
  <div class="flex-item scroll-y" style="padding: 15px;">
    <draggable-tree :data="channelTree" draggable>
      <div slot-scope="{data, store}"
        class="channel-tree-item flex-v-center"
        :class="{'new': data.new, 'del': data.del, 'on': $route.query.channelId === data.id, 'edit': data.edit}"
        @click="onItemClick(data)">
        <i class="icon tree-icon f-20 c-8 a"
          style="margin-right: 10px;"
          @click.stop="data.open=!data.open"
          >{{data.children && data.children.length ? (data.open ? 'folder_open' : 'folder') : 'insert_drive_file'}}</i>
        <div class="flex-item flex-v-center" style="height: 30px;overflow:hidden;">
          <span class="flex-item channel-name" v-if="!data.edit">{{data.channelName}}</span>
          <input type="text" v-else v-model="data.editChannelName" class="flex-item f-14">
        </div>
        <icon-btn small v-if="!data.edit" @click.native.stop="addChild(data)">add</icon-btn>
        <icon-btn small v-if="!data.edit" @click.native.stop="data.edit = true">edit</icon-btn>
        <icon-btn small v-if="data.edit" @click.native.stop="data.edit = false;data.channelName=data.editChannelName" class="green">check</icon-btn>
        <icon-btn small v-if="data.edit" @click.native.stop="data.edit = false;data.editChannelName=data.channelName">close</icon-btn>
        <icon-btn small @click.native.stop="del(data)">delete</icon-btn>
      </div>
    </draggable-tree>
  </div>
</div>
</template>

<script>
import { DraggableTree } from 'vue-draggable-nested-tree'
import WorkerCode from '@/common/Tree/tree.worker.js'

export default {
  name: 'channel-editor',
  components: { DraggableTree },
  data () {
    return {
      channels: [],
      channelTree: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    getChannels () {
      this.$http.post('/cri-cms-platform/sysRoles/getChannels.monitor').then(res => {
        this.channels = res.channels
        this.$emit('channelsLoad', JSON.parse(JSON.stringify(res.channels)))
        res.channels.forEach(item => {
          item.edit = false
          item.del = false
          item.editChannelName = item.channelName
        })
        const worker = new WorkerCode()
        worker.postMessage({ data: res.channels, idTxt: 'id', pidTxt: 'channelPartentId', childrenTxt: 'children', rootId: '1' })
        worker.addEventListener('message', e => {
          this.channelTree = e.data
          worker.terminate()
        })
        worker.addEventListener('error', e => {
          this.$toast(e.msg || e.message)
          worker.terminate()
        })
      }).catch(e => {
        this.$toast(e.msg || e.message)
      })
    },
    addChild (item) {
      item.open = true
      item.children.push({
        id: Math.random().toString(16).replace('0.', ''),
        channelName: '新频道',
        editChannelName: '新频道',
        channelPartentId: item.id,
        parent: item,
        children: [],
        del: false,
        open: true,
        new: true,
        edit: true
      })
    },
    del (item) {
      if (item.new) {
        let i = item.parent.children.indexOf(item)
        item.parent.children.splice(i, 1)
        return
      }
      this.$confirm({
        title: '删除确认',
        text: item.children.length ? `此操作将会删除【${item.channelName}】及此频道下的所有子频道\n是否继续？` : `确定删除【${item.channelName}】？`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          let i = item.parent.children.indexOf(item)
          item.parent.children.splice(i, 1)
        }
      })
    },
    onItemClick (item) {
      if (item.new) return
      this.$router.replace(`/channels?channelId=${item.id}`)
    }
  }
}
</script>

<style lang="less">
.channel-editor{width: 450px;border-right: 1px solid #ddd;
  .channel-name{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
  .channel-tree-item{line-height: 1em;border: 1px solid rgba(0,0,0,.08);padding-left: 7px;
    .icon-btn{opacity: .2;}
    input{height: 30px;background: #fff;border: 1px solid #ddd;padding: 0 5px;border-width: 0 1px;}
    &:hover{background: rgba(0,0,0,.1);
      .icon-btn{opacity: 1;}
    }
    &.edit .icon-btn{opacity: 1;}
    &.on{background: #0299ff;color: #fff;
      .icon{color: #fff;}
    }
    &.new.edit{border-color: #ddd;}
    &.new{color: #0299ff;}
    &.new .tree-icon{color: #93cdff;}
    &.del{color: #ff0d0d;}
    &.del .tree-icon{color: #ff8585;}
    &.del .channel-name{text-decoration:line-through;}
  }
  .draggable-placeholder-inner{border: 1px dashed rgb(84, 172, 255);
    .icon{visibility: hidden;}
  }
}
</style>
