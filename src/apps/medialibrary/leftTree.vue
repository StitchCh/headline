<template>
<div class="media-left-tree">
  <ul class="f-16">
    <li class="flex-v-center nav-item a">
      <i class="icon nav-item-icon">face</i>
      <span class="flex-item">我的</span>
      <icon-btn @click="addFolder.show=true">add</icon-btn>
    </li>
    <li v-for="item in list" :key="item.id" class="flex-v-center nav-item nav-item-folder a" :class="{'on': $route.query.type === item.id}" @click="folderClick(item)">
      <i class="icon nav-item-icon">folder</i>
      <span class="flex-item">{{item.name}}</span>
      <icon-btn small @click.native="deleteFolder($event, item)" class="del-btn">delete</icon-btn>
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
export default {
  name: 'media-left-tree',
  data () {
    return {
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
        type: this.$route.meta.type || 0
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
            this.getList()
          }).catch(e => {
            this.$toast(e.msg)
          })
        }
      })
    },
    submit () {
      if (!this.addFolder.name) return
      this.$http.post('/cri-cms-platform/media/folder/add.monitor', {
        name: this.addFolder.name
      }).then(res => {
        console.log(res)
      })
    },
    folderClick (item) {
      if (!item) this.$router.replace(this.$route.path)
      this.$router.replace({
        name: this.$route.name,
        query: { type: item.id }
      })
    }
  }
}
</script>

<style lang="less">
.media-left-tree{
  width: 280px;border-right: 1px solid rgba(0, 0, 0, .1);
  .del-btn{opacity: 0;}
  li:hover .del-btn{opacity: 1;}
}
</style>
