<template>
  <div class="abs bg-f flex app-members">
    <af-left color="#555" vibrant-color="#008cff" bg-color="#fafafa" title="评论" :defaultActive="$route.name">
      <navigator-item icon="people" @click="$router.replace('/comment/list')" index="CommentList">全部
      </navigator-item>
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
  name: 'app-members',
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
  .app-members {
    .account {
      position: absolute;
      right: 15px;
      top: 8px;
      z-index: 30;
    }
    .navigator-item.active {
      background: #008cff;
      color: #fff;
    }
    .navigator-item .icon {
      transition: none;
    }
  }
</style>
