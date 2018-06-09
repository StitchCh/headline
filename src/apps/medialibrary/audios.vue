<template>
<div class="abs flex-item f-14 flex media-audios">
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
          <li class="audios-item relative a" v-for="item in 6">
            <div class="audios-item-cover flex-v-center">
              <i class="icon c-f">audiotrack</i>
              <span class="flex-item t-right c-f">20:00</span>
            </div>
            <div class="audios-item-name f-14">hello.mp3</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="af-bottombar flex-v-center">

    </div>
  </div>
</div>
</template>

<script>
import MediaLeftTree from './leftTree'

export default {
  name: 'media-audios',
  components: { MediaLeftTree }
}
</script>

<style lang="less">
.media-audios{
  .audios-item{width: 200px;margin: 0!important;padding: 5px;border-radius: 8px;outline: none;border: 1px solid transparent;}
  .audios-item-cover{height: 60px;background: #79b6ff;padding: 0 15px;border-radius: 5px;}
  .audios-item-name{margin-top: 5px;max-height: 46px;overflow: hidden;}
}
</style>
