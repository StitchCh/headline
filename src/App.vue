<template>
  <div id="app" :class="{'showBg': $store.state.ui.showBg}">
    <div v-if="!showApp" class="abs flex-center">
      <loading :size="50" :color="$store.state.ui.showBg ? '#fff' : '#666'"/>
    </div>
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
      let route = this.$route.name
      if (route === 'Login' || route === 'FindPassword' || route === 'ChooseSite') return true
      if (this.$store.state.account.id) return true
    }
  },
  created () {
    getUserInfo().then().catch(e => {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      localStorage.removeItem('siteId')
      sessionStorage.removeItem('siteId')
      this.$router.replace('/login')
    })
  }
}
</script>

<style lang="less">
#app{min-width: 1000px;height: 100%;background: #f8f8f8;}
#app.showBg{background: linear-gradient(#002d70, #0097a1);}
</style>
