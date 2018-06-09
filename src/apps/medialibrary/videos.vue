<template>
<div class="abs flex-item flex media-videos">
  <media-left-tree/>
  <div class="flex-item flex-col">
    <div class="af-topbar flex-v-center" style="height:36px;">
      <div class="search-bar flex-v-center">
        <i class="icon f-20 c-a">search</i>
        <input type="text" class="f-14 c-6" placeholder="搜索">
      </div>
      <div class="flex-item"></div>
      <div class="flex-v-center opera-btns">
        <span class="a blue">全选</span>
        <span class="a blue">上传</span>
      </div>
    </div>
    <div class="flex-item scroll-y">
      <div class="media-group" v-for="g in 3">
        <div class="media-group-title">今天</div>
        <ul class="flex">
          <li class="videos-item relative" v-for="item in 6">
            <div class="videos-item-cover"></div>
            <div class="videos-item-name f-14">李小璐曝贾乃亮陪伴少李小璐曝贾乃亮陪伴少李小璐曝贾乃亮陪伴少, 坦言婚前婚后反差大</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import MediaLeftTree from './leftTree'

export default {
  name: 'media-videos',
  components: { MediaLeftTree }
}
</script>

<style lang="less">
.media-videos{
  .videos-item{width: 200px;}
  .videos-item-cover{height: 150px;background: #eee;border-radius: 5px;overflow: hidden;}
  .videos-item-name{margin-top: 5px;max-height: 46px;overflow: hidden;}
}
</style>
