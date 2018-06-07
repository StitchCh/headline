<template>
  <div id="app">
    <!--  :class="{'has-bg': $route.name === 'Login' || $route.name === 'Launcher' || $route.name === 'FindPassword'}" -->
    <transition :name="$store.state.ui.transition">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import './assets/less/common.less'
import './assets/less/ui.less'
import './assets/less/transition.less'
import './assets/less/value.less'

export default {
  name: 'App'
}
</script>

<style lang="less">
#app{min-width: 1000px;height: 100%;background: linear-gradient(#002d70, #0097a1);
  // background: url('./assets/img/bg.png') center / cover #1d5e9b;
}
</style>
