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
  <div class="flex-item relative">
    <router-view/>
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
    return {}
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
    font-size: 14px;
    .a{display: inline-block;padding: 0 10px;}
  }
  .media-group{padding: 13px 30px;
    ul{flex-wrap: wrap;}
    li{margin: 0 15px 15px 0}
  }
  .media-group-title{padding: 15px 0;}
  .bubble-item{padding: 4px 15px;white-space: nowrap;cursor: pointer;}
  .bubble-item:hover{background: rgba(0, 0, 0, .1)}
  .datepicker{
    &:before{content: none;}
    input{background: transparent;border: none;padding: 0 10px;}
  }
  .datepicker-range{min-width: 200px;
    .datepicker-popup{right: 0;width: 420px;}
  }
}
</style>
