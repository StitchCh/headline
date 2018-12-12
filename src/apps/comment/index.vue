<template>
  <div class="abs bg-f flex app-comments">
    <af-left color="#555" vibrant-color="#008cff" bg-color="#fafafa" title="评论" :defaultActive="$route.name">
      <navigator-item icon="people" @click="$router.replace('/comment/list')" index="CommentList">全部
      </navigator-item>
      <navigator-item icon="people" @click="$router.replace('/comment/list')" index="CommentList">待审核
      </navigator-item>
      <navigator-item icon="people" @click="$router.replace('/comment/list')" index="CommentList">审核通过
      </navigator-item>
      <navigator-item icon="people" @click="$router.replace('/comment/list')" index="CommentList">审核未通过
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
  name: 'app-comments',
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
  .app-comments {
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
