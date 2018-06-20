<template>
<div class="abs bg-f flex app-settings">
  <af-left color="#555" vibrant-color="#008cff" bg-color="#fafafa" title="设置" :defaultActive="$route.name">
    <navigator-item icon="language" @click="$router.replace('/settings/site')" index="SettingsSite">站点</navigator-item>
    <navigator-item icon="radio" @click="$router.replace('/settings/channel')" index="SettingsChannel">频道</navigator-item>
    <navigator-item icon="people" @click="$router.replace('/settings/user')" index="SettingsUser">用户</navigator-item>
    <navigator-item icon="people_outline" @click="$router.replace('/settings/role')" index="SettingsRole">角色</navigator-item>
    <navigator-item icon="menu" @click="$router.replace('/settings/role')" index="SettingsMenu">菜单</navigator-item>
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
  name: 'app-settings',
  components: { Account, AfLeft }
}
</script>

<style lang="less">
.app-settings{
  .account{position: absolute;right: 15px;top: 8px;z-index: 30;}
  .navigator-item.active{background: #008cff;color: #fff;}
  .navigator-item .icon{transition: none;}
}
</style>
