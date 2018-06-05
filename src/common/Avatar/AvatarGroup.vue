<template>
<div class="avatar-group" :class="avatarClass" :style="{width: size + 'px', height: size + 'px'}">
  <img v-for="(item, i) in finalSrcs" :class="['img-'+(i+1)]" :src="item" :key="item">
</div>
</template>

<script>
export default {
  name: 'avatar-group',
  props: {
    srcs: { type: Array, default: () => ['/static/img/default_avatar.png'] },
    size: { type: [String, Number], default: '40' }
  },
  computed: {
    finalSrcs () {
      return this.srcs.map(src => {
        return src ? src.replace(/\/0$/, '/100') : '/static/img/default_avatar.png'
      }).slice(0, 5)
    },
    avatarClass () {
      let l = this.finalSrcs.length
      return 'group-' + (l > 5 ? 5 : l)
    }
  }
}
</script>

<style lang="less">
.avatar-group{display: inline-block;vertical-align: top;position: relative;
  /* .avatar-group-ctn{display: flex;height: 100%;border-radius: 50%;overflow: hidden;position: relative;} */
  img{width: 100%;height: 100%;border-radius: 50%;border: 1px solid #fff;box-sizing: border-box;}
  &.group-2{
    img{position: absolute;width: 65%;height: 65%;}
    .img-1{left: 0;top: 0;}
    .img-2{bottom: 0;right: 0;}
  }
  &.group-3{
    img{position: absolute;width: 60%;height: 60%;}
    .img-1{left: 20%;top: 0;}
    .img-2{left: 0;bottom: 0;}
    .img-3{right: 0;bottom: 0;}
  }
  &.group-4{
    img{position: absolute;width: 55%;height: 55%;}
    .img-1{left: 0;top: 0;}
    .img-2{right: 0;top: 0}
    .img-3{left: 0;bottom: 0;}
    .img-4{right: 0;bottom: 0;}
  }
  &.group-5{
    img{position: absolute;width: 46%;height: 46%;}
    .img-1{left: 27%;top: 0;}
    .img-2{right: 0;top: 23%;}
    .img-3{right: 12%;bottom: 0;}
    .img-4{left: 12%;bottom: 0;}
    .img-5{left: 0;top: 23%;}
  }
}
</style>
