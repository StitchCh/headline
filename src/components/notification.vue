<template>
<div class="notification">
  <icon-btn class="c-6 a notification-toggler" @click="show=true">mail_outline</icon-btn>
  <layer v-if="show" side mask-click @close="show=false" width="360px">
    <div class="abs flex-center c-a">
      <div class="t-center">
        <i class="icon c-8" style="font-size: 50px;">mail_outline</i>
        <div class="f-12">没有新通知</div>
      </div>
    </div>
  </layer>
</div>
</template>

<script>
export default {
  name: 'notification',
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="less">
.notification{
  .layer{background: transparent;}
  .layer-ctn{background: rgba(0, 0, 0, .8);width: 300px;}
}
</style>
