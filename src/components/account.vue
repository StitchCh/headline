<template>
<div class="account c-6 flex-v-center">
  <div class="relative">
    <div class="flex-v-center a account-toggler" @click="menuShow=true">
      <span>{{$store.state.account.userName}}</span>
      <i class="icon">keyboard_arrow_down</i>
    </div>
    <bubble v-if="menuShow" class="c-6" pos="bottom" align="center" @close="menuShow=false">
      <div class="account-menu">
        <div class="menu-item t-center a">修改密码</div>
        <div class="menu-item t-center a" @click="$router.push('/chooseSite')">切换站点</div>
        <div class="menu-item t-center a" @click="logoutShow=true;menuShow=false;">注销</div>
      </div>
    </bubble>
  </div>
  <notification/>
  <layer v-if="logoutShow">
    <div class="layer-text flex" style="padding-top: 20px;">
      <img class="log-out-logo" src="../assets/img/login-logo.png" alt="">
      <div class="flex-item">
        <div class="b f-20">注销登录？</div>
        <div class="c-6" style="margin-top: 8px;">您确定要注销当前登录账号吗？</div>
      </div>
    </div>
    <div class="layer-btns">
      <btn flat @click="logoutShow=false">取消</btn>
      <btn flat color="#ff6143" @click="logout">注销</btn>
    </div>
  </layer>
</div>
</template>

<script>
import Notification from './notification'

export default {
  name: 'account',
  components: { Notification },
  data () {
    return {
      menuShow: false,
      logoutShow: false
    }
  },
  methods: {
    logout () {
      this.logoutShow = false
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      localStorage.removeItem('siteId')
      sessionStorage.removeItem('siteId')
      this.$store.commit('LOGOUT')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less">
.account{
  .account-menu{padding: 10px 0;}
  .menu-item{padding: 5px 10px;white-space: nowrap;
    &:hover{background: #ddd;}
  }
  .log-out-logo{width: 50px;height: 50px;border: 1px solid #ddd;border-radius: 8px;margin-right: 20px;}
}
</style>
