<template>
<div class="abs flex-item flex media-photos">
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
        <span class="a blue">批量删除</span>
        <span class="a blue">上传</span>
      </div>
    </div>
    <div class="flex-item scroll-y">
      <div class="media-group" v-for="g in 3">
        <div class="media-group-title">今天</div>
        <ul class="flex">
          <li class="photos-item relative" v-for="item in 6">
            <check-box></check-box>
            <img src="../../assets/img/bg.png" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="af-bottombar"></div>
</div>
</template>

<script>
import MediaLeftTree from './leftTree'

export default {
  name: 'media-photos',
  components: { MediaLeftTree }
}
</script>

<style lang="less">
.media-photos{
  .photos-item{height: 160px;border-radius: 5px;overflow: hidden;
    img{height: 100%;width: auto;}
    .check-box{margin: 0;position:absolute;right: 5px;top: 10px;opacity: 0;}
    &:hover .check-box{opacity: 1;}
  }
}
</style>
