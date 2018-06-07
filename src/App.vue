<template>
  <div id="app">
    <div v-if="!showApp" class="abs flex-center"><loading :size="50" color="#fff"/></div>
    <!--  :class="{'has-bg': $route.name === 'Login' || $route.name === 'Launcher' || $route.name === 'FindPassword'}" -->
    <transition :name="$store.state.ui.transition">
      <router-view v-if="showApp"/>
    </transition>
  </div>
</template>

<script>
import './assets/less/common.less'
import './assets/less/ui.less'
import './assets/less/transition.less'
import './assets/less/value.less'

import getUserInfo from './apps/login/getUserInfo'

export default {
  name: 'App',
  computed: {
    showApp () {
      if (this.$route.name === 'Login' || this.$route.name === 'FindPassword') return true
      if (this.$store.state.account.id) return true
    }
  },
  created () {
    getUserInfo().then().catch(e => {
      this.$router.replace('/login')
    })
  }
}
</script>

<style lang="less">
#app{min-width: 1000px;height: 100%;background: linear-gradient(#002d70, #0097a1);
  // background: url('./assets/img/bg.png') center / cover #1d5e9b;
}
</style>
