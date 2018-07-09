<template>
  <div class="abs bg-f flex app-users">
    <af-left color="#1B5E20" vibrant-color="#4CAF50" bg-color="#E8F5E9" title="用户" :defaultActive="$route.name">
      <navigator-item icon="folder" @click="$router.replace('/users/all')" index="UsersAll">全部</navigator-item>
      <navigator-item icon="check_circle" @click="$router.replace('/users/normal')" index="UsersNormal">正常</navigator-item>
      <navigator-item icon="hourglass_full" @click="$router.replace('/users/auditing')" index="UsersAuditing">待审</navigator-item>
      <navigator-item icon="delete" @click="$router.replace('/users/delete')" index="UsersDelete">删除</navigator-item>
    </af-left>

    <div class="flex-item relative">
      <account/>
      <router-view class="abs flex-col c-6"></router-view>
    </div>
  </div>
</template>

<script>
import AfLeft from '@/components/app-frame/afLeft'
import Account from '@/components/account'

export default {
  name: 'app-users',
  components: { AfLeft, Account }
}
</script>

<style lang="less">
  .app-users{
    .account{position: absolute;right: 15px;top: 8px;z-index: 30;}
    .navigator-item.active{background: #66BB6A;color: #fff;}
    .navigator-item .icon{transition: none;}
  }
</style>
