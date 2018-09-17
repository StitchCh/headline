<template>
  <div class="abs bg-f c-6 flex-col app-menus">
    <div class="af-topbar flex-v-center">
      <dock title="菜单" color="#2088ff"/>
      <div class="flex-item"></div>
      <account/>
    </div>
    <div class="flex-item scroll-y bg-e relative menus-content">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import Dock from '@/components/dock'

export default {
  name: 'app-menus',
  components: { Account, Dock },
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.$http.post('/cri-cms-platform/sysMenu/queryList.monitor').then(
      res => {
        console.log(res)
      }
    )
  }
}
</script>

<style lang="less">
  .app-menus {
    .menus-content {
      .setting-card {max-width: 1440px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;
        th,td {padding: 5px 10px;}
        tr {border-top: 1px solid #e1e1e1;cursor: pointer;}
        tr:hover {background: rgba(0, 0, 0, .05);}
      }
    }
  }
</style>
