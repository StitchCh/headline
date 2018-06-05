<template>
<div class="avatar" :style="{width: size + 'px', height: size + 'px'}" @click="$emit('click')">
  <img v-if="src" :src="finalSrc" @error="errorTimes += 1">
</div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    src: { type: String, default: '' },
    size: { type: String, default: '40' }
  },
  data () {
    return { errorTimes: 0 } // 图片加载失败次数来依次更换路径，小图 > 大图 > 默认头像
  },
  computed: {
    finalSrc () {
      if (!this.errorTimes) return this.size > 100 ? this.src : this.src.replace(/\/0$/, '/100')
      if (this.errorTimes === 1) return this.src
      return '/static/img/default_avatar.png'
    }
  }
}
</script>

<style>
.avatar{display: inline-block;vertical-align: top;background: url('/static/img/default_avatar.png');background-size: 100% 100%;}
.avatar img{width: 100%;height: 100%;vertical-align: top;border-radius: 50%;outline: none;border: none;}
</style>
