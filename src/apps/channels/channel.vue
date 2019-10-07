<template>
<div class="left bg-f flex-col channel-editor">
  <div class="flex-v-center" style="padding: 15px;border-bottom: 1px solid #ddd;">
    <span class="flex-item b">频道编辑</span>
    <btn flat @click="refresh" style="margin-right: 5px;">撤销修改</btn>
    <btn @click="submit">保存</btn>
  </div>
  <div class="flex-item scroll-y" style="padding: 15px;">
    <draggable-tree :data="channelTree" draggable ref="draggabletree">
      <div slot-scope="{data, store}"
        class="channel-tree-item flex-v-center"
        :class="{'new': data.new, 'del': data.del, 'on': $route.query.channelId === data.id, 'edit': data.edit}"
        @click="onItemClick(data)">
        <i class="icon tree-icon f-20 c-8 a"
          style="margin-right: 10px;"
          @click.stop="data.open=!data.open"
          >{{data.children && data.children.length ? (data.open ? 'folder_open' : 'folder') : 'insert_drive_file'}}</i>
        <div class="flex-item flex-v-center" style="height: 40px;overflow:hidden;">
          <span class="flex-item channel-name" v-if="!data.edit">{{data.channelName}}</span>
          <input type="text" v-else v-model="data.editChannelName" class="flex-item f-14">
        </div>
        <app-article-add-thumb v-if="data.channelPartentId != 0" v-model="data.channelIcon"  class="tagimg" style="width: 32px;height: 32px;float: right;overflow: hidden;"></app-article-add-thumb>
        <icon-btn small v-if="!data.edit" @click.native.stop="addChild(data)">add</icon-btn>
        <icon-btn small v-if="!data.edit && data.channelPartentId != 0" @click.native.stop="data.edit = true">edit</icon-btn>
        <icon-btn small v-if="data.edit && data.channelPartentId != 0" @click.native.stop="data.edit = false;data.channelName=data.editChannelName" class="green">check</icon-btn>
        <icon-btn small v-if="data.edit && data.channelPartentId != 0" @click.native.stop="data.edit = false;data.editChannelName=data.channelName">close</icon-btn>
        <linkBtn v-if="data.channelPartentId != 0" @click.native.stop :link="data.channelUrl" :linkShow="data.isEnabledUrl" @linkchange="obj => {data.channelUrl = obj.link; data.isEnabledUrl = obj.linkshow}"></linkBtn>
        <icon-btn small v-if="data.channelPartentId != 0" @click.native.stop="del(data)">delete</icon-btn>
      </div>
    </draggable-tree>

    <div class="channel-tree-item flex-v-center"
         @click="onItemClick({id: 50000})">
      <i class="icon tree-icon f-20 c-8 a"
         style="margin-right: 10px;"
      >insert_drive_file</i>
      <div class="flex-item flex-v-center" style="height: 40px;overflow:hidden;">
        <span class="flex-item channel-name">PC端发布</span>
      </div>
    </div>
    <!-- <div>{{delChannels}}</div> -->
  </div>
</div>
</template>

<script>
import { DraggableTree } from 'vue-draggable-nested-tree'
import WorkerCode from '@/common/Tree/tree.worker.js'
import AppArticleAddThumb from './thumb'
import linkBtn from './linkBtn'

function getTreeData (rootNode) {
  let res = []
  function getData (node) {
    let children = node.children
    children.forEach(item => {
      res.push({
        id: item.new ? '' : item.id,
        channelName: item.channelName,
        channelPartentId: node.id,
        channelManager: '',
        channelIcon: item.channelIcon,
        channelUrl: item.channelUrl,
        isEnabledUrl: item.isEnabledUrl
      })
      if (item.children.length) {
        getData(item)
      }
    })
  }
  getData(rootNode)
  return res
}

export default {
  name: 'channel-editor',
  components: { DraggableTree, AppArticleAddThumb, linkBtn },
  data () {
    return {
      channels: [],
      channelTree: [],
      delChannels: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    getChannels () {
      this.$http.post('/cri-cms-platform/channel/getChannels.monitor').then(res => {
        this.channels = res
        this.$emit('channelsLoad', JSON.parse(JSON.stringify(res)))
        res.forEach(item => {
          item.edit = false
          item.del = false
          item.editChannelName = item.channelName
        })
        const worker = new WorkerCode()
        worker.postMessage({ data: res, idTxt: 'id', pidTxt: 'channelPartentId', childrenTxt: 'children', rootId: '0' })
        worker.addEventListener('message', e => {
          let xunhuan = function (arr) {
            if (arr.children && arr.children.length > 0) {
              arr.children.forEach((item, index) => {
                item.open = false
                xunhuan(item)
              })
            }
          }
          xunhuan(e.data[0])
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
        id: Math.random().toString(16).substr(2),
        channelName: '新频道',
        editChannelName: '新频道',
        channelPartentId: item.id,
        parent: item,
        children: [],
        channelUrl: '',
        isEnabledUrl: 0,
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
          this.delChannels.push(item)
        }
      })
    },
    onItemClick (item) {
      if (item.new) return
      this.$router.replace(`/channels?channelId=${item.id}`)
      this.$emit('changeChannel', item.id)
    },
    submit () {
      let tree = { id: '0', children: this.channelTree }
      let res = getTreeData(tree)
      console.log(res)
      // res.unshift({ id: '1', channelName: '根目录', channelPartentId: '0', channelManager: '', channelIcon: '' })
      let delChannels = getTreeData({ children: this.delChannels })
      let result = {
        result: res,
        removeChannelId: delChannels.filter(item => item.id).map(item => item.id)
      }
      this.$http.post('/cri-cms-platform/channel/saveChannel.monitor', {
        channelJson: JSON.stringify(result)
      }).then(res => {
        this.$toast('保存成功')
        this.refresh()
      }).catch(e => {
        this.$toast(e.msg || e.message)
      })
    },
    refresh () {
      this.getChannels()
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="less">
.channel-editor{width: 450px;border-right: 1px solid #ddd;
  .channel-name{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;line-height: 40px;}
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
