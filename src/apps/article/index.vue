<template>
<div class="abs bg-f flex app-article">
  <af-left color="#586c8e" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="1-all" @click="$router.replace('/article/list?scope=1&status=all')">全部</navigator-item>
    <navigator-item-group defaultExtended index="2" icon="face">
      <span slot="title">我的</span>
      <navigator-item status="done" index="my-1" @click="$router.replace('/article/list?scope=my&status=1')">已发</navigator-item>
      <navigator-item status="warning" index="my-2" @click="$router.replace('/article/list?scope=my&status=2')">待审</navigator-item>
      <navigator-item status="error" index="my-3" @click="$router.replace('/article/tile?scope=my&status=3')">驳回</navigator-item>
      <navigator-item status="disabled" index="my-4" @click="$router.replace('/article/tile?scope=my&status=4')">草稿</navigator-item>
    </navigator-item-group>
    <navigator-item icon="delete" index="3-1" @click="$router.replace('/article/recycle')">回收站</navigator-item>
  </af-left>
  <router-view></router-view>
</div>
</template>

<script>
import Account from '@/components/account'
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-article',
  components: { Account, AfLeft },
  data () {
    return {
      list: []
    }
  },
  computed: {
    defaultActive () {
      return `${this.$route.query.scope}-${this.$route.query.status}`
    }
  }
}
</script>

<style lang="less">
.app-article{
  .list-item{width: auto;}
  .navigator-item.active{background: #b8ddf3;color: #0059cc;}
}
</style>
