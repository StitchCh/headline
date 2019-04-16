<template>
<div class="media-left-tree">
  <ul class="f-16">
    <li class="flex-v-center nav-item a" @click="folderClick()" :class="{'on': selectMode ? !itemId : !$route.query.folderId}">
      <i class="icon nav-item-icon">folder</i>
      <span class="flex-item">全部</span>
      <icon-btn v-if="!selectMode" @click.native="add">add</icon-btn>
    </li>
    <li>
      <draggable v-model="list" @end="onDragEnd">
        <transition-group tag="ul" name="flip-list">
          <li v-for="item in list" :key="item.id" :data-id="item.id" :data-name="item.name" class="flex-v-center nav-item nav-item-folder a" :class="{'on': selectMode ? itemId === item.id : $route.query.folderId === item.id}" @click="folderClick(item)">
            <i class="icon nav-item-icon">folder</i>
            <span class="flex-item">{{item.name}}</span>
            <icon-btn small @click.native="deleteFolder($event, item)" class="del-btn">delete</icon-btn>
          </li>
        </transition-group>
      </draggable>
    </li>
    <li v-if="addFolder.show" class="flex-v-center nav-item nav-item-folder a">
      <i class="icon nav-item-icon">create_new_folder</i>
      <input type="text" v-model="addFolder.name" class="flex-item f-16 c-4" placeholder="输入名称" style="width: 100px;">
      <icon-btn small :disabled="!addFolder.name" @click="submit">check</icon-btn>
      <icon-btn small @click="addFolder.show=false;addFolder.name=''">close</icon-btn>
    </li>
  </ul>
</div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'media-left-tree',
  components: { draggable },
  props: {
    selectMode: {
      type: Boolean,
      default: false
    },
    type: {
      type: [ Number, String ],
      default: 0
    }
  },
  data () {
    return {
      itemId: '',
      list: [],
      addFolder: {
        show: false,
        name: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.post('/cri-cms-platform/media/index.monitor', {
        type: this.selectMode ? this.type : (this.$route.meta.type || 0)
      }).then(res => {
        this.list = res || []
      }).catch(e => {
        console.log(e)
      })
    },
    deleteFolder (e, item) {
      e.stopPropagation()
      this.$confirm({
        title: '您确定要删除此文件夹吗？',
        text: `${item.name}\n这将不会删除文件夹下的文件。`,
        btns: ['取消', '删除'],
        color: 'red',
        yes: () => {
          this.$http.post('/cri-cms-platform/media/folder/del.monitor', {
            id: item.id
          }).then(res => {
            this.$router.replace(this.$route.path)
            this.getList()
          }).catch(e => {
            this.$toast(e.msg)
          })
        }
      })
    },
    submit () {
      if (!this.addFolder.name) return
      this.$http.post('/cri-cms-platform/media/folder/save.monitor', {
        type: this.$route.meta.type,
        name: this.addFolder.name,
        belone: 'custom',
        sort: this.list.length
      }).then(res => {
        this.getList()
        this.addFolder.show = false
        this.addFolder.name = ''
      })
    },
    folderClick (item) {
      if (this.selectMode) {
        this.itemId = item ? item.id : ''
        this.$emit('changeFolder', this.itemId)
        return
      }
      if (!item) {
        this.$router.replace(this.$route.path)
        return
      }
      this.$router.replace({
        name: this.$route.name,
        query: { folderId: item.id }
      })
    },
    add (e) {
      e.stopPropagation()
      this.addFolder.show = true
    },
    onDragEnd (e) {
      if (e.oldIndex === e.newIndex) return
      console.log(e.newIndex)
      // this.$http.post('/cri-cms-platform/media/folder/update.monitor', {
      //   id: e.item.getAttribute('data-id'),
      //   sort: e.newIndex,
      //   type: this.$route.meta.type
      // }).then(res => {
      //   console.log(e)
      // })
    }
  }
}
</script>

<style lang="less">
.media-left-tree{
  width: 280px;border-right: 1px solid rgba(0, 0, 0, .1);
  .del-btn{opacity: 0;}
  .nav-item:hover .del-btn{opacity: 1;}
  .nav-item.sortable-ghost{background: #eee;}
}
</style>
