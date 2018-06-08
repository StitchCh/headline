<template>
<div class="abs bg-f flex app-article">
  <af-left color="#365d9e" :defaultActive="defaultActive">
    <navigator-item icon="delete" index="1-1" @click="$router.push('/article/list?scope=1&status=1')">已发</navigator-item>
    <navigator-item-group defaultExtended index="2" icon="face">
      <span slot="title">我的</span>
      <navigator-item status="done" index="2-1" @click="$router.push('/article/list?scope=2&status=1')">已发</navigator-item>
      <navigator-item status="warning" index="2-2" @click="$router.push('/article/list?scope=2&status=2')" :number="0">待审</navigator-item>
      <navigator-item status="error" index="2-3" @click="$router.push('/article/tile?scope=2&status=3')" :number="0">驳回</navigator-item>
      <navigator-item status="disabled" index="2-4" @click="$router.push('/article/tile?scope=2&status=4')">草稿</navigator-item>
    </navigator-item-group>
    <navigator-item icon="delete" index="3-1" @click="$router.push('/article/recycle')">回收站</navigator-item>
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
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      // TO DO
    }
  }
}
</script>

<style lang="less">
.app-article{
  .list-item{width: auto;}
}
</style>
