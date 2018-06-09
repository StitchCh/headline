<template>
<div class="media-left-tree">
  <ul class="f-16">
    <li class="flex-v-center nav-item a">
      <i class="icon nav-item-icon">face</i>
      <span class="flex-item">我的</span>
      <icon-btn @click="addFolder.show=true">add</icon-btn>
    </li>
    <li class="flex-v-center nav-item nav-item-folder a on">
      <i class="icon nav-item-icon">folder</i>
      <span class="flex-item">文章图集</span>
    </li>
    <li v-if="addFolder.show" class="flex-v-center nav-item nav-item-folder a">
      <i class="icon nav-item-icon">folder</i>
      <input type="text" v-model="addFolder.name" class="flex-item f-16 c-4" placeholder="输入名称" style="width: 100px;">
      <icon-btn small :disabled="!addFolder.name" @click="$emit('addFolder', addFolder.name)">check</icon-btn>
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
      addFolder: {
        show: false,
        name: ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="less">
.media-left-tree{
  width: 280px;border-right: 1px solid rgba(0, 0, 0, .1);
}
</style>
