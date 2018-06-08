<template>
<div class="abs bg-f flex app-article">
  <af-left color="#365d9e" :defaultActive="status === 'index' ? scope : status">
    <navigator-item icon="delete" index="sent" @click="$router.push('/article/sent')">已发</navigator-item>
    <navigator-item-group defaultExtended index="2" icon="face">
      <span slot="title">我的</span>
      <navigator-item status="done" index="mySent" @click="$router.push('/article/my/mySent')">已发</navigator-item>
      <navigator-item status="warning" index="check" @click="$router.push('/article/my/check')" :number="0">待审</navigator-item>
      <navigator-item status="error" index="reject" @click="$router.push('/article/my/reject')" :number="0">驳回</navigator-item>
      <navigator-item status="disabled" index="draft" @click="$router.push('/article/my/draft')">草稿</navigator-item>
    </navigator-item-group>
    <navigator-item icon="delete" index="recycle" @click="$router.push('/article/recycle/index')">回收站</navigator-item>
  </af-left>
  <transition name="collapse-x">
  <af-center @add="$router.push('/articleAdd')" url="/cri-cms-platform/article/list.monitor" v-if="status !== 'reject' && status !== 'draft'">
    <div class="list-item a" slot-scope="slotProps">
      <div class="list-title flex-v-center">
        <i class="icon f-16 blue">thumb_up</i>
        <i class="icon f-16 orange">image</i>
        <span class="flex-item c-6 f-14 b">俄加里宁格勒今年将向中国出口360吨琥珀俄加里宁格勒今年将向中国出口360吨琥珀</span>
      </div>
      <div class="list-info f-12 c-8 flex-v-center">
        <span>2018-09-09</span>
        <span>超级管理员</span>
        <span class="list-info-num">
          <i v-tooltip:top="'阅读'">6</i>/<i v-tooltip:top="'评论'">0</i>/<i v-tooltip:top="'分享'">0</i>
        </span>
        <span class="flex-item"></span>
        <i class="icon f-14 c-a">computer</i>
        <i class="icon f-14 c-a">phone_iphone</i>
        <i class="icon f-14 c-a">public</i>
      </div>
    </div>
  </af-center>
  </transition>
  <div class="flex-item flex-col">
    <div class="af-topbar flex-v-center">
      <div class="content-tool flex-v-center">
        <div class="tool-item"><icon-btn small v-tooltip:bottom="'查看'">remove_red_eye</icon-btn></div>
        <div class="tool-item"><icon-btn small v-tooltip:bottom="'推送'">open_in_browser</icon-btn></div>
        <div class="tool-item"><icon-btn small v-tooltip:bottom="'编辑'">edit</icon-btn></div>
        <div class="tool-item"><icon-btn small v-tooltip:bottom="'删除'">delete</icon-btn></div>
        <div class="tool-item"><icon-btn small v-tooltip:bottom="'二维码'"><img class="qr-icon" src="../../assets/img/QR_code.svg"></icon-btn></div>
        <div class="tool-item"><icon-btn small v-tooltip:bottom="'复制并重新发布'">file_copy</icon-btn></div>
      </div>
      <div class="flex-item"></div>
      <account/>
    </div>
    <div class="flex-item scroll-y">
      <router-view/>
    </div>
  </div>
</div>
</template>

<script>
import Account from '@/components/account'
import Dock from '@/components/dock'
import AfCenter from '@/components/app-frame/afCenter'
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-article',
  props: [ 'scope', 'status' ],
  components: { Account, AfLeft, AfCenter, Dock },
  data () {
    return {
      list: []
    }
  },
  created () {
    console.log(this.$route)
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
  .collapse-x-enter-active, .collapse-x-leave-active {
    overflow: hidden;
    transition: width .3s;
  }
  .collapse-x-enter, .collapse-x-leave-to {
    width: 0;
  }
}
</style>
