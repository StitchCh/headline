<template>
<div class="abs bg-f c-6 flex-col media-library">
  <div class="af-topbar flex-v-center">
    <dock title="素材库" color="#2088ff"/>
    <div class="flex-item flex-center">
      <div class="top-tab f-18 blue flex-v-center">
        <router-link class="blue" replace to="/media">图片</router-link>
        <router-link class="blue" replace to="/media/videos">视频</router-link>
        <router-link class="blue" replace to="/media/audios">音频</router-link>
      </div>
    </div>
    <account/>
  </div>
  <div class="flex-item flex">
    <div class="af-left flex-col">
      <div class="flex-item scroll-y">
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
            <input type="text" class="flex-item f-16 c-a" placeholder="输入名称">
            <icon-btn small @click="addFolder.show=false">close</icon-btn>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-item flex-col">
      <router-view/>
    </div>
  </div>
</div>
</template>

<script>
import Account from '@/components/account'
import Dock from '@/components/dock'

export default {
  name: 'media-library',
  components: { Account, Dock },
  data () {
    return {
      addFolder: {
        show: false
      }
    }
  }
}
</script>

<style lang="less">
.media-library{
  .af-left{width: 280px;background: #fff;border-right: 1px solid rgba(0, 0, 0, .05);}
  .nav-item{height: 40px;border-bottom: 1px solid #eee;line-height: 1em;padding: 0 5px 0 15px;
    &.nav-item-folder{padding-left: 30px;}
    &:hover{background: rgba(0, 0, 0, .05);}
    &.on{background: #c9e0ff;border-color: #c9e0ff;color: #005eca;}
    input{border: none;height: 36px;background: transparent;
      &::-webkit-input-placeholder{color: #aaa;}
    }
    .nav-item-icon{margin-right: 15px;}
  }
  .top-tab a{display: inline-block;line-height: 1em;padding: 10px;opacity: .4;text-decoration: none;
    &.router-link-exact-active{opacity: 1;}
  }
  .search-bar input{width:200px;height: 100%;border:none;margin-left: 10px;}
  .opera-btns{
    .a{display: inline-block;padding: 0 10px;}
  }
}
</style>
