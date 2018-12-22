<template>
  <div class="abs bg-f flex app-member">
    <af-left color="#555" vibrant-color="#008cff" bg-color="#fafafa" title="会员" :defaultActive="$route.name">
      <navigator-item icon="people" @click="$router.replace('/member/list')" index="MemberList">全部
      </navigator-item>
    </af-left>
    <div class="flex-item relative">
      <account/>
      <router-view class="abs flex-col c-6 member-content"/>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-member',
  components: {Account, AfLeft},
  computed: {
    defaultActive () {
      let { name } = this.$route
      name = name || ''
      console.log(name)
      return name.replace('Content', '')
    }
  }
}
</script>

<style lang="less">
  .app-member {
    .account {position: absolute;right: 15px;top: 8px;z-index: 30;}
    .navigator-item.active {background: #008cff;color: #fff;}
    .navigator-item .icon {transition: none;}
    .member-content {
      .setting-card {max-width: 1440px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;
        th,td {padding: 5px 10px;}
        tr {border-top: 1px solid #e1e1e1;cursor: pointer;}
        tr:hover {background: rgba(0, 0, 0, .05);}
      }
    }
  }
</style>
