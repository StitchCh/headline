<template>
  <div class="abs bg-f flex app-members">
    <af-left color="#555" vibrant-color="#008cff" bg-color="#E0F2F1" title="推送" :defaultActive="$route.name">
      <navigator-item icon="folder" @click="$router.replace('/push/list')" index="PushList">推送列表</navigator-item>
      <navigator-item icon="folder" @click="$router.replace('/push/add')" index="PushAdd" >创建推送</navigator-item>
    </af-left>
    <div class="flex-item relative">
      <account/>
      <router-view class="abs"></router-view>
    </div>
  </div>
</template>

<script>
  import Account from '@/components/account'
  import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'push',
  components: { Account, AfLeft },
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
  .app-members{
    .account{position: absolute;right: 15px;top: 8px;z-index: 30;}
    .navigator-item.active{background: #008cff;color: #fff;}
    .navigator-item .icon{transition: none;}
  }
</style>
