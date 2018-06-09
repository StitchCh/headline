<template>
<div class="flex-col media-photos">
  <div class="af-topbar flex-v-center" style="height:36px;">
    <div class="search-bar flex-v-center">
      <i class="icon f-20 c-a">search</i>
      <input type="text" class="f-14 c-6" placeholder="搜索">
    </div>
    <div class="flex-item"></div>
    <div class="flex-v-center opera-btns">
      <span class="a blue">全选</span>
      <span class="a blue">批量删除</span>
      <span class="a blue">上传</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'media-photos'
}
</script>

<style lang="less">
.media-photos{
  //
}
</style>
